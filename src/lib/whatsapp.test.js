import { describe, expect, it } from 'vitest';
import { buildWhatsAppLink, serviceWhatsAppLink } from './whatsapp';

describe('whatsapp links', () => {
  it('builds a base link with the correct number', () => {
    expect(buildWhatsAppLink()).toBe('https://wa.me/5548999179074');
  });

  it('includes an url-encoded prefilled message', () => {
    const link = buildWhatsAppLink('Olá! Teste.');
    expect(link).toBe('https://wa.me/5548999179074?text=Ol%C3%A1!%20Teste.');
  });

  it('mentions the service name in the prefilled message', () => {
    const link = serviceWhatsAppLink('Massagem Balinesa');
    expect(link).toContain('https://wa.me/5548999179074?text=');
    expect(decodeURIComponent(link.split('?text=')[1])).toContain('Massagem Balinesa');
  });
});
