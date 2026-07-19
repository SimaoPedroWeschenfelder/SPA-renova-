import { INSTAGRAM_URL, SITE_URL, WHATSAPP_DISPLAY } from '../lib/constants';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'DaySpa',
  name: 'Spaço Renova — Saúde e Bem-Estar',
  url: SITE_URL,
  telephone: WHATSAPP_DISPLAY,
  priceRange: 'R$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rod. Admar Gonzaga, 600 — Itacorubi',
    addressLocality: 'Florianópolis',
    addressRegion: 'SC',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.5875,
    longitude: -48.5115,
  },
  containedInPlace: {
    '@type': 'Hotel',
    name: 'Hotel Mercure Florianópolis',
  },
  sameAs: [INSTAGRAM_URL],
};

// Sem aggregateRating por enquanto — só entra quando houver avaliações reais confirmadas.
export default function JsonLd() {
  return (
    <script type="application/ld+json">{JSON.stringify(schema)}</script>
  );
}
