import ReactionsAndCommentsDisplay from '@components/posts/reactions/reactions-and-comments-display/ReactionsAndCommentsDisplay';
import { postMockData } from '@mocks/data/post.mock';
import { fireEvent, render, screen, waitFor } from '@root/test.utils';
import { act } from 'react-dom/test-utils';

describe('ReactionsAndCommentsDisplay', () => {
  it('should display reactions count', () => {
    render(<ReactionsAndCommentsDisplay post={postMockData} />);
    const reactionsCount = screen.queryByTestId('reactions-count');
    expect(parseInt(reactionsCount.childNodes.item(0).textContent, 10)).toEqual(3);
  });

  it('should display reactions count tooltip', async () => {
    render(<ReactionsAndCommentsDisplay post={postMockData} />);
    const reactionsCount = screen.queryByTestId('reactions-count');
    await act(() => {
      fireEvent.mouseOver(reactionsCount);
    });
    await waitFor(() => {
      const reactionsCountTooltip = screen.queryByTestId('tooltip-container');
      expect(reactionsCountTooltip).toBeInTheDocument();
    });
  });

  it('should display reaction tooltip', async () => {
    render(<ReactionsAndCommentsDisplay post={postMockData} />);
    const reaction = screen.queryAllByTestId('reaction-img');
    await act(() => {
      fireEvent.mouseOver(reaction[1]);
    });
    await waitFor(() => {
      const reactionsTooltip = screen.queryAllByTestId('reaction-tooltip');
      expect(reactionsTooltip[0]).toBeInTheDocument();
    });
  });

  it('should display comments count', () => {
    render(<ReactionsAndCommentsDisplay post={postMockData} />);
    const commentsCount = screen.queryByTestId('comment-count');
    expect(commentsCount.textContent).toEqual('3 Comments');
  });

  it('should display comments count tooltip', async () => {
    render(<ReactionsAndCommentsDisplay post={postMockData} />);
    const commentsCount = screen.queryByTestId('comment-count');
    await act(() => {
      fireEvent.mouseOver(commentsCount);
    });
    const commentsTooltip = await screen.findByTestId('comment-tooltip');
    expect(commentsTooltip).toBeInTheDocument();
  });
});
