import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reactions: []
};

const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {
    addReactions: (state, action) => {
      state.reactions = action.payload;
    }
  }
});

export const { addReactions } = reactionsSlice.actions;
export default reactionsSlice.reducer;
