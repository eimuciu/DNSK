import { render, screen } from '@testing-library/react';
import EditRecordForm from './EditRecordForm';

test('should render input with placeholder name "Owner name"', () => {
  render(<EditRecordForm sObj={{ name: 'John', plate: 'ABC123' }} />);
  const inputEl = screen.getByPlaceholderText('Owner name');
  expect(inputEl).toBeTruthy();
});

test('should render input with placeholder name "Car plate number"', () => {
  render(<EditRecordForm sObj={{ name: 'John', plate: 'ABC123' }} />);
  const inputEl = screen.getByPlaceholderText('Car plate number');
  expect(inputEl).toBeTruthy();
});
