import { emptyPostsWithImagesMock } from '@mocks/handlers/post';
import { server } from '@mocks/server';
import Photos from '@pages/social/photos/Photos';
import { render, screen } from '@root/test.utils';
import { PostUtils } from '@services/utils/post-utils.service';
import { Utils } from '@services/utils/utils.service';

describe('Photos', () => {
  it('should display empty message', async () => {
    server.use(emptyPostsWithImagesMock);
    render(<Photos />);
    const cardElementItems = screen.queryByTestId('gallery-images');
    const emptyPage = await screen.findByTestId('empty-page');
    expect(cardElementItems).toBeNull();
    expect(emptyPage).toBeInTheDocument();
    expect(emptyPage.textContent).toEqual('There are no photos to display');
  });

  it('should have 1 image', async () => {
    render(<Photos />);
    const cardElementItems = await screen.findAllByTestId('gallery-images');
    expect(cardElementItems.length).toEqual(1);
    expect(cardElementItems[0]).toBeInTheDocument();
  });

  it('should have gallery image if user is not blocked', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(false);
    jest.spyOn(PostUtils, 'checkPrivacy').mockReturnValue(true);
    render(<Photos />);
    const cardElementItems = await screen.findAllByTestId('gallery');
    expect(cardElementItems.length).toEqual(1);
    expect(cardElementItems[0]).toBeInTheDocument();
  });

  it('should have gallery image if image is public', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(false);
    jest.spyOn(PostUtils, 'checkPrivacy').mockReturnValue(true);
    render(<Photos />);
    const cardElementItems = await screen.findAllByTestId('gallery');
    expect(cardElementItems.length).toEqual(1);
    expect(cardElementItems[0]).toBeInTheDocument();
  });

  it('should not have gallery image if image is private', async () => {
    jest.spyOn(Utils, 'checkIfUserIsBlocked').mockReturnValue(false);
    jest.spyOn(PostUtils, 'checkPrivacy').mockReturnValue(false);
    render(<Photos />);
    const galleryImagesElement = await screen.findAllByTestId('gallery-images');
    expect(galleryImagesElement[0].childElementCount).toEqual(0);
  });
});
