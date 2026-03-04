import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, city, details } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // ── Step 1: AI Spam Pre-filter ──
    const spamCheckResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: `Você é um filtro anti-spam para um formulário de contato de uma empresa de veículos elétricos (motos, bikes, scooters, triciclos).

Analise os dados do lead e classifique como "legit" ou "spam".

Critérios de SPAM:
- Nome sem sentido (ex: "asdasd fghfgh", "teste teste", "aaaa bbbb")
- Detalhes com texto sem sentido, palavrões, ofensas ou conteúdo irrelevante
- Detalhes que são apenas letras/números aleatórios (ex: "asdkjhasd", "123456", "kkkkkkk")
- Conteúdo que claramente não é uma consulta real sobre veículos elétricos

Critérios de LEGÍTIMO:
- Nome que parece real (pode ser incomum mas plausível)
- Detalhes que expressam interesse real, mesmo que curtos ou informais
- Perguntas sobre preço, modelos, autonomia, financiamento etc.

Responda APENAS com a palavra "legit" ou "spam", sem nenhuma outra palavra ou explicação.`,
          },
          {
            role: "user",
            content: `Nome: ${name}\nCidade: ${city || "não informada"}\nDetalhes: ${details || "nenhum"}`,
          },
        ],
        stream: false,
        max_tokens: 10,
      }),
    });

    if (spamCheckResponse.ok) {
      const spamData = await spamCheckResponse.json();
      const verdict = (spamData.choices?.[0]?.message?.content || "").trim().toLowerCase();
      
      if (verdict === "spam") {
        return new Response(
          JSON.stringify({ 
            error: "spam",
            userMessage: "Não foi possível processar sua solicitação. Verifique os dados e tente novamente." 
          }),
          {
            status: 422,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }
    // If spam check fails (network/rate limit), proceed anyway — don't block legitimate users

    // ── Step 2: Generate WhatsApp message ──
    const systemPrompt = `Você é a Iara, assistente inteligente da MS Eletric, uma empresa brasileira de motos e veículos elétricos.
Sua tarefa é gerar APENAS o bloco de "Detalhes da mensagem" para uma mensagem de WhatsApp.

Regras:
- Escreva em PRIMEIRA PESSOA, como se o próprio cliente estivesse redigindo a mensagem e encaminhando sua necessidade
- Use português brasileiro, de forma clara e detalhada
- Descreva o cenário, as dificuldades e os desafios específicos que o cliente enfrenta, com base nos detalhes fornecidos
- Inclua exemplos práticos, dados relevantes ou contexto que enriqueçam a comunicação
- Seja completa e informativa — evite respostas curtas ou genéricas. Escreva entre 5 a 8 linhas com informações úteis
- NÃO inclua saudações, nome, assunto ou cabeçalhos — apenas o conteúdo dos detalhes
- NÃO inclua número de telefone ou contato
- NÃO use emojis
- Retorne APENAS o texto dos detalhes, sem explicações adicionais, sem aspas, sem prefixos`;

    const userPrompt = `Gere os detalhes da mensagem para:
- Detalhes do cliente: ${details || "Nenhum detalhe adicional fornecido"}
- Cidade: ${city || "não informada"}`;

    const messageTemplate = (aiDetails: string) =>
      `*Por favor, para que seu atendimento prossiga, não apague esta mensagem antes de enviar!*\n\n*Nome:* ${name}\n\n*Cidade:* ${city || "não informada"}\n\n${aiDetails}`;

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
    const aiDetails = (data.choices?.[0]?.message?.content || details || "").trim();
    const message = messageTemplate(aiDetails);

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
