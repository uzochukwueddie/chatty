import BackgroundHeader from '@components/background-header/BackgroundHeader';
import { existingUser } from '@mocks/data/user.mock';
import { render, screen } from '@root/test.utils';
import { tabItems } from '@services/utils/static.data';
import { Utils } from '@services/utils/utils.service';
import userEvent from '@testing-library/user-event';

describe('BackgroundHeader', () => {
  let props;
  beforeEach(() => {
    props = {
      user: existingUser,
      loading: false,
      url: '',
      onClick: null,
      tab: '',
      hasImage: false,
      tabItems: [],
      hasError: false,
      hideSettings: false,
      selectedFileImage: jest.fn(),
      saveImage: null,
      cancelFileSelection: null,
      removeBackgroundImage: null,
      galleryImages: []
    };
  });

  it('should display skeleton loader', async () => {
    props.loading = true;
    render(<BackgroundHeader {...props} />);
    const skeleton = await screen.findByTestId('profile-banner-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('should display profile banner container', async () => {
    props.loading = false;
    render(<BackgroundHeader {...props} />);
    const profileBanner = await screen.findByTestId('profile-banner');
    expect(profileBanner).toBeInTheDocument();
  });

  it('should display save image container', async () => {
    props.loading = false;
    props.hasImage = true;
    render(<BackgroundHeader {...props} />);
    const saveChangesContainer = await screen.findByTestId('save-changes-container');
    expect(saveChangesContainer).toBeInTheDocument();
  });

  it('should display banner with background color', async () => {
    props.loading = false;
    render(<BackgroundHeader {...props} />);
    const profileBannerImage = screen.queryByTestId('profile-banner-image');
    expect(profileBannerImage).toHaveStyle({ backgroundColor: 'red' });
  });

  it('should display banner with background image', async () => {
    props.loading = false;
    props.url = 'http://placehold.it/500x200';
    render(<BackgroundHeader {...props} />);
    const imgElement = await screen.findAllByRole('img');
    expect(imgElement[0]).toHaveAttribute('src', 'http://placehold.it/500x200');
  });

  it('should display remove button', async () => {
    props.loading = false;
    props.hideSettings = true;
    props.url = 'http://placehold.it/500x200';
    render(<BackgroundHeader {...props} />);
    const deleteButton = screen.queryByTestId('delete-btn');
    expect(deleteButton).toBeInTheDocument();
  });

  it('should display text "Add a background image"', async () => {
    props.loading = false;
    render(<BackgroundHeader {...props} />);
    const bgMessage = screen.getByText(/Add a background image/i);
    expect(bgMessage).toBeInTheDocument();
  });

  it('should display background image select menu', async () => {
    props.loading = false;
    props.hideSettings = true;
    render(<BackgroundHeader {...props} />);
    const addCoverPhoto = await screen.findByTestId('add-cover-photo');
    userEvent.click(addCoverPhoto);
    const navDropdown = await screen.findByTestId('menu');
    expect(navDropdown).toBeInTheDocument();
  });

  it('should display only "Upload" item', async () => {
    props.loading = false;
    props.hideSettings = true;
    render(<BackgroundHeader {...props} />);
    const addCoverPhoto = await screen.findByTestId('add-cover-photo');
    userEvent.click(addCoverPhoto);
    const uploadElement = screen.getByText(/upload/i);
    expect(uploadElement).toBeInTheDocument();
  });

  it('should display "Select" and "Upload" items', async () => {
    props.loading = false;
    props.hideSettings = true;
    props.galleryImages = ['http://placehold.it/500x200'];
    render(<BackgroundHeader {...props} />);
    const addCoverPhoto = await screen.findByTestId('add-cover-photo');
    userEvent.click(addCoverPhoto);
    const selectElement = screen.getByText(/select/i);
    const uploadElement = screen.getByText(/upload/i);
    expect(selectElement).toBeInTheDocument();
    expect(uploadElement).toBeInTheDocument();
  });

  it('should display image grid modal', async () => {
    props.loading = false;
    props.hideSettings = true;
    props.galleryImages = ['http://placehold.it/500x200'];
    render(<BackgroundHeader {...props} />);
    const addCoverPhoto = await screen.findByTestId('add-cover-photo');
    userEvent.click(addCoverPhoto);
    const selectElement = screen.getByText(/select/i);
    userEvent.click(selectElement);
    const modalWrapper = await screen.findByTestId('modal-wrapper');
    const modalTitle = await screen.findByText(/select photo/i);
    expect(modalWrapper).toBeInTheDocument();
    expect(modalTitle).toBeInTheDocument();
  });

  it('should display user avatar', async () => {
    props.loading = false;
    render(<BackgroundHeader {...props} />);
    const profilePic = await screen.findByTestId('profile-pic');
    const imageElement = profilePic.childNodes.item(0);
    expect(profilePic).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'http://place-hold.it/500x500');
  });

  it('should display username', async () => {
    props.loading = false;
    render(<BackgroundHeader {...props} />);
    const usernameElement = screen.getByText(/Manny/i);
    expect(usernameElement).toBeInTheDocument();
  });

  it('should not have any tab element displayed', async () => {
    props.loading = false;
    render(<BackgroundHeader {...props} />);
    const tabElements = screen.queryByTestId('tab-elements');
    expect(tabElements).toBeNull();
  });

  it('should have tab elements displayed', async () => {
    props.loading = false;
    props.tabItems = tabItems(true, true);
    render(<BackgroundHeader {...props} />);
    const tabElements = await screen.findAllByTestId('tab-elements');
    expect(tabElements.length).toEqual(5);
    tabElements.forEach((tab) => {
      expect(tab).toBeInTheDocument();
    });
  });

  it('should have active class on selected tab', async () => {
    props.loading = false;
    props.tab = 'followers';
    props.tabItems = tabItems(true, true);
    const { baseElement } = render(<BackgroundHeader {...props} />);
    const activeTabElement = baseElement.querySelector('.active');
    expect(activeTabElement).toBeInTheDocument();
    expect(activeTabElement.textContent).toEqual(Utils.firstLetterUpperCase(props.tab));
  });
});
