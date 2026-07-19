import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../pages/Home';
import Servicos from '../pages/Servicos';
import Sobre from '../pages/Sobre';
import Contato from '../pages/Contato';

const pages = [
  ['Home', Home],
  ['Servicos', Servicos],
  ['Sobre', Sobre],
  ['Contato', Contato],
];

describe('public pages smoke test', () => {
  it.each(pages)('%s renders without throwing and has exactly one h1', (_name, Page) => {
    render(
      <MemoryRouter>
        <Page />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});
