import '@testing-library/jest-dom/vitest';

if (typeof window.IntersectionObserver === 'undefined') {
  window.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (typeof window.matchMedia === 'undefined') {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

// Sempre baseado em setTimeout (mesmo que o jsdom já tenha rAF nativo) para que
// os testes possam controlar a animação do carrossel com timers falsos do Vitest.
window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
window.cancelAnimationFrame = (id) => clearTimeout(id);
