import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import { buildWhatsAppLink } from "../lib/whatsapp";
import cliente from "../assets/cliente-roupao.webp";
import facial1 from "../assets/renatapessoa.webp";
import styles from "./Sobre.module.css";

export default function Sobre() {
  return (
    <>
      <Seo
        title="Sobre — Renata Weschenfelder e o Spaço Renova | Florianópolis"
        description="Conheça a história do Spaço Renova e a trajetória de Renata Weschenfelder, terapeuta corporal com formação internacional em Nova Zelândia, Havaí e Bali."
        path="/sobre"
      />

      <header className={styles.pageHeader}>
        <div className="container">
          <h1>Sobre o Spaço Renova</h1>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.row}>
            <Reveal as="div" className={styles.image}>
              <img
                src={cliente}
                alt="Cliente sentada na maca de massagem, vestindo roupão branco, dentro do Spaço Renova"
                width={1280}
                height={700}
                loading="lazy"
                decoding="async"
              />
            </Reveal>
            <Reveal as="div" delay={100} className={styles.text}>
              <span className="eyebrow">Nossa história</span>
              <h2>
                Cuidado com raiz internacional, dentro do Mercure Florianópolis
              </h2>
              <p>
                O Spaço Renova funciona dentro do Hotel Mercure Florianópolis,
                em Itacorubi, recebendo hóspedes do hotel e também quem mora na
                cidade. A proposta é simples: um espaço tranquilo, discreto,
                onde cada atendimento acontece no ritmo de quem está sendo
                cuidado.
              </p>
              <p>
                Cada sala foi desenhada para reduzir estímulo — luz baixa,
                poucos ruídos, materiais naturais — para que o único trabalho de
                quem chega seja relaxar.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-sand)" }}>
        <div className="container">
          <div className={`${styles.row} ${styles.reverse}`}>
            <Reveal as="div" className={styles.image}>
              <img
                src={facial1}
                alt="Renata Weschenfelder realizando massagem facial em cliente deitada na maca"
                width={1280}
                height={550}
                loading="lazy"
                decoding="async"
              />
            </Reveal>
            <Reveal as="div" delay={100} className={styles.text}>
              <span className="eyebrow">Fundadora</span>
              <h2>Renata Weschenfelder</h2>
              <p>
                Terapeuta corporal e graduanda em Fisioterapia, Renata construiu
                sua formação viajando: passou por Nova Zelândia, Havaí e Bali
                estudando diferentes tradições de terapia corporal antes de
                trazer esse repertório para o Spaço Renova.
              </p>
              <p>
                É ela quem define o padrão de cada atendimento — técnico, mas
                acima de tudo humano. Cada sessão começa com uma escuta breve
                sobre o que você precisa naquele dia, sem protocolos engessados.
              </p>
              <a
                href={buildWhatsAppLink(
                  "Olá! Gostaria de agendar um horário com a Renata no Spaço Renova.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Agendar pelo WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
