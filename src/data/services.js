import pedrasQuentes2 from "../assets/pedras-quentes-2.jpg";
import escaldaPesSais from "../assets/escalda-pes-sais.webp";
import escaldaPesCha from "../assets/escalda-pes-cha.webp";
import facial2 from "../assets/facial-2.jpg";

export const serviceGroups = [
  {
    id: "massagens",
    title: "Massagens",
    items: [
      {
        id: "anti-stress",
        name: "Anti-Stress",
        description:
          "Toque lento e envolvente para desacelerar o corpo e a mente, aliviando a tensão acumulada do dia a dia.",
        details:
          "Sessão conduzida em ambiente com pouca luz e música suave, com pressão leve a moderada em todo o corpo — a escolha ideal para quem quer apenas desacelerar.",
        pricing: [
          { duration: "60min", price: "R$245" },
          { duration: "90min", price: "R$290" },
        ],
      },
      {
        id: "ayurvedica",
        name: "Massagem Ayurvédica",
        description:
          "Técnica tradicional indiana com óleos aquecidos e movimentos ritmados, buscando equilíbrio entre corpo e energia.",
        details:
          "Inspirada na medicina tradicional indiana, une óleos vegetais aquecidos a movimentos amplos e ritmados ao longo do corpo.",
        pricing: [
          { duration: "60min", price: "R$250" },
          { duration: "90min", price: "R$290" },
        ],
      },
      {
        id: "balinesa",
        name: "Massagem Balinesa",
        description:
          "Combinação de alongamentos, pressão profunda e deslizamentos suaves, inspirada nas terapias corporais de Bali.",
        details:
          "Técnica balinesa tradicional, com alternância entre pressão profunda, alongamentos e deslizamentos longos — um dos formatos com formação internacional da nossa terapeuta.",
        pricing: [
          { duration: "60min", price: "R$250" },
          { duration: "90min", price: "R$290" },
        ],
      },
      {
        id: "deep-tissue",
        name: "Deep Tissue",
        description:
          "Pressão firme e localizada nas camadas mais profundas da musculatura, indicada para quem busca um toque mais intenso.",
        details:
          "Trabalho mais intenso e localizado, com pressão progressiva nas regiões de maior tensão muscular.",
        pricing: [
          { duration: "60min", price: "R$245" },
          { duration: "90min", price: "R$290" },
        ],
      },
      {
        id: "drenagem-linfatica",
        name: "Drenagem Linfática",
        description:
          "Movimentos suaves e ritmados que acompanham o trajeto linfático, proporcionando sensação de leveza.",
        details:
          "Movimentos leves e ritmados, feitos no sentido do trajeto linfático, com toque bem mais suave do que uma massagem convencional.",
        pricing: [
          { duration: "60min", price: "R$230" },
          { duration: "90min", price: "R$290" },
        ],
      },
      {
        id: "pedras-quentes",
        name: "Pedras Quentes",
        description:
          "Pedras vulcânicas aquecidas somadas ao toque da terapeuta para um relaxamento profundo da musculatura.",
        details:
          "Pedras vulcânicas aquecidas são deslizadas e apoiadas sobre pontos específicos do corpo, somando o calor ao trabalho manual da terapeuta.",

        pricing: [
          { duration: "60min", price: "R$250" },
          { duration: "90min", price: "R$290" },
        ],
      },
      {
        id: "massagem-express",
        name: "Massagem Express",
        description:
          "Sessão objetiva para aliviar tensão em pouco tempo, ideal entre um compromisso e outro.",
        pricing: [{ duration: "30min", price: "R$145" }],
      },
      {
        id: "spa-dos-pes",
        name: "Spa dos Pés",
        description:
          "Ritual de escalda-pés com ervas seguido de massagem, um cuidado especial para quem passa o dia em pé.",
        details:
          "Começa com um banho de pés com ervas e sais, seguido de massagem nos pés e pernas — ótimo para quem viaja ou passa o dia em pé.",

        pricing: [
          { duration: "30min", price: "R$145" },
          { duration: "60min", price: "R$245" },
        ],
      },
      {
        id: "ventosaterapia",
        name: "Ventosaterapia",
        description:
          "Uso de ventosas associado à massagem para trabalhar pontos de tensão específicos do corpo.",
        details:
          "As ventosas são posicionadas em pontos específicos e combinadas com massagem manual, técnica usada há séculos em diferentes culturas.",
        pricing: [
          { duration: "60min", price: "R$250" },
          { duration: "90min", price: "R$290" },
        ],
      },
    ],
  },
  {
    id: "faciais",
    title: "Tratamentos Faciais",
    items: [
      {
        id: "limpeza-de-pele",
        name: "Limpeza de Pele",
        description:
          "Higienização profunda da pele do rosto, com extração e finalização calmante.",

        pricing: [{ duration: null, price: "R$300" }],
      },
      {
        id: "hidratacao-facial",
        name: "Hidratação Facial",
        description:
          "Reposição de hidratação para a pele do rosto, deixando-a mais confortável e viçosa.",
        pricing: [{ duration: null, price: "R$220" }],
      },
      {
        id: "microagulhamento",
        name: "Microagulhamento",
        description:
          "Procedimento estético facial realizado com técnica e agulhas finas, sob orientação da terapeuta.",
        pricing: [{ duration: null, price: "R$350" }],
      },
    ],
  },
  {
    id: "day-spa",
    title: "Day Spa",
    items: [
      {
        id: "day-spa-experiencia",
        name: "Day Spa — Experiência Completa",
        description:
          "Uma tarde inteira de cuidado: massagem de 60min, hidratação facial, esfoliação, escalda-pés com ervas, chá aromático e um lanche saudável. Aproximadamente 2 horas de experiência.",
        image: escaldaPesCha,
        imageWidth: 1066,
        imageHeight: 1600,
        pricing: [{ duration: "~2h", price: "Consulte pelo WhatsApp" }],
      },
    ],
  },
  {
    id: "planos",
    title: "Planos",
    items: [
      {
        id: "plano-4-sessoes",
        name: "Pacote 4 sessões",
        description:
          "Feche um pacote de 4 sessões e garanta 5% de desconto no valor total.",
        pricing: [{ duration: null, price: "5% off" }],
      },
      {
        id: "plano-8-sessoes",
        name: "Pacote 8 sessões",
        description:
          "Feche um pacote de 8 sessões e garanta 10% de desconto no valor total.",
        pricing: [{ duration: null, price: "10% off" }],
      },
    ],
  },
];
