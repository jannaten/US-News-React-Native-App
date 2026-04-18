import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NewsCard } from '../../src/components/news/NewsCard';
import { mockArticle, mockArticle2 } from '../mocks/handlers';

describe('NewsCard', () => {
  it('renders article title', () => {
    const { getByText } = render(
      <NewsCard article={mockArticle} onPress={jest.fn()} />,
    );
    expect(getByText(mockArticle.title)).toBeTruthy();
  });

  it('renders source name', () => {
    const { getByText } = render(
      <NewsCard article={mockArticle} onPress={jest.fn()} />,
    );
    expect(getByText(mockArticle.source.name)).toBeTruthy();
  });

  it('renders description when present', () => {
    const { getByText } = render(
      <NewsCard article={mockArticle} onPress={jest.fn()} />,
    );
    expect(getByText(mockArticle.description!)).toBeTruthy();
  });

  it('does not render description when absent', () => {
    const { queryByText } = render(
      <NewsCard article={mockArticle2} onPress={jest.fn()} />,
    );
    expect(queryByText(mockArticle.description!)).toBeNull();
  });

  it('calls onPress with the article when tapped', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <NewsCard article={mockArticle} onPress={onPress} testID="card-test" />,
    );
    fireEvent.press(getByTestId('card-test'));
    expect(onPress).toHaveBeenCalledWith(mockArticle);
  });

  it('shows filled bookmark icon when isBookmarked is true', () => {
    const { getByText } = render(
      <NewsCard
        article={mockArticle}
        onPress={jest.fn()}
        onBookmarkPress={jest.fn()}
        isBookmarked
      />,
    );
    expect(getByText('★')).toBeTruthy();
  });

  it('shows empty bookmark icon when isBookmarked is false', () => {
    const { getByText } = render(
      <NewsCard
        article={mockArticle}
        onPress={jest.fn()}
        onBookmarkPress={jest.fn()}
        isBookmarked={false}
      />,
    );
    expect(getByText('☆')).toBeTruthy();
  });

  it('calls onBookmarkPress when bookmark button is tapped', () => {
    const onBookmarkPress = jest.fn();
    const { getByTestId } = render(
      <NewsCard
        article={mockArticle}
        onPress={jest.fn()}
        onBookmarkPress={onBookmarkPress}
      />,
    );
    fireEvent.press(getByTestId(`bookmark-btn-${mockArticle.url}`));
    expect(onBookmarkPress).toHaveBeenCalledWith(mockArticle);
  });

  it('renders category badge when categoryLabel is provided', () => {
    const { getByText } = render(
      <NewsCard article={mockArticle} onPress={jest.fn()} categoryLabel="TECH" />,
    );
    expect(getByText('TECH')).toBeTruthy();
  });
});
