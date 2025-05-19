import React from 'react';
import { render, screen } from '@testing-library/react';
import { NewsCard } from './index';

describe('NewsCard', () => {
  it('renders without crashing', () => {
    render(
      <NewsCard text="Test Content" attachments={[]} handleAbout={() => {}} />
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders provided image if attachments contain a photo with size r', () => {
    const attachments = [
      {
        photo: {
          sizes: [
            { type: 'r', url: 'http://test-image-url.com/img.jpg' }
          ]
        }
      }
    ];
    render(
      <NewsCard text="With image" attachments={attachments} handleAbout={() => {}} />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'http://test-image-url.com/img.jpg');
  });

  it('renders both buttons', () => {
    render(
      <NewsCard text="Buttons test" attachments={[]} handleAbout={() => {}} />
    );
    expect(screen.getByText('Поделиться')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });

  it('calls handleAbout when "Подробнее" is clicked', () => {
    const handleAbout = jest.fn();
    render(
      <NewsCard text="Click test" attachments={[]} handleAbout={handleAbout} />
    );
    screen.getByText('Подробнее').click();
    expect(handleAbout).toHaveBeenCalled();
  });
}); 