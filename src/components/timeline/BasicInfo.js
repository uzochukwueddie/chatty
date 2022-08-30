import BasicInfoSkeleton from '@components/timeline/BasicInfoSkeleton';
import InfoDisplay from '@components/timeline/InfoDisplay';
import { userService } from '@services/api/user/user.service';
import { Utils } from '@services/utils/utils.service';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const BasicInfo = ({ editableInputs, username, profile, loading, setEditableInputs }) => {
  const dispatch = useDispatch();
  const noBasicInfo = {
    quoteMsg: 'No information',
    workMsg: 'No information',
    schoolMsg: 'No information',
    locationMsg: 'No information'
  };
  const noSocialInfo = {
    instagramMsg: '',
    twitterMsg: '',
    facebookMsg: '',
    youtubeMsg: ''
  };
  const editableSocialInputs = {
    instagram: '',
    twitter: '',
    facebook: '',
    youtube: ''
  };
  const basicInfoPlaceholder = {
    quotePlacehoder: 'Add your quote',
    workPlacehoder: 'Add company name',
    schoolPlacehoder: 'Add school name',
    locationPlacehoder: 'Add city and country names'
  };
  const socialLinksPlaceholder = {
    instagramPlacehoder: '',
    twitterPlacehoder: '',
    facebookPlacehoder: '',
    youtubePlacehoder: ''
  };

  const updateBasicInfo = async () => {
    try {
      const response = await userService.updateBasicInfo(editableInputs);
      Utils.dispatchNotification(response.data.message, 'success', dispatch);
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  return (
    <>
      {loading ? (
        <BasicInfoSkeleton />
      ) : (
        <InfoDisplay
          title="Basic Info"
          type="basic"
          isCurrentUser={username === profile?.username}
          noBasicInfo={noBasicInfo}
          noSocialInfo={noSocialInfo}
          basicInfoPlaceholder={basicInfoPlaceholder}
          socialLinksPlaceholder={socialLinksPlaceholder}
          editableInputs={editableInputs}
          editableSocialInputs={editableSocialInputs}
          loading={loading}
          setEditableInputs={setEditableInputs}
          updateInfo={updateBasicInfo}
        />
      )}
    </>
  );
};

BasicInfo.propTypes = {
  username: PropTypes.string,
  profile: PropTypes.object,
  loading: PropTypes.bool,
  editableInputs: PropTypes.object,
  setEditableInputs: PropTypes.func
};

export default BasicInfo;
