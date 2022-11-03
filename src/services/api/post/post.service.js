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

  async createPostWithVideo(body) {
    const response = await axios.post('/post/video/post', body);
    return response;
  }

  async updatePostWithImage(postId, body) {
    const response = await axios.put(`/post/image/${postId}`, body);
    return response;
  }

  async updatePostWithVideo(postId, body) {
    const response = await axios.put(`/post/video/${postId}`, body);
    return response;
  }

  async updatePost(postId, body) {
    const response = await axios.put(`/post/${postId}`, body);
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

  async getPostCommentsNames(postId) {
    const response = await axios.get(`/post/commentsnames/${postId}`);
    return response;
  }

  async getPostComments(postId) {
    const response = await axios.get(`/post/comments/${postId}`);
    return response;
  }

  async getPostsWithImages(page) {
    const response = await axios.get(`/post/images/${page}`);
    return response;
  }

  async getPostsWithVideos(page) {
    const response = await axios.get(`/post/videos/${page}`);
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

  async addComment(body) {
    const response = await axios.post('/post/comment', body);
    return response;
  }

  async deletePost(postId) {
    const response = await axios.delete(`/post/${postId}`);
    return response;
  }
}

export const postService = new PostService();
