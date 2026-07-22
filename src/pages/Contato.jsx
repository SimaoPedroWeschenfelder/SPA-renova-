import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { ADDRESS, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY } from '../lib/constants';
import { buildWhatsAppLink } from '../lib/whatsapp';
import styles from './Contato.module.css';

const MAPS_QUERY = encodeURIComponent('Hotel Mercure Florianópolis, Rod. Admar Gonzaga, 600, Itacorubi, Florianópolis - SC');
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export default function Contato() {
  return (
    <>
      <Seo
        title="Contato — SPAçoRENOVA | Hotel Mercure Florianópolis"
        description="Agende pelo WhatsApp, veja o endereço e como chegar ao SPAçoRENOVA, dentro do Hotel Mercure Florianópolis, em Itacorubi."
        path="/contato"
      />

      <header className={styles.pageHeader}>
        <div className="container">
          <h1>Contato</h1>
          <p>Atendimento com hora marcada. Fale com a gente pelo WhatsApp para agendar.</p>
        </div>
      </header>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <Reveal as="div" className={styles.info}>
            <div>
              <span className="eyebrow">Endereço</span>
              <p>{ADDRESS.line1}</p>
              <p>{ADDRESS.line2}</p>
              <p>{ADDRESS.city}</p>
            </div>

            <div>
              <span className="eyebrow">WhatsApp</span>
              <p>
                <a href={buildWhatsAppLink('Olá! Gostaria de agendar um horário no SPAçoRENOVA.')} target="_blank" rel="noopener noreferrer">
                  {WHATSAPP_DISPLAY}
                </a>
              </p>
            </div>

            <div>
              <span className="eyebrow">Instagram</span>
              <p>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  {INSTAGRAM_HANDLE}
                </a>
              </p>
            </div>

            <div>
              <span className="eyebrow">Como chegar</span>
              <p>O SPAçoRENOVA fica dentro do Hotel Mercure, no Itacorubi — entre a UDESC e o Jardim Botânico, com acesso rápido pela SC-404.</p>
              <p>Ao chegar, é só se identificar na recepção do hotel e pedir pelo spa.</p>
            </div>

            <div>
              <span className="eyebrow">Bom saber</span>
              <p>Atendimentos acontecem apenas com hora marcada. Hóspedes e visitantes contam com estacionamento fácil no próprio hotel.</p>
            </div>

            <a
              href={buildWhatsAppLink('Olá! Gostaria de agendar um horário no SPAçoRENOVA.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Agendar pelo WhatsApp
            </a>
          </Reveal>

          <Reveal as="div" delay={100} className={styles.mapWrap}>
            <iframe
              src={MAPS_EMBED_SRC}
              title="Localização do SPAçoRENOVA no Hotel Mercure Florianópolis"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
