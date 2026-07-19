# HANDOFF — Site Spaço Renova

Guia rápido para quem for continuar este projeto.

## Comandos

```bash
npm install        # instala dependências
npm run dev         # ambiente de desenvolvimento (Vite)
npm run build        # build de produção + pre-render das 4 rotas públicas em dist/
npm run preview      # serve o build de dist/ localmente
npm test          # roda a suíte de testes (Vitest) uma vez
npm run test:watch     # roda os testes em modo watch
```

## O que é placeholder e como trocar

### 1. Avaliações (depoimentos)
Arquivo: `src/data/reviews.js`
5 itens marcados com `// PLACEHOLDER — substituir por avaliações reais`. Troque `name`, `initials`, `rating` e `text` pelos textos reais tirados do Google. Pode adicionar ou remover itens livremente — o carrossel se adapta ao tamanho do array.

### 2. Link de avaliação do Google
Arquivo: `src/lib/constants.js`, constante `GOOGLE_REVIEW_URL`.
Está com uma URL de exemplo. Assim que tiver o Place ID do Spaço Renova no Google, troque pelo link real de avaliação (formato `https://search.google.com/local/writereview?placeid=...` ou o link curto `g.page/r/.../review`).

### 3. Domínio do site (SEO)
Arquivo: `src/lib/constants.js`, constante `SITE_URL`.
Usada para canonical, Open Graph e JSON-LD. Ao definir o domínio final, atualize também:
- `public/robots.txt` (linha do `Sitemap:`)
- `public/sitemap.xml` (todas as tags `<loc>`)

### 4. Fotos
Pasta: `src/assets/`. Nomes usados no código:

| Arquivo | Onde aparece | Status |
|---|---|---|
| `hero-sala.jpg` | Hero da Home | ✅ foto real |
| `logo-parede.jpg` | Seção intro da Home | ✅ foto real |
| `pedras-quentes-1.jpg` | Destaque "Massagens" na Home | ✅ foto real |
| `pedras-quentes-2.jpg` | Card "Pedras Quentes" em /servicos | ⚠️ placeholder gerado — trocar por foto real |
| `escalda-pes-sais.jpg` | Card "Spa dos Pés" em /servicos | ✅ foto real |
| `escalda-pes-cha.jpg` | Card "Day Spa" em /servicos | ✅ foto real |
| `facial-1.jpg` | Destaque "Faciais" na Home + foto da Renata em /sobre | ✅ foto real |
| `facial-2.jpg` | Card "Limpeza de Pele" em /servicos | ✅ foto real |
| `cliente-roupao.jpg` | Seção "Nossa história" em /sobre | ✅ foto real |
| `cha-detalhe.jpg` | Banner acima dos cards de "Day Spa" em /servicos | ⚠️ placeholder gerado — trocar por foto real |
| `dayspa-arte.jpg` | Destaque "Day Spa" na Home | ⚠️ placeholder gerado — trocar por foto real |

Para trocar uma foto: basta substituir o arquivo em `src/assets/` mantendo o mesmo nome. Se as proporções forem muito diferentes, ajuste os atributos `width`/`height` (ou `imageWidth`/`imageHeight` em `src/data/services.js`) no componente correspondente para evitar distorção/layout shift.

### 5. Supabase (rota /avaliar)
1. Rode o SQL de `supabase/migration.sql` no projeto Supabase (SQL editor ou CLI).
2. Copie `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (Project Settings → API, use a **anon public key**, nunca a service role).
3. No Netlify, configure as mesmas duas variáveis de ambiente no dashboard do site.
4. Sem essas variáveis, a página `/avaliar` continua funcionando (não quebra o build), mas o envio de sugestões mostra uma mensagem de erro em vez de gravar no banco.

Para ler as sugestões recebidas: use o dashboard do Supabase (Table Editor → `sugestoes`) ou uma query com a service role — o front (`anon`) só tem permissão de `INSERT`, nunca de leitura.

## Estrutura

```
src/
 ├─ pages/        Home, Servicos, Sobre, Contato, Avaliar (rota oculta)
 ├─ components/    Nav, Footer, Layout, ReviewsCarousel, ServiceCard, Seo, JsonLd, Reveal
 ├─ data/        services.js, reviews.js
 ├─ lib/         constants.js, whatsapp.js, supabaseClient.js
 ├─ hooks/        useScrollReveal.js
 └─ assets/       fotos (ver tabela acima)
scripts/prerender.mjs  script pós-build (Puppeteer) que gera dist/<rota>/index.html
supabase/migration.sql  schema + RLS da tabela de sugestões
netlify.toml       headers de segurança (CSP etc.) + redirect SPA
```

## Rotas

- `/`, `/servicos`, `/sobre`, `/contato` — públicas, com link no menu, pre-renderizadas no build.
- `/avaliar` — oculta (sem link no menu/rodapé, acesso via QR do cartão físico), `noindex`, **não** é pre-renderizada.

## Antes de publicar em produção

- [ ] Trocar os 5 depoimentos placeholder por avaliações reais
- [ ] Trocar `GOOGLE_REVIEW_URL` pelo link real
- [ ] Definir `SITE_URL` final e sincronizar com `robots.txt`/`sitemap.xml`
- [ ] Trocar as 3 fotos placeholder (`pedras-quentes-2`, `cha-detalhe`, `dayspa-arte`)
- [ ] Rodar a migração do Supabase e configurar as env vars no Netlify
- [ ] `npm run build` limpo + `npm audit` sem vulnerabilidades high/critical
- [ ] `npm test` verde
