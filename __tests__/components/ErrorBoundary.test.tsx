import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { AppErrorBoundary } from '../../src/components/layout/ErrorBoundary';

function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test render error');
  return <Text>All good</Text>;
}

describe('AppErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    const { getByText } = render(
      <AppErrorBoundary>
        <ThrowError shouldThrow={false} />
      </AppErrorBoundary>,
    );
    expect(getByText('All good')).toBeTruthy();
  });

  it('renders fallback UI when a child throws', () => {
    const { getByTestId, getByText } = render(
      <AppErrorBoundary>
        <ThrowError shouldThrow />
      </AppErrorBoundary>,
    );
    expect(getByTestId('error-boundary-fallback')).toBeTruthy();
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Test render error')).toBeTruthy();
  });

  it('calls onReset when "Try Again" is pressed', () => {
    const onReset = jest.fn();
    const { getByText } = render(
      <AppErrorBoundary onReset={onReset}>
        <ThrowError shouldThrow />
      </AppErrorBoundary>,
    );
    fireEvent.press(getByText('Try Again'));
    expect(onReset).toHaveBeenCalled();
  });
});
