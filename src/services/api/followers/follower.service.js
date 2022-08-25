import axios from '@services/axios';

class FollowerService {
  async getUserFollowing() {
    const response = await axios.get('/user/following');
    return response;
  }

  async getUserFollowers(userId) {
    const response = await axios.get(`/user/followers/${userId}`);
    return response;
  }

  async followUser(followerId) {
    const response = await axios.put(`/user/follow/${followerId}`);
    return response;
  }

  async unFollowUser(followeeId, followerId) {
    const response = await axios.put(`/user/unfollow/${followeeId}/${followerId}`);
    return response;
  }

  async blockUser(followerId) {
    const response = await axios.put(`/user/block/${followerId}`);
    return response;
  }

  async unblockUser(followerId) {
    const response = await axios.put(`/user/unblock/${followerId}`);
    return response;
  }
}

export const followerService = new FollowerService();
