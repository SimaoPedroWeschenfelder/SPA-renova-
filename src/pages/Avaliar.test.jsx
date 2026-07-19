import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import Avaliar from './Avaliar';

const insertMock = vi.fn();

vi.mock('../lib/supabaseClient', () => ({
  get supabase() {
    return { from: () => ({ insert: insertMock }) };
  },
}));

describe('Avaliar page', () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
  });

  it('does not show the suggestion field before the Google button is clicked', () => {
    render(<Avaliar />);
    expect(screen.queryByLabelText(/Quer sugerir alguma melhoria/)).not.toBeInTheDocument();
  });

  it('reveals the suggestion field after clicking "Avaliar no Google"', () => {
    render(<Avaliar />);
    fireEvent.click(screen.getByRole('link', { name: 'Avaliar no Google' }));
    expect(screen.getByLabelText(/Quer sugerir alguma melhoria/)).toBeInTheDocument();
  });

  it('rejects a suggestion shorter than the minimum length', async () => {
    render(<Avaliar />);
    fireEvent.click(screen.getByRole('link', { name: 'Avaliar no Google' }));

    fireEvent.change(screen.getByLabelText(/Quer sugerir alguma melhoria/), { target: { value: 'oi' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/entre 3 e 1000 caracteres/);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it('does not submit when the honeypot field is filled', async () => {
    render(<Avaliar />);
    fireEvent.click(screen.getByRole('link', { name: 'Avaliar no Google' }));

    fireEvent.change(screen.getByLabelText(/Quer sugerir alguma melhoria/), {
      target: { value: 'Sugestão válida de teste.' },
    });
    fireEvent.change(screen.getByLabelText('Não preencha este campo'), { target: { value: 'spam' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(await screen.findByRole('status')).toBeInTheDocument();
    expect(insertMock).not.toHaveBeenCalled();
  });

  it('submits a valid suggestion and shows a thank-you message', async () => {
    render(<Avaliar />);
    fireEvent.click(screen.getByRole('link', { name: 'Avaliar no Google' }));

    fireEvent.change(screen.getByLabelText(/Quer sugerir alguma melhoria/), {
      target: { value: 'Adorei o atendimento, só sugiro mais horários aos sábados.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    await waitFor(() => expect(insertMock).toHaveBeenCalledTimes(1));
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({ texto: 'Adorei o atendimento, só sugiro mais horários aos sábados.' })
    );
    expect(await screen.findByRole('status')).toHaveTextContent(/Obrigada por avaliar/);
  });
});
