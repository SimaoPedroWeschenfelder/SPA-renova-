import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ServiceCard from "../components/ServiceCard";
import { serviceGroups } from "../data/services";
import { voucherOptions, VOUCHER_VALIDADE_MESES } from "../data/vouchers";
import { serviceWhatsAppLink, buildWhatsAppLink } from "../lib/whatsapp";
import pedrasQuentes1 from "../assets/pedras-quentes-1.jpg";
import facial1 from "../assets/facial-1.jpg";
import chaDetalhe from "../assets/escalda-pes-sais.webp";
import escaldaPesCha from "../assets/escalda-pes-cha.webp";
import valePresente from "../assets/vale-presente.svg";
import styles from "./Servicos.module.css";

const voucherSteps = [
  "Você escolhe o vale e fala com a gente no WhatsApp.",
  "A gente confirma o pagamento e emite o vale com o nome de quem vai receber.",
  "Você entrega o vale (digital ou impresso) e a pessoa agenda quando quiser.",
];

const groupMeta = {
  massagens: {
    image: pedrasQuentes1,
    imageWidth: 128,
    imageHeight: 499,
    blurb:
      "Nove técnicas, cada uma com uma intenção — do toque lento da anti-stress à pressão firme do deep tissue.",
  },
  faciais: {
    image: facial1,
    imageWidth: 2000,
    imageHeight: 800,
    blurb:
      "Cuidado com a pele do rosto, sempre com avaliação e produtos adequados ao seu tipo de pele.",
  },
};

const daySpaIncludes = [
  "Massagem de 60 minutos",
  "Hidratação facial + esfoliação",
  "Escalda-pés com ervas",
  "Chá aromático",
  "Lanche saudável",
];

export default function Servicos() {
  const massagens = serviceGroups.find((g) => g.id === "massagens");
  const faciais = serviceGroups.find((g) => g.id === "faciais");
  const daySpa = serviceGroups.find((g) => g.id === "day-spa").items[0];
  const planos = serviceGroups.find((g) => g.id === "planos");

  return (
    <>
      <Seo
        title="Serviços — Massagens, Faciais e Day Spa | SPAçoRENOVA"
        description="Conheça as massagens, tratamentos faciais, day spa, vale-presente e planos do SPAçoRENOVA, dentro do Hotel Mercure Florianópolis. Preços e agendamento pelo WhatsApp."
        path="/servicos"
      />

      <header className={styles.pageHeader}>
        <div className="container">
          <h1>Serviços</h1>
          <p>
            Cada tratamento tem seu próprio ritmo. Escolha o que combina com o
            seu momento.
          </p>
        </div>
      </header>

      {[massagens, faciais].map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          className={`${styles.groupSection} ${gi % 2 === 1 ? styles.alt : ""}`}
        >
          <div className="container">
            <Reveal as="div" className={styles.groupHead}>
              <img
                src={groupMeta[group.id].image}
                alt=""
                width={groupMeta[group.id].imageWidth}
                height={groupMeta[group.id].imageHeight}
                loading="lazy"
                decoding="async"
                className={styles.groupImage}
              />
              <div>
                <h2>{group.title}</h2>
                <p>{groupMeta[group.id].blurb}</p>
              </div>
            </Reveal>

            <div className={styles.grid}>
              {group.items.map((service, i) => (
                <Reveal as="div" key={service.id} delay={(i % 3) * 70}>
                  <ServiceCard service={service} compact />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="day-spa" className={styles.daySpa}>
        <div className={`container ${styles.daySpaInner}`}>
          <Reveal as="div" className={styles.daySpaImages}>
            <img
              src={escaldaPesCha}
              alt="Chá aromático sendo servido durante a experiência Day Spa"
              width={1400}
              height={1200}
              loading="lazy"
              decoding="async"
            />
            <img
              src={chaDetalhe}
              alt="Detalhe da xícara de chá do Day Spa"
              width={900}
              height={900}
              loading="lazy"
              decoding="async"
              className={styles.daySpaImageSecond}
            />
          </Reveal>

          <Reveal as="div" delay={120} className={styles.daySpaContent}>
            <span className="eyebrow">Experiência completa · ~2h</span>
            <h2>Day Spa</h2>
            <p>
              Uma pausa de verdade: cerca de duas horas dedicadas só a você,
              começando pelo escalda-pés e terminando com chá e um lanche
              saudável.
            </p>
            <ul className={styles.daySpaList}>
              {daySpaIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              href={serviceWhatsAppLink(daySpa.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              Consultar valores no WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      <section id="vale-presente" className={styles.vale}>
        <div className="container">
          <Reveal as="div" className="section-heading">
            <span className="eyebrow">Presenteie</span>
            <h2>Vale-Presente</h2>
            <p>
              Presentear alguém com uma pausa de verdade. A pessoa escolhe o
              tratamento e agenda quando for melhor pra ela.
            </p>
          </Reveal>

          <Reveal as="div" delay={80} className={styles.valeArtWrap}>
            <img
              src={valePresente}
              alt="Vale-presente do SPAçoRENOVA"
              width={1000}
              height={620}
              loading="lazy"
              decoding="async"
              className={styles.voucherArt}
            />
          </Reveal>

          {[
            { tipo: "experiencia", titulo: "Por experiência" },
            { tipo: "valor", titulo: "Por valor" },
          ].map((familia) => (
            <div key={familia.tipo} className={styles.valeFamilia}>
              <Reveal as="p" className={styles.valeFamiliaTitulo}>
                {familia.titulo}
              </Reveal>

              <div className={styles.valeGrid}>
                {voucherOptions
                  .filter((opcao) => opcao.tipo === familia.tipo)
                  .map((opcao, i) => (
                    <Reveal
                      as="article"
                      key={opcao.id}
                      delay={(i % 3) * 70}
                      className={styles.valeCard}
                    >
                      <h3 className={styles.valeCardTitulo}>{opcao.titulo}</h3>
                      <p className={styles.valeCardTexto}>{opcao.descricao}</p>
                      <a
                        href={buildWhatsAppLink(opcao.mensagemWhats)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.valeCardLink}
                        aria-label={`Presentear com vale-presente: ${opcao.titulo}`}
                      >
                        Presentear →
                      </a>
                    </Reveal>
                  ))}
              </div>
            </div>
          ))}

          <Reveal as="div" className={styles.valeComoFunciona}>
            <h3>Como funciona</h3>
            <ol className={styles.valePassos}>
              {voucherSteps.map((passo, i) => (
                <li key={passo}>
                  <span className={styles.valePassoNumero}>{i + 1}</span>
                  <span>{passo}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <p className={styles.valeLegal}>
            Vale válido por {VOUCHER_VALIDADE_MESES} meses a partir da emissão.
            Não é reembolsável em dinheiro.
          </p>
        </div>
      </section>

      <section id="planos" className={styles.planos}>
        <div className="container">
          <Reveal as="div" className={styles.planosHead}>
            <h2>Planos</h2>
            <p>Para quem quer fazer do cuidado um hábito.</p>
          </Reveal>

          <div className={styles.planosGrid}>
            {planos.items.map((plan, i) => (
              <Reveal
                as="div"
                key={plan.id}
                delay={i * 90}
                className={styles.planoCard}
              >
                <span className={styles.planoOff}>{plan.pricing[0].price}</span>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <a
                  href={serviceWhatsAppLink(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.planoLink}
                >
                  Fechar pelo WhatsApp →
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
