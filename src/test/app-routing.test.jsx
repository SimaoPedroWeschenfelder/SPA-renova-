import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../App';

const routes = ['/', '/servicos', '/sobre', '/contato', '/avaliar'];

describe('App routing', () => {
  it.each(routes)('renders %s without throwing, with exactly one h1', async (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );

    const headings = await screen.findAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it('does not link to /avaliar from the main navigation', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await screen.findAllByRole('heading', { level: 1 });
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    const links = within(nav).getAllByRole('link');
    expect(links.some((a) => a.getAttribute('href') === '/avaliar')).toBe(false);
  });
});
