import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { buildWhatsAppLink } from '../lib/whatsapp';
import styles from './Nav.module.css';

const links = [
  { to: '/', label: 'Início' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === '/' && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${overHero ? styles.light : ''} ${open ? styles.menuOpen : ''}`}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand} onClick={() => setOpen(false)}>
          Spaço Renova
        </NavLink>

        <nav className={styles.links} aria-label="Navegação principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={buildWhatsAppLink('Olá! Gostaria de agendar um horário no Spaço Renova.')}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-gold ${styles.cta}`}
        >
          Agendar
        </a>

        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.open : ''}`}
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className={styles.mobileMenu} aria-label="Navegação móvel">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={buildWhatsAppLink('Olá! Gostaria de agendar um horário no Spaço Renova.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Agendar pelo WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
