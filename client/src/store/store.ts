import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@store/user';
import contentReducer from '@store/content';
import memberReducer from '@store/member';

const store = configureStore({
  reducer: {
    user: userReducer,
    content: contentReducer,
    member: memberReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
