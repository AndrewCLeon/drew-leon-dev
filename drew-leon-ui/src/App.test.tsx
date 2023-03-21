import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App.tsx', () => {

  it('Renders the under construction image', () => {
    render(<App />);
    const underConstructionImage = screen.getByTestId("website-under-construction-image")
    expect(underConstructionImage).toBeInTheDocument()
  });
})
