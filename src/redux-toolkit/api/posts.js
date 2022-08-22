import { createAsyncThunk } from '@reduxjs/toolkit';
import { postService } from '@services/api/post/post.service';
import { Utils } from '@services/utils/utils.service';

const getPosts = createAsyncThunk('post/getPosts', async (name, { dispatch }) => {
  try {
    const response = await postService.getAllPosts(1);
    return response.data;
  } catch (error) {
    Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
  }
});

export { getPosts };
