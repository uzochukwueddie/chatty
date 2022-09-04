import InfoDisplay from '@components/timeline/InfoDisplay';
import { render, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';

describe('InfoDisplay', () => {
  let props;
  beforeEach(() => {
    props = {
      title: 'Intro',
      loading: true,
      type: 'basic',
      setEditableInputs: null,
      isCurrentUser: true,
      noBasicInfo: {
        quoteMsg: 'No information',
        workMsg: 'No information',
        schoolMsg: 'No information',
        locationMsg: 'No information'
      },
      editableInputs: {
        quote: '',
        work: '',
        school: '',
        location: ''
      },
      noSocialInfo: {
        instagramMsg: 'No link available ',
        twitterMsg: 'No link available ',
        facebookMsg: 'No link available ',
        youtubeMsg: 'No link available '
      },
      basicInfoPlaceholder: {
        quotePlacehoder: 'Add your quote',
        workPlacehoder: 'Add company name',
        schoolPlacehoder: 'Add school name',
        locationPlacehoder: 'Add city and country names'
      },
      socialLinksPlaceholder: {
        instagramPlacehoder: 'Add your Instagram account link',
        twitterPlacehoder: 'Add your Twitter account link',
        facebookPlacehoder: 'Add your Facebook account link',
        youtubePlacehoder: 'Add your YouTube account link'
      },
      editableSocialInputs: {
        instagram: '',
        twitter: '',
        facebook: '',
        youtube: ''
      },
      setEditableSocialInputs: null,
      updateInfo: null
    };
  });
  it('should display skeleton', () => {
    render(<InfoDisplay {...props} />);
    const basicInfo = screen.queryByTestId('basic-info');
    expect(basicInfo).toBeInTheDocument();
  });

  it('should display no information', () => {
    props.loading = false;
    render(<InfoDisplay {...props} />);
    const quote = screen.queryByTestId('quote');
    const work = screen.queryByTestId('content-1');
    const school = screen.queryByTestId('content-2');
    const location = screen.queryByTestId('content-3');
    expect(quote.textContent).toEqual('No information');
    expect(work.textContent).toEqual('No information');
    expect(school.textContent).toEqual('No information');
    expect(location.textContent).toEqual('No information');
  });

  it('should display edit button', () => {
    props.loading = false;
    render(<InfoDisplay {...props} />);
    const editButton = screen.queryByTestId('editBtn');
    expect(editButton).toBeInTheDocument();
  });

  it('should display basic info', () => {
    props.loading = false;
    props.editableInputs = {
      quote: 'This is my quote',
      work: 'KickChat Inc.',
      school: 'Taltech',
      location: 'Tallinn, Estonia'
    };
    render(<InfoDisplay {...props} />);
    const quote = screen.queryByTestId('quote');
    const work = screen.queryByTestId('content-1');
    const school = screen.queryByTestId('content-2');
    const location = screen.queryByTestId('content-3');
    expect(quote.textContent).toEqual('This is my quote');
    expect(work.textContent).toEqual('Works at KickChat Inc.');
    expect(school.textContent).toEqual('Went to Taltech');
    expect(location.textContent).toEqual('Lives in Tallinn, Estonia');
  });

  it('should display social links', () => {
    props.title = 'Social Links';
    props.type = 'social';
    props.loading = false;
    props.editableSocialInputs = {
      instagram: 'https://www.instagram.com/devonrodriguezart',
      twitter: 'https://twitter.com/FCBayern',
      facebook: 'https://www.facebook.com/mandy',
      youtube: 'https://www.youtube.com/watch?v=1_2uhaug3BQ'
    };
    render(<InfoDisplay {...props} />);
    const instagram = screen.queryByTestId('content-1');
    const twitter = screen.queryByTestId('content-2');
    const facebook = screen.queryByTestId('content-3');
    const youtube = screen.queryByTestId('content-4');
    expect(instagram.textContent).toEqual('https://www.instagram.com/devonrodriguezart');
    expect(twitter.textContent).toEqual('https://twitter.com/FCBayern');
    expect(facebook.textContent).toEqual('https://www.facebook.com/mandy');
    expect(youtube.textContent).toEqual('https://www.youtube.com/watch?v=1_2uhaug3BQ');
  });

  it('should set contenteditable to true', async () => {
    props.loading = false;
    props.editableInputs = {
      quote: 'This is my quote',
      work: 'KickChat Inc.',
      school: 'Taltech',
      location: 'Tallinn, Estonia'
    };
    render(<InfoDisplay {...props} />);
    const editButton = screen.queryByTestId('editBtn');
    userEvent.click(editButton);
    const quoteElement = screen.queryByTestId('quote-editable');
    const workElement = screen.queryByTestId('content-1-editable');
    const schoolElement = screen.queryByTestId('content-2-editable');
    const locationElement = screen.queryByTestId('content-3-editable');
    expect(quoteElement).toHaveAttribute('contentEditable', 'true');
    expect(workElement).toHaveAttribute('contentEditable', 'true');
    expect(schoolElement).toHaveAttribute('contentEditable', 'true');
    expect(locationElement).toHaveAttribute('contentEditable', 'true');
  });
});
