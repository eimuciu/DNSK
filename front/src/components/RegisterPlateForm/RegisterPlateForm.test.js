import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPlateForm from './RegisterPlateForm';

test("it shout render input with placeholder 'Owner name'", () => {
  render(<RegisterPlateForm />);
  const inputEl = screen.getByPlaceholderText('Owner name');
  expect(inputEl).toBeTruthy();
});

test('should be able to type in input', () => {
  render(<RegisterPlateForm />);
  const inputEl = screen.getByPlaceholderText('Owner name');
  expect(inputEl).toBeTruthy();
  fireEvent.change(inputEl, { target: { value: 'bubble gum' } });
  expect(inputEl.value).toBe('bubble gum');
});
