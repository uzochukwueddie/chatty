// import useDebounce from '@hooks/useDebounce';
// import { renderHook } from '@root/test.utils';

// jest.useFakeTimers();
// jest.spyOn(global, 'setTimeout');
// jest.spyOn(global, 'clearTimeout');

// describe('useDebounce', () => {
//   it('should be defined', () => {
//     expect(useDebounce).toBeDefined();
//   });

//   it('should return debounce value', () => {
//     const { result } = renderHook(() => useDebounce('testing 1'));
//     expect(result.current).toEqual('testing 1');
//   });

//   it('should debounce with default debounce value of 500 ms', () => {
//     renderHook(() => useDebounce('testing 1'));

//     expect(setTimeout).toHaveBeenCalledTimes(1);
//     expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
//   });

//   it('should debounce with given debounce', () => {
//     renderHook(() => useDebounce('testing', 2100));

//     expect(setTimeout).toHaveBeenCalledTimes(1);
//     expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2100);
//   });

//   it('should call clearTimeout on unmount', () => {
//     const { unmount } = renderHook(() => useDebounce('testing'));
//     unmount();

//     expect(clearTimeout).toHaveBeenCalledTimes(1);
//   });
// });
