import ReactionList from '@components/posts/reactions/reactions-modal/reaction-list/ReactionList';
import { postMockData } from '@mocks/data/post.mock';
import { render, screen } from '@root/test.utils';
import { Utils } from '@services/utils/utils.service';

describe('ReactionsModal', () => {
  it('should have empty list items', () => {
    render(<ReactionList postReactions={[]} />);
    const wrapper = screen.queryByTestId('modal-reactions-container');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.childNodes.length).toEqual(0);
  });

  it('should have list items', () => {
    render(<ReactionList postReactions={Utils.formattedReactions(postMockData.reactions)} />);
    const reactionList = screen.queryAllByTestId('reaction-list');
    const imageElements = screen.queryAllByRole('img');
    expect(reactionList.length).toEqual(2);
    expect(imageElements[0]).toHaveAttribute('src', 'like.png');
    expect(imageElements[1]).toHaveAttribute('src', 'love.png');
  });
});
