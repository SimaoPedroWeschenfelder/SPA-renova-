import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ReviewsCarousel from "../components/ReviewsCarousel";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { ADDRESS } from "../lib/constants";
import heroSala from "../assets/fundo.webp";
import heroFundo2 from "../assets/fundo2.webp";
import heroFundo3 from "../assets/fundo3.webp";
import heroFundo4 from "../assets/fundo4.webp";
import logoParede from "../assets/parede.webp";
import pedrasQuentes1 from "../assets/pedras.webp";
import facial1 from "../assets/renata.webp";
import dayspaArte from "../assets/fundo2.webp";
import styles from "./Home.module.css";

const heroSlides = [
  {
    src: heroSala,
    alt: "Sala de massagem do Spaço Renova, com parede curva iluminada em LED",
  },
  { src: heroFundo2, alt: "" },
  { src: heroFundo3, alt: "" },
  { src: heroFundo4, alt: "" },
];

const HERO_SLIDE_INTERVAL = 6000;

const highlights = [
  {
    title: "Massagens",
    description:
      "Anti-stress, ayurvédica, balinesa, deep tissue e mais — cada toque com uma intenção diferente.",
    image: pedrasQuentes1,
    imageWidth: 1270,
    imageHeight: 720,
    href: "/servicos#massagens",
  },
  {
    title: "Tratamentos Faciais",
    description:
      "Limpeza de pele, hidratação e microagulhamento para cuidar da pele com técnica.",
    image: facial1,
    imageWidth: 1280,
    imageHeight: 720,
    href: "/servicos#faciais",
  },
  {
    title: "Day Spa",
    description:
      "Uma experiência completa de cerca de 2 horas, do banho de pés ao chá aromático.",
    image: dayspaArte,
    imageWidth: 1280,
    imageHeight: 720,
    href: "/servicos#day-spa",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Seo
        title="Spaço Renova — Spa, Massagens e Bem-Estar em Florianópolis | Hotel Mercure"
        description="Spa premium dentro do Hotel Mercure Florianópolis. Massagens, tratamentos faciais e day spa em Itacorubi. Agende pelo WhatsApp."
        path="/"
        ogImage={heroSala}
      />

      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          {heroSlides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              aria-hidden={i === activeSlide ? undefined : "true"}
              className={`${styles.heroImage} ${
                i === activeSlide ? styles.heroImageActive : ""
              }`}
              width={800}
              height={499}
              decoding="async"
              fetchPriority={i === 0 ? "high" : undefined}
            />
          ))}
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <p className={styles.heroEyebrow}>Spaço Renova · Saúde e Bem-Estar</p>
          <h1 className={styles.heroTitle}>Seu momento de pausa começa aqui</h1>
          <p className={styles.heroTagline}>
            Renove seu corpo · Restaure sua mente · Reequilibre sua essência
          </p>

          <div className={styles.heroActions}>
            <a
              href={buildWhatsAppLink(
                "Olá! Gostaria de agendar um horário no Spaço Renova.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Agendar pelo WhatsApp
            </a>
            <Link to="/servicos" className="btn btn-secondary">
              Conhecer os tratamentos
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.intro}>
            <Reveal as="div" className={styles.introImage}>
              <img
                src={logoParede}
                alt="Logo do Spaço Renova em dourado sobre parede de madeira"
                width={1920}
                height={400}
                loading="lazy"
                decoding="async"
              />
            </Reveal>
            <Reveal as="div" delay={100} className={styles.introText}>
              <span className="eyebrow">O Spaço</span>
              <h2>Um refúgio dentro do Mercure Florianópolis</h2>
              <p>
                O Spaço Renova nasceu para dar aos hóspedes do hotel e a
                Florianópolis um lugar de cuidado real — sem pressa, sem
                excesso. Cada sala foi pensada para o silêncio, e cada
                atendimento é conduzido por terapeutas com formação sólida em
                terapias corporais.
              </p>
              <p>Você chega tenso e sai leve. É esse o único compromisso.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-sand)" }}>
        <div className="container">
          <Reveal as="div" className="section-heading">
            <span className="eyebrow">Tratamentos</span>
            <h2>O que você vai encontrar por aqui</h2>
          </Reveal>

          <div className={styles.highlights}>
            {highlights.map((item, i) => (
              <Reveal
                as={Link}
                to={item.href}
                key={item.title}
                delay={i * 90}
                className={styles.highlightCard}
              >
                <img
                  src={item.image}
                  alt=""
                  width={item.imageWidth}
                  height={item.imageHeight}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.highlightBody}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className={styles.highlightLink}>Ver detalhes →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-heading">
            <span className="eyebrow">Depoimentos</span>
            <h2>Quem já passou por aqui</h2>
          </Reveal>
          <ReviewsCarousel />
        </div>
      </section>

      <section className={styles.ctaFinal}>
        <div className={`container ${styles.ctaFinalInner}`}>
          <h2>Pronta para o seu momento de pausa?</h2>
          <p>
            {ADDRESS.line1} — {ADDRESS.line2}, {ADDRESS.city}
          </p>
          <a
            href={buildWhatsAppLink(
              "Olá! Gostaria de agendar um horário no Spaço Renova.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Agendar pelo WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
