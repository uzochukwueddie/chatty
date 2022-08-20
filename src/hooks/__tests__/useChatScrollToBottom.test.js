import useChatScrollToBottom from '@hooks/useChatScrollToBottom';
import { render, renderHook, screen } from '@root/test.utils';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const DemoContainer = forwardRef((props, ref) => (
  <div ref={ref} data-testid="demo-container">
    {props.dataList.map((data, index) => (
      <div key={index}>{data}</div>
    ))}
  </div>
));

DemoContainer.propTypes = {
  dataList: PropTypes.array
};

let dataList = Array(50)
  .fill()
  .map((v, i) => i + 1);

describe('useChatScrollToBottom', () => {
  it('should be defined', () => {
    expect(useChatScrollToBottom).toBeDefined();
  });

  describe('props', () => {
    let hook;

    beforeEach(() => {
      hook = renderHook((value) => useChatScrollToBottom(value), {
        initialProps: []
      });
      hook.rerender(dataList);
    });

    it('should have an element ref', () => {
      const { current } = hook.result.current;
      expect(current).toBeDefined();
    });
  });

  describe('scroll', () => {
    let hook;
    const scrollerNode = document.createElement('div');

    beforeEach(() => {
      hook = renderHook(() => useChatScrollToBottom(dataList));
      render(<DemoContainer dataList={dataList} ref={hook.result.current} />);
      hook.result.current = scrollerNode;
      hook.rerender(dataList);
    });

    it('should have zero scrollTop value', async () => {
      const demoContainer = screen.queryByTestId('demo-container');
      const end = 200;
      const start = 50;
      const dataList2 = Array.from({ length: end - start }, (_, i) => start + 1 + i);
      dataList = [...dataList, ...dataList2];
      hook.rerender(dataList);
      expect(demoContainer.scrollTop).toEqual(0);
    });

    it('should have scrollTop value greater than zero', async () => {
      const demoContainer = screen.queryByTestId('demo-container');
      Object.defineProperty(demoContainer, 'scrollHeight', { configurable: true, value: 150 });
      Object.defineProperty(demoContainer, 'clientHeight', { configurable: true, value: 100 });
      const end = 500;
      const start = 200;
      const dataList2 = Array.from({ length: end - start }, (_, i) => start + 1 + i);
      dataList = [...dataList, ...dataList2];
      hook.rerender(dataList);
      expect(demoContainer.scrollTop).toBeGreaterThan(0);
    });
  });
});
