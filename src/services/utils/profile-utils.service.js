import { createSearchParams } from 'react-router-dom';

export class ProfileUtils {
  static navigateToProfile(data, navigate) {
    const url = `/app/social/profile/${data?.username}?${createSearchParams({ id: data?._id, uId: data?.uId })}`;
    navigate(url);
  }
}
