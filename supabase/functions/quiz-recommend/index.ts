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

const systemPrompt = `Você é um consultor especialista que analisa respostas de um quiz para recomendar o melhor veículo elétrico.

Contexto do negócio:
${businessContext || "Não fornecido"}

CATEGORIAS VÁLIDAS (use EXATAMENTE uma destas):
- Bicicletas Elétricas
- Autopropelidos
- Scooters Elétricas
- Triciclos Elétricos
- Utilitários
- Infantil

Com base nas respostas do quiz, retorne um JSON com exatamente esta estrutura (sem markdown, sem backticks, apenas JSON puro):
{
  "category": "Uma das categorias válidas acima",
  "justification": "1 frase curta explicando POR QUE esta categoria é ideal para o perfil",
  "models": [
    {
      "name": "MODELO PRINCIPAL",
      "headline": "Frase de até 10 palavras: benefício principal para o usuário",
      "specs": "Motor: XW | Vel: Xkm/h | Autonomia: Xkm | Bateria: tipo | Preço: R$X",
      "whyFits": "1-2 frases curtas conectando o perfil do usuário ao modelo"
    },
    {
      "name": "SEGUNDO MODELO",
      "headline": "Frase de até 10 palavras: por que é boa alternativa",
      "specs": "Motor: XW | Vel: Xkm/h | Autonomia: Xkm | Preço: R$X",
      "whyFits": "1 frase curta sobre por que pode ser interessante"
    },
    {
      "name": "TERCEIRO MODELO (se aplicável)",
      "headline": "Frase de até 10 palavras",
      "specs": "Motor: XW | Vel: Xkm/h | Autonomia: Xkm | Preço: R$X",
      "whyFits": "1 frase curta"
    }
  ],
  "suggestions": [],
  "whatsappMessage": "Mensagem curta em primeira pessoa, tom natural, citando os modelos recomendados."
}

REGRAS:
- Recomende 2-3 modelos ranqueados do mais adequado ao menos
- TODOS os modelos devem ter name, headline, specs e whyFits
- Headlines devem ser CURTAS (máx 10 palavras), focadas no benefício
- Specs devem seguir o formato exato: Motor | Vel | Autonomia | Preço (mínimo)
- whyFits deve ser 1-2 frases CURTAS e diretas
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
      let cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      // Find JSON boundaries
      const jsonStart = cleaned.search(/[\{\[]/);
      const jsonEnd = cleaned.lastIndexOf(jsonStart !== -1 && cleaned[jsonStart] === '[' ? ']' : '}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
      }
      
      // Fix common issues
      cleaned = cleaned
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]")
        .replace(/[\x00-\x1F\x7F]/g, "");

      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({
          category: "Consulta personalizada",
          justification: content,
          models: [],
          suggestions: [],
          whatsappMessage: `Olá! Fiz o quiz e gostaria de uma recomendação personalizada. Minhas respostas foram: ${answers.map((a: any) => `${a.question}: ${a.answer}`).join("; ")}`,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Ensure models array exists
    if (!parsed.models || !Array.isArray(parsed.models)) {
      parsed.models = [];
    }
    if (!parsed.suggestions) {
      parsed.suggestions = [];
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
