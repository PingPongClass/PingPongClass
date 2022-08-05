import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import contentReducer from './content';

const store = configureStore({
  reducer: {
    user: userReducer,
    content: contentReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
