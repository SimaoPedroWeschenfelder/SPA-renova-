import { useCallback, useEffect, useRef, useState } from 'react';
import { reviews } from '../data/reviews';
import styles from './ReviewsCarousel.module.css';

const SPEED_PX_PER_SEC = 32;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}

function Stars({ rating }) {
  return (
    <div className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review, duplicate }) {
  return (
    <article
      className={styles.card}
      tabIndex={duplicate ? -1 : 0}
      aria-hidden={duplicate || undefined}
      role="listitem"
    >
      <div className={styles.cardHead}>
        <span className={styles.avatar} aria-hidden="true">{review.initials}</span>
        <div>
          <p className={styles.name}>{review.name}</p>
          <Stars rating={review.rating} />
          <span className="visually-hidden">{review.rating} de 5 estrelas</span>
        </div>
      </div>
      <p className={styles.text}>{review.text}</p>
    </article>
  );
}

export default function ReviewsCarousel() {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startOffset: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
    }
  }, []);

  const getSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    return track.scrollWidth / 2;
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      applyTransform();
      return undefined;
    }

    const step = (ts) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!isPaused && !dragRef.current.dragging) {
        const setWidth = getSetWidth();
        offsetRef.current += SPEED_PX_PER_SEC * dt;
        if (setWidth > 0 && offsetRef.current >= setWidth) {
          offsetRef.current -= setWidth;
        }
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [isPaused, reducedMotion, applyTransform, getSetWidth]);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return 320;
    const cardEl = track.firstElementChild;
    const rect = cardEl.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '24');
    return rect.width + gap;
  }, []);

  const wrap = useCallback(
    (value) => {
      const setWidth = getSetWidth();
      if (setWidth <= 0) return value;
      let v = value % setWidth;
      if (v < 0) v += setWidth;
      return v;
    },
    [getSetWidth]
  );

  const goTo = useCallback(
    (direction) => {
      offsetRef.current = wrap(offsetRef.current + direction * getStep());
      if (trackRef.current) {
        trackRef.current.style.transition = `transform 420ms var(--ease-out)`;
        applyTransform();
        window.setTimeout(() => {
          if (trackRef.current) trackRef.current.style.transition = '';
        }, 420);
      }
    },
    [getStep, wrap, applyTransform]
  );

  const onPointerDown = (e) => {
    dragRef.current = { dragging: true, startX: e.clientX, startOffset: offsetRef.current };
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPaused(true);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.dragging) return;
    const delta = e.clientX - dragRef.current.startX;
    offsetRef.current = wrap(dragRef.current.startOffset - delta);
    applyTransform();
  };

  const endDrag = () => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    setIsPaused(false);
  };

  if (reviews.length === 0) return null;

  const looped = [...reviews, ...reviews];

  return (
    <div
      className={styles.wrapper}
      role="region"
      aria-label="Avaliações de clientes"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.viewport}>
        <div
          ref={trackRef}
          className={styles.track}
          role="list"
          data-testid="carousel-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          {looped.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} duplicate={i >= reviews.length} />
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.arrow} aria-label="Avaliação anterior" onClick={() => goTo(-1)}>
          ‹
        </button>
        <button type="button" className={styles.arrow} aria-label="Próxima avaliação" onClick={() => goTo(1)}>
          ›
        </button>
      </div>
    </div>
  );
}
