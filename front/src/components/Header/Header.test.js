import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

test('should render input with placeholder name "Search plate number..."', () => {
  render(<Header />);
  const inputEl = screen.getByPlaceholderText(/search plate number.../i);
  expect(inputEl).toBeTruthy();
});

test('should respond to input changes', () => {
  render(<Header />);
  const inputEl = screen.getByPlaceholderText(/search plate number.../i);
  expect(inputEl).toBeTruthy();
  fireEvent.change(inputEl, { target: { value: 'some some' } });
  expect(inputEl.value).toBe('some some');
});

test('should render button', () => {
  render(<Header />);
  const btnEl = screen.getByRole('button', { name: /register new plate/i });
  expect(btnEl).toBeTruthy();
});
