import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../pages/Home';
import Servicos from '../pages/Servicos';
import { voucherOptions, GENERIC_VOUCHER_MESSAGE } from '../data/vouchers';

const WHATSAPP_BASE = 'https://wa.me/5548999179074';

function renderPage(Page) {
  return render(
    <MemoryRouter>
      <Page />
    </MemoryRouter>
  );
}

describe('/servicos — seção Vale-Presente', () => {
  it('renderiza a seção com título e todas as opções do array de dados', () => {
    renderPage(Servicos);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Vale-Presente' })
    ).toBeInTheDocument();

    for (const opcao of voucherOptions) {
      expect(
        screen.getByRole('heading', { level: 3, name: opcao.titulo })
      ).toBeInTheDocument();
    }
  });

  it('gera um link wa.me com o número e a mensagem de cada opção', () => {
    renderPage(Servicos);

    for (const opcao of voucherOptions) {
      const link = screen.getByLabelText(
        `Presentear com vale-presente: ${opcao.titulo}`
      );

      expect(link).toHaveAttribute(
        'href',
        `${WHATSAPP_BASE}?text=${encodeURIComponent(opcao.mensagemWhats)}`
      );
    }
  });

  it('mostra os 3 passos do "Como funciona"', () => {
    renderPage(Servicos);

    const comoFunciona = screen
      .getByRole('heading', { level: 3, name: 'Como funciona' })
      .closest('div');

    expect(within(comoFunciona).getAllByRole('listitem')).toHaveLength(3);
  });
});

describe('Home — bloco de vale-presente', () => {
  it('renderiza o bloco com os dois CTAs', () => {
    renderPage(Home);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Um presente que é uma pausa' })
    ).toBeInTheDocument();

    const primario = screen.getByRole('link', { name: 'Quero presentear' });
    expect(primario).toHaveAttribute(
      'href',
      `${WHATSAPP_BASE}?text=${encodeURIComponent(GENERIC_VOUCHER_MESSAGE)}`
    );

    const secundario = screen.getByRole('link', { name: 'Ver opções' });
    expect(secundario).toHaveAttribute('href', '/servicos#vale-presente');
  });
});
