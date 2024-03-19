import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyConverter from './CurrencyConverter';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      rates: {
        USD: 1.234,
        EUR: 0.811,
        JPY: 132.91,
      },
    }),
  })
);

describe('CurrencyConverter', () => {
    test('renders without crashing', () => {
        render(<CurrencyConverter />);
    });
  
    test('renders form fields', () => {
        const { getByLabelText } = render(<CurrencyConverter />);
        const amountInput = getByLabelText('Amount');
        const fromCurrencySelect = getByLabelText('From');
        const toCurrencySelect = getByLabelText('To');

        expect(amountInput).toBeInTheDocument();
        expect(fromCurrencySelect).toBeInTheDocument();
        expect(toCurrencySelect).toBeInTheDocument();
    }); 
});
