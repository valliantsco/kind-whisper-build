
-- Tabela de leads para captura do formulário de contato
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  details TEXT,
  subject TEXT DEFAULT 'Outros Assuntos',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  source TEXT DEFAULT 'popup_contato',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: permitir inserção anônima (formulário público, sem autenticação)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on leads"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Nenhuma política de SELECT para anon (dados protegidos)
-- Apenas service_role pode ler os dados
