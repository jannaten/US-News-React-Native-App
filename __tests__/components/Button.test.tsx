import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../src/components/common/Button';

describe('Button', () => {
  it('renders with the correct label', () => {
    const { getByText } = render(<Button label="Press Me" onPress={jest.fn()} />);
    expect(getByText('Press Me')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Tap" onPress={onPress} />);
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Disabled" onPress={onPress} disabled />);
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('has correct accessibility role', () => {
    const { getByRole } = render(<Button label="Accessible" onPress={jest.fn()} />);
    expect(getByRole('button')).toBeTruthy();
  });

  it('sets accessibilityState disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button label="Off" onPress={jest.fn()} disabled />);
    expect(getByRole('button')).toHaveProp('accessibilityState', { disabled: true });
  });

  it('renders with testID', () => {
    const { getByTestId } = render(<Button label="ID test" onPress={jest.fn()} testID="my-btn" />);
    expect(getByTestId('my-btn')).toBeTruthy();
  });
});
