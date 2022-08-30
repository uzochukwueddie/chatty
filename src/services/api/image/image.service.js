import axios from '@services/axios';

class ImageService {
  async getUserImages(userId) {
    const response = await axios.get(`/images/${userId}`);
    return response;
  }

  async addImage(url, data) {
    const response = await axios.post(url, { image: data });
    return response;
  }

  async removeImage(url) {
    const response = await axios.delete(url);
    return response;
  }
}

export const imageService = new ImageService();
