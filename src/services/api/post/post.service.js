import axios from '@services/axios';

class PostService {
  async getAllPosts(page) {
    const response = await axios.get(`/post/all/${page}`);
    return response;
  }

  async createPost(body) {
    const response = await axios.post('/post', body);
    return response;
  }

  async createPostWithImage(body) {
    const response = await axios.post('/post/image/post', body);
    return response;
  }
}

export const postService = new PostService();
