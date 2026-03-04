import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SUBJECTS = [
  "Catálogo de Modelos",
  "Preços e Promoções",
  "Pagamento e Financiamento",
  "Especificações Técnicas",
  "Comparativo de Modelos",
  "Garantia e Assistência",
  "Suporte Técnico",
  "Peças e Manutenção",
  "Acompanhamento de Pedido",
  "Outros Assuntos",
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { details } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    if (!details || typeof details !== "string" || details.trim().length < 5) {
      return new Response(JSON.stringify({ subject: "Outros Assuntos" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `Você é um classificador de assuntos para a MS Eletric, empresa de motos e veículos elétricos.
Analise a mensagem do cliente e classifique em EXATAMENTE UM dos assuntos abaixo:

${SUBJECTS.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Responda APENAS com o nome exato do assunto, sem número, sem explicação, sem pontuação extra.`,
          },
          { role: "user", content: details },
        ],
        stream: false,
        temperature: 0,
      }),
    });

    if (!response.ok) {
      console.error("AI gateway error:", response.status);
      return new Response(JSON.stringify({ subject: "Outros Assuntos" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    let classified = (data.choices?.[0]?.message?.content || "").trim();

    // Validate against known subjects (fuzzy match)
    const match = SUBJECTS.find(
      (s) => s.toLowerCase() === classified.toLowerCase()
    );
    const subject = match || "Outros Assuntos";

    return new Response(JSON.stringify({ subject }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("classify-subject error:", e);
    return new Response(JSON.stringify({ subject: "Outros Assuntos" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
