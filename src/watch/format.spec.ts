import { formatElapsedTime } from './format';

describe('timestamp formatting function', () => {
  it('formats seconds', () => {
    expect(formatElapsedTime(1000)).toEqual('00:01.000');
    expect(formatElapsedTime(2000)).toEqual('00:02.000');
  });

  it('formats minutes', () => {
    expect(formatElapsedTime(60000)).toEqual('01:00.000');
  });

  it('formats hours', () => {
    expect(formatElapsedTime(60000 * 60)).toEqual('1:00:00.000');
  });

  it('formats partial seconds', () => {
    expect(formatElapsedTime(1500)).toEqual('00:01.500');
  });
});
