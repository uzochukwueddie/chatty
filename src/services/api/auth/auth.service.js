import axios from '../../axios';

class AuthService {
  async signUp(body) {
    const response = await axios.post('/signup', body);
    return response;
  }

  async signIn(body) {
    const response = await axios.post('/signin', body);
    return response;
  }

  async forgotPassword(email) {
    const response = await axios.post('/forgot-password', { email });
    return response;
  }

  async resetPassword(token, body) {
    const response = await axios.post(`/reset-password/${token}`, body);
    return response;
  }
}

export const authService = new AuthService();
