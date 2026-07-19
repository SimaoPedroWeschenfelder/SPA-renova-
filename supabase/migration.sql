-- Spaço Renova — tabela de sugestões da rota /avaliar
-- Site estático: a anon key é pública por design. A segurança fica no banco,
-- via RLS: anon só pode INSERT, nunca SELECT/UPDATE/DELETE.

create extension if not exists pgcrypto;

create table if not exists public.sugestoes (
  id uuid primary key default gen_random_uuid(),
  texto text not null check (char_length(texto) between 3 and 1000),
  nome text null,
  created_at timestamptz not null default now(),
  aprovado boolean not null default false
);

alter table public.sugestoes enable row level security;

-- Única política: permite INSERT para o papel anon (usado pelo front público).
-- Sem política de SELECT/UPDATE/DELETE para anon => negado por padrão com RLS ligado.
-- Leitura das sugestões deve ser feita pelo dashboard do Supabase ou com a service role.
create policy "anon pode inserir sugestao"
  on public.sugestoes
  for insert
  to anon
  with check (true);
