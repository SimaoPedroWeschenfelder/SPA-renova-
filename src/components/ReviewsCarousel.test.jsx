import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ReviewsCarousel from './ReviewsCarousel';
import { reviews } from '../data/reviews';

function getTransformX(el) {
  const match = /translateX\((-?\d+(?:\.\d+)?)px\)/.exec(el.style.transform);
  return match ? parseFloat(match[1]) : 0;
}

describe('ReviewsCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders one card per review (duplicates are hidden from the a11y tree)', () => {
    render(<ReviewsCarousel />);
    expect(screen.getAllByRole('listitem')).toHaveLength(reviews.length);
  });

  it('exposes an accessible region with prev/next controls', () => {
    render(<ReviewsCarousel />);
    expect(screen.getByRole('region', { name: 'Avaliações de clientes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Avaliação anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima avaliação' })).toBeInTheDocument();
  });

  it('moves the track when the next arrow is clicked', () => {
    render(<ReviewsCarousel />);
    const track = screen.getByTestId('carousel-track');
    const before = getTransformX(track);

    fireEvent.click(screen.getByRole('button', { name: 'Próxima avaliação' }));

    const after = getTransformX(track);
    expect(after).not.toBe(before);
  });

  it('pauses autoplay on hover and resumes after mouse leave', () => {
    render(<ReviewsCarousel />);
    const region = screen.getByRole('region', { name: 'Avaliações de clientes' });
    const track = screen.getByTestId('carousel-track');

    fireEvent.mouseEnter(region);
    const pausedStart = getTransformX(track);
    vi.advanceTimersByTime(2000);
    const pausedEnd = getTransformX(track);
    expect(pausedEnd).toBe(pausedStart);

    fireEvent.mouseLeave(region);
    vi.advanceTimersByTime(2000);
    const afterResume = getTransformX(track);
    expect(afterResume).not.toBe(pausedEnd);
  });
});
