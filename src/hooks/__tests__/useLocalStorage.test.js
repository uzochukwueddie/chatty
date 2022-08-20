import useLocalStorage from '@hooks/useLocalStorage';
import { renderHook } from '@root/test.utils';

describe('useLocalStorage', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('should return empty string', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'get'));
    expect(result.current).toBe('');
  });

  it('should return value', () => {
    window.localStorage.setItem('key', JSON.stringify('storage value'));
    const { result } = renderHook(() => useLocalStorage('key', 'get'));
    expect(result.current).toBe('storage value');
  });

  it('should set value and get value', () => {
    const { result: first } = renderHook(() => useLocalStorage('key', 'set'));
    const [setState] = first.current;
    setState('Another storage value');
    const { result: second } = renderHook(() => useLocalStorage('key', 'get'));
    expect(second.current).toBe('Another storage value');
  });

  describe('delete', () => {
    let storageValue;
    beforeEach(() => {
      const { result: first } = renderHook(() => useLocalStorage('key', 'set'));
      const [setState] = first.current;
      setState('Delete value');
      const { result: second } = renderHook(() => useLocalStorage('key', 'get'));
      storageValue = second.current;
    });

    it('should delete value', () => {
      expect(storageValue).toBe('Delete value');

      const { result: third } = renderHook(() => useLocalStorage('key', 'delete'));
      const [deleteValue] = third.current;
      deleteValue();

      const { result: fourth } = renderHook(() => useLocalStorage('key', 'get'));
      expect(fourth.current).toBe('');
    });
  });
});
