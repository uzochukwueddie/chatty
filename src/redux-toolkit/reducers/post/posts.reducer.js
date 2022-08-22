import { getPosts } from '@redux/api/posts';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  totalPostsCount: 0,
  isLoading: false
};

const postsSlice = createSlice({
  name: 'allPosts',
  initialState,
  reducers: {
    addToPosts: (state, action) => {
      state.posts = [...action.payload];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      const { posts, totalPosts } = action.payload;
      state.posts = [...posts];
      state.totalPostsCount = totalPosts;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { addToPosts } = postsSlice.actions;
export default postsSlice.reducer;
