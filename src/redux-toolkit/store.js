import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@redux/reducers/user/user.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});
