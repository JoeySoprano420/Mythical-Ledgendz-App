import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../../../frontend/src/components/Calculator';

test('renders Calculator component and calculates correctly', async () => {
    render(<Calculator />);
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /calculate/i });

    fireEvent.change(inputElement, { target: { value: 'test input' } });
    fireEvent.click(buttonElement);

    const resultElement = await screen.findByText(/result:/i);
    expect(resultElement).toBeInTheDocument();
});
