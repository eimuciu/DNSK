import { render, screen } from '@testing-library/react';
import PlatesList from './PlatesList';

test('should render th element "Owner name" and th element "Plate number"', () => {
  render(<PlatesList platesData={[{ name: 'John', plate: 'ABC123' }]} />);
  const thElOwner = screen.getByText(/Owner name/i);
  expect(thElOwner).toBeTruthy();
});

test('should render th element "John and ABC123"', () => {
  render(<PlatesList platesData={[{ name: 'John', plate: 'ABC123' }]} />);
  const john = screen.getByText(/John/i);
  expect(john).toBeTruthy();
  const abc = screen.getByText(/abc123/i);
  expect(abc).toBeTruthy();
});

test('should render button with text "Delete"', () => {
  render(<PlatesList platesData={[{ name: 'John', plate: 'ABC123' }]} />);
  const dltBtn = screen.getByRole('button', { name: 'Delete' });
  expect(dltBtn).toBeTruthy();
});

test('should render button with text "Edit"', () => {
  render(<PlatesList platesData={[{ name: 'John', plate: 'ABC123' }]} />);
  const dltBtn = screen.getByRole('button', { name: 'Edit' });
  expect(dltBtn).toBeTruthy();
});
