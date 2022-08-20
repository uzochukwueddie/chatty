import useSessionStorage from '@hooks/useSessionStorage';
import { renderHook } from '@root/test.utils';

describe('useSessionStorage', () => {
  afterEach(() => {
    window.sessionStorage.clear();
  });

  it('should return empty string', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'get'));
    expect(result.current).toBe('');
  });

  it('should return value', () => {
    window.sessionStorage.setItem('key', JSON.stringify('storage value'));
    const { result } = renderHook(() => useSessionStorage('key', 'get'));
    expect(result.current).toBe('storage value');
  });

  it('should set value and get value', () => {
    const { result: first } = renderHook(() => useSessionStorage('key', 'set'));
    const [setState] = first.current;
    setState('Another storage value');
    const { result: second } = renderHook(() => useSessionStorage('key', 'get'));
    expect(second.current).toBe('Another storage value');
  });

  describe('delete', () => {
    let storageValue;
    beforeEach(() => {
      const { result: first } = renderHook(() => useSessionStorage('key', 'set'));
      const [setState] = first.current;
      setState('Delete value');
      const { result: second } = renderHook(() => useSessionStorage('key', 'get'));
      storageValue = second.current;
    });

    it('should delete value', () => {
      expect(storageValue).toBe('Delete value');

      const { result: third } = renderHook(() => useSessionStorage('key', 'delete'));
      const [deleteValue] = third.current;
      deleteValue();

      const { result: fourth } = renderHook(() => useSessionStorage('key', 'get'));
      expect(fourth.current).toBe('');
    });
  });
});
