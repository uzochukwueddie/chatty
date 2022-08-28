import axios from '@services/axios';

class UserService {
  async getUserSuggestions() {
    const response = await axios.get('/user/profile/user/suggestions');
    return response;
  }

  async logoutUser() {
    const response = await axios.get('/signout');
    return response;
  }

  async checkCurrentUser() {
    const response = await axios.get('/currentuser');
    return response;
  }

  async getAllUsers(page) {
    const response = await axios.get(`/user/all/${page}`);
    return response;
  }

  async searchUsers(query) {
    const response = await axios.get(`/user/profile/search/${query}`);
    return response;
  }

  async getUserProfileByUserId(userId) {
    const response = await axios.get(`/user/profile/${userId}`);
    return response;
  }

  async getUserProfileByUsername(username, userId, uId) {
    const response = await axios.get(`/user/profile/posts/${username}/${userId}/${uId}`);
    return response;
  }

  async changePassword(body) {
    const response = await axios.put('/user/profile/change-password', body);
    return response;
  }

  async updateNotificationSettings(settings) {
    const response = await axios.put('/user/profile/settings', settings);
    return response;
  }

  async updateBasicInfo(info) {
    const response = await axios.put('/user/profile/basic-info', info);
    return response;
  }

  async updateSocialLinks(info) {
    const response = await axios.put('/user/profile/social-links', info);
    return response;
  }
}

export const userService = new UserService();
