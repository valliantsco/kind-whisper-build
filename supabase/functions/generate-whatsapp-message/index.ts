import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, topic, details } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Você é um assistente da MS Eletric, uma empresa brasileira de motos e veículos elétricos.
Sua tarefa é gerar uma mensagem curta e amigável para o WhatsApp, como se fosse o cliente entrando em contato com a empresa.

Regras:
- A mensagem deve ser em português brasileiro, natural e simpática
- Comece com uma saudação amigável usando o nome do cliente
- Mencione o assunto de forma natural e conversacional
- Se houver detalhes, incorpore-os de forma fluida na mensagem
- NÃO inclua número de telefone ou contato (já estão no WhatsApp)
- NÃO use emojis em excesso (máximo 2-3)
- Termine com uma frase que convide a resposta
- A mensagem deve ter no máximo 4-5 linhas
- Comece a mensagem com "⚠️ *Por favor, não apague esta mensagem antes de enviar!*" seguido de uma linha em branco
- Retorne APENAS a mensagem, sem explicações adicionais`;

    const userPrompt = `Gere uma mensagem de WhatsApp para:
- Nome do cliente: ${name}
- Assunto: ${topic}
${details ? `- Detalhes adicionais: ${details}` : "- Sem detalhes adicionais"}`;

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
          { role: "user", content: userPrompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em instantes." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
