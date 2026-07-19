import { useState } from 'react';
import { serviceWhatsAppLink } from '../lib/whatsapp';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, compact = false }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`}>
      {service.image && (
        <img
          src={service.image}
          alt=""
          className={styles.image}
          width={service.imageWidth || 900}
          height={service.imageHeight || 1200}
          loading="lazy"
          decoding="async"
        />
      )}

      <h3 className={styles.name}>{service.name}</h3>
      <p className={styles.description}>{service.description}</p>

      {service.details && (
        <>
          {expanded && <p className={styles.details}>{service.details}</p>}
          <button
            type="button"
            className={styles.moreBtn}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? 'Ver menos' : 'Ver mais'}
          </button>
        </>
      )}

      <ul className={styles.pricing}>
        {service.pricing.map((p, i) => (
          <li key={i}>
            {p.duration && <span className={styles.duration}>{p.duration}</span>}
            <span className={styles.price}>{p.price}</span>
          </li>
        ))}
      </ul>

      <a
        href={serviceWhatsAppLink(service.name)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.agendarLink}
      >
        Agendar →
      </a>
    </article>
  );
}
