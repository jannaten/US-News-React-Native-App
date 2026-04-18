import { getRelativeTime, formatDate, formatDateTime } from '../../src/utils/date';

describe('getRelativeTime', () => {
  const now = Date.now();

  it('returns "Just now" for timestamps under 1 minute old', () => {
    const recent = new Date(now - 30 * 1000).toISOString();
    expect(getRelativeTime(recent)).toBe('Just now');
  });

  it('returns minutes ago for timestamps under 1 hour', () => {
    const twoMinsAgo = new Date(now - 2 * 60 * 1000).toISOString();
    expect(getRelativeTime(twoMinsAgo)).toBe('2m ago');
  });

  it('returns hours ago for timestamps under 1 day', () => {
    const threeHoursAgo = new Date(now - 3 * 60 * 60 * 1000).toISOString();
    expect(getRelativeTime(threeHoursAgo)).toBe('3h ago');
  });

  it('returns days ago for timestamps under 7 days', () => {
    const twoDaysAgo = new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(getRelativeTime(twoDaysAgo)).toBe('2d ago');
  });

  it('returns formatted date for timestamps older than 7 days', () => {
    const oldDate = new Date('2024-01-01T00:00:00.000Z').toISOString();
    const result = getRelativeTime(oldDate);
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/2024/);
  });

  it('returns "Unknown date" for invalid input', () => {
    expect(getRelativeTime('not-a-date')).toBe('Unknown date');
  });
});

describe('formatDate', () => {
  it('formats a valid ISO date string', () => {
    const date = '2024-03-15T12:00:00.000Z';
    const result = formatDate(date);
    expect(result).toMatch(/Mar/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/2024/);
  });

  it('returns "Unknown date" for invalid input', () => {
    expect(formatDate('invalid')).toBe('Unknown date');
  });
});

describe('formatDateTime', () => {
  it('returns a string with both date and time parts', () => {
    const date = '2024-06-01T14:30:00.000Z';
    const result = formatDateTime(date);
    expect(result).toContain('·');
    expect(result).toMatch(/Jun/);
    expect(result).toMatch(/2024/);
  });

  it('returns "Unknown date" for invalid input', () => {
    expect(formatDateTime('')).toBe('Unknown date');
  });
});
