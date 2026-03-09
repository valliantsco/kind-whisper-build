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

const systemPrompt = `Você é um consultor especialista da MS Eletric que analisa respostas de um quiz para recomendar o veículo elétrico ideal.

Contexto do negócio:
${businessContext || "Não fornecido"}

═══ CATÁLOGO OFICIAL MS ELETRIC (use APENAS estes produtos) ═══

CATEGORIAS VÁLIDAS: Autopropelidos, Bicicletas Elétricas, Scooters Elétricas, Triciclos Elétricos, Utilitários, Infantil, Patinetes

── AUTOPROPELIDOS ──

1. Bike 350 | R$ 7.990 | Motor: AIMA Hub 350W | Vel: 29km/h | Autonomia: 40km | Recarga: 7-8h | Bateria: chumbo removível | Carga: 90-100kg
   Perfil: entrada no segmento elétrico, deslocamentos curtos, bairros, condomínios, centros urbanos planos.

2. Bike 400+ | R$ 10.990 | Motor: Bosch 400W | Vel: 32km/h | Autonomia: 50km | Recarga: 7-8h | Bateria: lítio removível | Carga: 90-100kg
   Perfil: urbanos, estudantes, trabalhadores de pequenos deslocamentos, praticidade e facilidade de recarga.

3. Bike 500 | R$ 10.990 | Motor: Bosch 500W | Vel: 32km/h | Autonomia: 50km | Recarga: 7-8h | Bateria: lítio removível | Carga: 100-120kg
   Perfil: autopropelido mais forte para rotina diária, mais peso e uso mais intenso.

4. Bike MS 600 | R$ 11.990 | Motor: 600W | Vel: 32km/h | Autonomia: 70km | Recarga: 7-8h | Bateria: grafeno não removível | Carga: 100-120kg
   Perfil: uso recorrente, entregas leves, deslocamentos mais longos, maior autonomia no segmento.

5. Bliss | R$ 15.990 | Motor: 800W | Vel: 32km/h | Autonomia: 70km | Recarga: 6-7h | Bateria: lítio | Carga: 120-150kg
   Perfil: design premium, conforto, autonomia superior, deslocamento cotidiano refinado.

6. Liberty Ultra | R$ 12.990 | Motor: 1.000W | Vel: 32km/h | Autonomia: 70km | Recarga: 5-6h | Bateria: lítio 64V/30Ah | Carga: 150kg
   Perfil: mais autonomia, espaço e praticidade, baú traseiro, deslocamentos recorrentes, entregas leves.

── BICICLETAS ELÉTRICAS ──

7. Santa Monica | Preço: consulte | Motor: 500W | Vel: 32km/h | Autonomia: 60km | Recarga: 5h | Bateria: lítio | Carga: 120-150kg
   Perfil: design elegante, lifestyle urbano, lazer, deslocamentos diários, posicionamento premium.

8. Big Sur | Preço: consulte | Motor: 500W | Vel: 32km/h | Autonomia: 60km | Recarga: 5h | Bateria: lítio | Carga: 120-150kg
   Perfil: pneus largos (fat tire), visual premium, lazer, pisos variados, mais estabilidade.

── SCOOTERS ELÉTRICAS ──

9. MS 2500 | R$ 14.990 | Motor: 2.500W | Vel: 52km/h | Autonomia: 50km | Recarga: 6-7h | Bateria: chumbo não removível | Carga: 150kg
   Perfil: mais desempenho que autopropelido, deslocamentos diários urbanos, proposta prática.

10. New Holiday | R$ 15.990 | Motor: 2.000W | Vel: 50km/h | Autonomia: 50km | Recarga: 6-8h | Bateria: lítio removível 60V/20Ah | Carga: 150kg
    Perfil: visual clássico, conforto, banco duplo, recursos: ré, NFC, alarme, parking.

11. Holiday 1000 | R$ 10.490 | Motor: 1.000W | Vel: 32km/h | Autonomia: 45km | Recarga: 8-10h | Bateria: lítio removível 60V/20Ah | Carga: 150kg
    Perfil: mobilidade urbana leve, velocidade controlada, visual amigável, deslocamentos curtos/médios.

── TRICICLOS ELÉTRICOS ──

12. Triciclo Elétrico | R$ 15.990 | Motor: 650W | Vel: 32km/h | Autonomia: 60km | Recarga: 6-7h | Bateria: chumbo não removível | Carga: 120-150kg
    Perfil: estabilidade, conforto, público maduro, mobilidade assistida, uso interno/urbano.

── SCOOTERS ELÉTRICAS (ESPORTIVAS) ──

13. Tour 3K | R$ 16.990 | Motor: 3.000W | Vel: 75km/h | Autonomia: 40km | Recarga: 6-8h | Bateria: lítio removível | Carga: 120kg
    Perfil: identidade estética forte (custom/chopper), deslocamento urbano com performance, uso recreativo premium. Categoria: Scooters Elétricas.

14. S3K | R$ 19.990 | Motor: 3.500W | Vel: 80km/h | Autonomia: 85km | Recarga: 6-8h | Bateria: lítio removível | Carga: 120kg
    Perfil: maior performance, visual esportivo, substituto parcial de motos a combustão. Categoria: Scooters Elétricas.

── UTILITÁRIOS ──

15. Rhino Delivery | R$ 18.990 | Motor: 2.000W | Vel: 65km/h | Autonomia: 75km | Recarga: 6-8h | Bateria: lítio removível | Carga: 150kg
    Perfil: delivery, restaurantes, dark kitchens, farmácias, logística de última milha.

16. Cargo | R$ 28.990 | Motor: 1.000W | Vel: 32km/h | Autonomia: 70km | Recarga: 6-7h | Bateria: chumbo | Carga: 400kg
    Perfil: transporte de carga, operação comercial, frotas, logística interna, condomínios.

── INFANTIL ──

17. Moto Cross Infantil | R$ 5.990 | Motor: 800W | Vel: 32km/h | Autonomia: 35km | Recarga: 6h | Bateria: chumbo não removível | Carga: 55kg
    Perfil: crianças/adolescentes, chácaras, sítios, condomínios, lazer supervisionado.

18. Drift Elétrico 350 | R$ 1.999 | Motor: 350W | Vel: 12km/h | Autonomia: 8km | Recarga: 3-5h | Bateria: lítio 36V/3Ah | Carga: 80kg
    Perfil: drift recreativo, LED RGB, Bluetooth, diversão supervisionada.

── PATINETES ──

19. Patinete 350 | R$ 2.800 | Motor: 350W | Vel: 30km/h | Autonomia: 30km | Recarga: 5-6h | Bateria: lítio 36V/10Ah | Carga: 120kg
    Perfil: última milha, condomínios, campus, mobilidade complementar leve.

═══ FIM DO CATÁLOGO ═══

Com base nas respostas do quiz, retorne um JSON com exatamente esta estrutura (sem markdown, sem backticks, apenas JSON puro):
{
  "category": "Uma das categorias válidas acima",
  "justification": "1 frase curta explicando POR QUE esta categoria é ideal para o perfil",
  "models": [
    {
      "name": "NOME EXATO do catálogo",
      "headline": "Frase de até 10 palavras: benefício principal para o usuário",
      "specs": "Motor: XW | Vel: Xkm/h | Autonomia: Xkm | Recarga: Xh | Preço: R$X",
      "whyFits": "1-2 frases curtas conectando o perfil do usuário ao modelo"
    },
    {
      "name": "SEGUNDO MODELO",
      "headline": "Frase de até 10 palavras: por que é boa alternativa",
      "specs": "Motor: XW | Vel: Xkm/h | Autonomia: Xkm | Recarga: Xh | Preço: R$X",
      "whyFits": "1 frase curta sobre por que pode ser interessante"
    },
    {
      "name": "TERCEIRO MODELO (se aplicável)",
      "headline": "Frase de até 10 palavras",
      "specs": "Motor: XW | Vel: Xkm/h | Autonomia: Xkm | Recarga: Xh | Preço: R$X",
      "whyFits": "1 frase curta"
    }
  ],
  "suggestions": [],
  "whatsappMessage": "Mensagem curta em primeira pessoa, tom natural, citando os modelos recomendados."
}

REGRAS:
- Use APENAS modelos do catálogo acima. NUNCA invente modelos.
- Use o NOME EXATO do catálogo (ex: "Bike 400+", "MS 2500", "Rhino Delivery")
- Recomende 2-3 modelos ranqueados do mais adequado ao menos
- TODOS os modelos devem ter name, headline, specs e whyFits
- Headlines devem ser CURTAS (máx 10 palavras), focadas no benefício
- Specs devem usar os VALORES REAIS do catálogo, no formato: Motor | Vel | Autonomia | Recarga | Preço
- Para preços "consulte", escreva "Preço: consulte"
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
