import GiphyContainer from '@components/chat/giphy-container/GiphyContainer';
import { emptySearchGiphyMock, getTrendingGiphyMock, searchGiphyMock } from '@mocks/handlers/giphy';
import { server } from '@mocks/server';
import { fireEvent, render, screen, waitFor, within } from '@root/test.utils';
import { act } from 'react-dom/test-utils';

const url =
  'https://media1.giphy.com/media/qg5pk8s2h5kJy/giphy.gif?cid=b6f691b6xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn4&rid=giphy.gif&ct=g';

describe('GiphyContainer', () => {
  server.use(getTrendingGiphyMock);
  it('should display trending gifs', async () => {
    render(<GiphyContainer />);
    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const listItemElements = await screen.findAllByTestId('list-item');
    expect(listItemElements.length).toEqual(1);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', url);
    await waitFor(() => expect(getAllByRole('listitem').length).toBeGreaterThan(0));
  });

  it('should call search input', async () => {
    server.use(searchGiphyMock);
    render(<GiphyContainer />);
    const inputElement = screen.getByPlaceholderText('Search Gif');
    await act(() => {
      fireEvent.change(inputElement, { target: { value: 'dog' } });
    });
    const listItemElements = await screen.findAllByTestId('list-item');
    expect(listItemElements.length).toEqual(1);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', url);
  });

  it('should return empty search result', async () => {
    server.use(emptySearchGiphyMock);
    render(<GiphyContainer />);
    const inputElement = screen.getByPlaceholderText('Search Gif');
    await act(() => {
      fireEvent.change(inputElement, { target: { value: '.....' } });
    });
    await waitFor(() => {
      const listItemElements = screen.queryAllByTestId('list-item');
      expect(listItemElements.length).toEqual(0);
    });
  });
});
