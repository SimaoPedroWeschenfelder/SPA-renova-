// Script pós-build: renderiza as 4 rotas públicas com Puppeteer local e grava
// o HTML resultante em dist/<rota>/index.html para SEO (crawlers e social preview).
// /avaliar fica FORA do pre-render (permanece só client-side, com noindex).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const ROUTES = ['/', '/servicos', '/sobre', '/contato'];

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function startServer() {
  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(distDir, urlPath);

    if (!existsSync(filePath) || urlPath.endsWith('/')) {
      filePath = path.join(distDir, 'index.html');
    }

    try {
      const data = await readFile(filePath);
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function run() {
  const server = await startServer();
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0' });
      // pequena espera extra para o Seo.jsx (useEffect) terminar de escrever title/meta
      await new Promise((r) => setTimeout(r, 300));

      const html = await page.content();

      const outDir = route === '/' ? distDir : path.join(distDir, route.slice(1));
      const { mkdir, writeFile } = await import('node:fs/promises');
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, 'index.html'), html, 'utf-8');

      console.log(`[prerender] ${route} -> ${path.relative(distDir, outDir)}/index.html`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error('[prerender] falhou:', err);
  process.exit(1);
});
