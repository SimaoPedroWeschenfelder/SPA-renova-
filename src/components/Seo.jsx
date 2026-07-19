import { useEffect } from 'react';
import { SITE_URL } from '../lib/constants';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({ title, description, path = '/', ogImage, noindex = false }) {
  useEffect(() => {
    if (title) document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', `${SITE_URL}${path}`);
    if (ogImage) upsertMeta('property', 'og:image', ogImage);
    upsertMeta('name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    if (ogImage) upsertMeta('name', 'twitter:image', ogImage);

    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', `${SITE_URL}${path}`);
  }, [title, description, path, ogImage, noindex]);

  return null;
}
