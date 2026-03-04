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
            content: `Você é um filtro anti-spam para um formulário de contato de uma empresa de veículos elétricos (motos, bikes, scooters, triciclos).
Analise CADA campo individualmente e classifique como válido ou inválido.`,
          },
          {
            role: "user",
            content: `Analise os seguintes dados de um lead:\n- Nome: ${name}\n- Cidade: ${city || "não informada"}\n- Detalhes: ${details || "nenhum"}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "classify_lead",
              description: "Classifica cada campo do lead como válido ou inválido",
              parameters: {
                type: "object",
                properties: {
                  name_valid: {
                    type: "boolean",
                    description: "true se o nome parece real e plausível, false se é falso, sem sentido ou ofensivo",
                  },
                  city_valid: {
                    type: "boolean",
                    description: "true se a cidade parece real, false se é inventada ou sem sentido",
                  },
                  details_valid: {
                    type: "boolean",
                    description: "true se os detalhes expressam interesse real sobre veículos elétricos, false se é spam, ofensivo ou sem sentido",
                  },
                },
                required: ["name_valid", "city_valid", "details_valid"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "classify_lead" } },
        stream: false,
      }),
    });

    if (!response.ok) {
      // On rate limit or other errors, let it pass (don't block legitimate users)
      return new Response(JSON.stringify({ valid: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      try {
        const result = JSON.parse(toolCall.function.arguments);
        const fieldErrors: Record<string, string> = {};

        if (result.name_valid === false) fieldErrors.name = "Informe seu nome verdadeiro";
        if (result.city_valid === false) fieldErrors.city = "Informe uma cidade válida";
        if (result.details_valid === false) fieldErrors.details = "Descreva sua real necessidade sobre veículos elétricos";

        if (Object.keys(fieldErrors).length > 0) {
          return new Response(
            JSON.stringify({ valid: false, fieldErrors }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } catch {
        // Parse error, let it pass
      }
    }

    return new Response(JSON.stringify({ valid: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Spam check error:", e);
    return new Response(JSON.stringify({ valid: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
