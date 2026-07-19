import { Link } from 'react-router-dom';
import { ADDRESS, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY } from '../lib/constants';
import { buildWhatsAppLink } from '../lib/whatsapp';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>Spaço Renova</p>
          <p className={styles.tagline}>Renove seu corpo · Restaure sua mente · Reequilibre sua essência</p>
        </div>

        <div>
          <p className={styles.heading}>Navegação</p>
          <ul className={styles.list}>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>

        <div>
          <p className={styles.heading}>Contato</p>
          <ul className={styles.list}>
            <li>
              <a href={buildWhatsAppLink('Olá! Gostaria de agendar um horário no Spaço Renova.')} target="_blank" rel="noopener noreferrer">
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                Instagram {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>{ADDRESS.line1}</li>
            <li>{ADDRESS.line2}</li>
            <li>{ADDRESS.city}</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} Spaço Renova — Saúde e Bem-Estar. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
