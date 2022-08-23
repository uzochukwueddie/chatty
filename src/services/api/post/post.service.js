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

  async getReactionsByUsername(username) {
    const response = await axios.get(`/post/reactions/username/${username}`);
    return response;
  }

  async getPostReactions(postId) {
    const response = await axios.get(`/post/reactions/${postId}`);
    return response;
  }

  async getSinglePostReactionByUsername(postId, username) {
    const response = await axios.get(`/post/single/reaction/username/${username}/${postId}`);
    return response;
  }

  async addReaction(body) {
    const response = await axios.post('/post/reaction', body);
    return response;
  }

  async removeReaction(postId, previousReaction, postReactions) {
    const response = await axios.delete(
      `/post/reaction/${postId}/${previousReaction}/${JSON.stringify(postReactions)}`
    );
    return response;
  }
}

export const postService = new PostService();
