import SearchList from '@components/chat/list/search-list/SearchList';
import { existingUserTwo } from '@mocks/data/user.mock';
import { render, screen } from '@root/test.utils';

describe('SearchList', () => {
  let props;
  beforeEach(() => {
    props = {
      searchTerm: '',
      result: [],
      isSearching: false,
      setSearchResult: null,
      setIsSearching: null,
      setSearch: null,
      setSelectedUser: null,
      setComponentType: null
    };
  });

  it('should display nothing found text', async () => {
    props.searchTerm = 'qqqqqq';
    render(<SearchList {...props} />);
    const nothingFoundElement = await screen.findByTestId('nothing-found');
    expect(nothingFoundElement).toBeInTheDocument();
    expect(nothingFoundElement.childNodes.item(0).textContent).toEqual('Nothing found');
    expect(nothingFoundElement.childNodes.item(1).textContent).toEqual("We couldn't find any match for qqqqqq");
  });

  it('should display searching text', async () => {
    props.isSearching = true;
    props.searchTerm = 'testing';
    props.result = [];
    render(<SearchList {...props} />);
    const searchingTextElement = await screen.findByTestId('searching-text');
    expect(searchingTextElement).toBeInTheDocument();
    expect(searchingTextElement.childNodes.item(0).textContent).toEqual('Searching...');
  });

  it('should have search result item', async () => {
    props.result = [existingUserTwo];
    render(<SearchList {...props} />);
    const searchResultElement = await screen.findByTestId('search-result-item');
    expect(searchResultElement).toBeInTheDocument();
    expect(searchResultElement.childNodes.item(0)).toHaveAttribute('src', 'http://place-hold.it/500x500');
    expect(searchResultElement.childNodes.item(1).textContent).toEqual('Danny');
  });
});
