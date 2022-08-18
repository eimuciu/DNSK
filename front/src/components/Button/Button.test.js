import Button from './Button';
import { render, screen, fireEvent } from '@testing-library/react';

test('should render Button', () => {
  render(<Button text="Simple Click" />);
  const btn = screen.getByRole('button');
  expect(btn).toBeTruthy();
});

test('should react to WorkButton click', () => {
  const handleClick = jest.fn();
  render(<Button text="Simple Click" clickHandler={handleClick} />);
  const btn = screen.getByRole('button');
  expect(btn).toBeTruthy();
  fireEvent.click(btn);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
