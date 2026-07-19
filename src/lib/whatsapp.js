import { WHATSAPP_NUMBER } from './constants';

export function buildWhatsAppLink(message) {
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : '';
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}

export function serviceWhatsAppLink(serviceName) {
  return buildWhatsAppLink(`Olá! Gostaria de agendar: ${serviceName}.`);
}
