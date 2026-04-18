import { logger } from '../../src/utils/logger';

describe('logger', () => {
  const consoleSpy = {
    log: jest.spyOn(console, 'log').mockImplementation(() => undefined),
    warn: jest.spyOn(console, 'warn').mockImplementation(() => undefined),
    error: jest.spyOn(console, 'error').mockImplementation(() => undefined),
  };

  afterEach(() => jest.clearAllMocks());

  it('logs info messages', () => {
    logger.info('test info message');
    expect(consoleSpy.log).toHaveBeenCalledTimes(1);
    expect(consoleSpy.log.mock.calls[0][0]).toContain('INFO');
    expect(consoleSpy.log.mock.calls[0][0]).toContain('test info message');
  });

  it('logs warn messages to console.warn', () => {
    logger.warn('test warning');
    expect(consoleSpy.warn).toHaveBeenCalledTimes(1);
    expect(consoleSpy.warn.mock.calls[0][0]).toContain('WARN');
  });

  it('logs error messages to console.error', () => {
    logger.error('test error');
    expect(consoleSpy.error).toHaveBeenCalledTimes(1);
    expect(consoleSpy.error.mock.calls[0][0]).toContain('ERROR');
  });

  it('includes context in log output', () => {
    const context = { userId: '123', action: 'login' };
    logger.info('with context', context);
    expect(consoleSpy.log).toHaveBeenCalledWith(
      expect.stringContaining('INFO'),
      context,
    );
  });

  it('includes timestamp in every log entry', () => {
    logger.info('timestamp test');
    const call = consoleSpy.log.mock.calls[0][0] as string;
    // Timestamp format: [2024-01-01T00:00:00.000Z]
    expect(call).toMatch(/\[\d{4}-\d{2}-\d{2}T/);
  });
});
