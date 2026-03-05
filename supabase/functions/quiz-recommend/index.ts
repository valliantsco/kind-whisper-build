import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { answers, businessContext } = await req.json();

    if (!answers || !Array.isArray(answers)) {
      return new Response(
        JSON.stringify({ error: "Invalid input: answers array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const answersText = answers
      .map((a: { question: string; answer: string }) => `Pergunta: ${a.question}\nResposta: ${a.answer}`)
      .join("\n\n");

    const systemPrompt = `Você é um consultor especialista que analisa respostas de um quiz para recomendar o melhor produto/serviço.

Contexto do negócio:
${businessContext || "Não fornecido"}

Com base nas respostas do quiz, você DEVE retornar um JSON com exatamente esta estrutura (sem markdown, sem backticks, apenas o JSON puro):
{
  "category": "Nome da categoria recomendada",
  "justification": "Explicação curta de 1 frase sobre POR QUE esta categoria é ideal",
  "models": [
    {
      "name": "MODELO PRINCIPAL",
      "headline": "Frase curta e impactante sobre por que é o ideal (1 linha)",
      "specs": "Motor: XW | Vel: Xkm/h | Autonomia: Xkm | Bateria: tipo | Preço: R$X",
      "whyFits": "Explicação de 2-3 frases personalizada conectando o perfil do usuário às características do modelo"
    },
    {
      "name": "SEGUNDO MODELO",
      "headline": "Frase curta sobre por que é uma boa alternativa"
    },
    {
      "name": "TERCEIRO MODELO (se aplicável)",
      "headline": "Frase curta sobre por que pode ser interessante"
    }
  ],
  "suggestions": [],
  "whatsappMessage": "Mensagem em primeira pessoa, tom natural e direto, sem emojis. Deve citar os modelos recomendados e solicitar mais informações."
}

REGRAS:
- Recomende 2-3 modelos ranqueados do mais adequado ao menos
- O primeiro modelo deve ter TODOS os campos (name, headline, specs, whyFits)
- O segundo e terceiro modelos devem ter apenas name e headline (sem specs/whyFits)
- A justificativa deve ser curta (1 frase)
- A mensagem WhatsApp deve soar natural, como se a pessoa estivesse escrevendo
- Responda APENAS com o JSON, sem texto adicional`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Respostas do quiz:\n\n${answersText}` },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Serviço temporariamente indisponível." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Erro ao processar recomendação" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse the JSON from the AI response
    let parsed;
    try {
      // Remove potential markdown code fences
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({
          category: "Consulta personalizada",
          justification: content,
          suggestions: [],
          whatsappMessage: `Olá! Fiz o quiz e gostaria de uma recomendação personalizada. Minhas respostas foram: ${answers.map((a: any) => `${a.question}: ${a.answer}`).join("; ")}`,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("quiz-recommend error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
