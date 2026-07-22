// Vale-presente (gift card) — venda e emissão são manuais, feitas pela Renata.
// Para editar as opções que aparecem em /servicos e na Home, mexa só neste arquivo.

// Prazo de validade do vale, em meses. A Renata ajusta aqui quando quiser.
export const VOUCHER_VALIDADE_MESES = 3;

// Mensagem genérica do CTA "Quero presentear" da Home.
export const GENERIC_VOUCHER_MESSAGE =
  "Olá! Quero presentear alguém com um vale-presente do SPAçoRENOVA. Meu nome: / Nome de quem vai receber: / Ocasião: ";

// Cada item vira um card. `mensagemWhats` é o texto que já vai pré-preenchido no
// WhatsApp — escrito para a cliente mandar de uma vez os dados que a Renata precisa.
export const voucherOptions = [
  {
    id: "experiencia-massagem",
    titulo: "Massagem 60min",
    descricao: "Uma hora inteira de pausa.",
    tipo: "experiencia",
    mensagemWhats:
      "Olá! Quero presentear alguém com um vale-presente de Massagem de 60 minutos do SPAçoRENOVA. Meu nome: / Nome de quem vai receber: / Ocasião: ",
  },
  {
    id: "experiencia-day-spa",
    titulo: "Day Spa",
    descricao:
      "A experiência completa: massagem, facial, escalda-pés, chá e lanche.",
    tipo: "experiencia",
    mensagemWhats:
      "Olá! Quero presentear alguém com um vale-presente de Day Spa (experiência completa) do SPAçoRENOVA. Meu nome: / Nome de quem vai receber: / Ocasião: ",
  },
  {
    id: "experiencia-facial",
    titulo: "Tratamento Facial",
    descricao: "Cuidado com a pele, do jeito certo.",
    tipo: "experiencia",
    mensagemWhats:
      "Olá! Quero presentear alguém com um vale-presente de Tratamento Facial do SPAçoRENOVA. Meu nome: / Nome de quem vai receber: / Ocasião: ",
  },
  {
    id: "valor-150",
    titulo: "R$ 150",
    descricao:
      "A pessoa escolhe o que combina com ela; o valor vira crédito nos serviços.",
    tipo: "valor",
    mensagemWhats:
      "Olá! Quero presentear alguém com um vale-presente de R$ 150 do SPAçoRENOVA. Meu nome: / Nome de quem vai receber: / Ocasião: ",
  },
  {
    id: "valor-250",
    titulo: "R$ 250",
    descricao:
      "A pessoa escolhe o que combina com ela; o valor vira crédito nos serviços.",
    tipo: "valor",
    mensagemWhats:
      "Olá! Quero presentear alguém com um vale-presente de R$ 250 do SPAçoRENOVA. Meu nome: / Nome de quem vai receber: / Ocasião: ",
  },
  {
    id: "valor-350",
    titulo: "R$ 350",
    descricao:
      "A pessoa escolhe o que combina com ela; o valor vira crédito nos serviços.",
    tipo: "valor",
    mensagemWhats:
      "Olá! Quero presentear alguém com um vale-presente de R$ 350 do SPAçoRENOVA. Meu nome: / Nome de quem vai receber: / Ocasião: ",
  },
];
