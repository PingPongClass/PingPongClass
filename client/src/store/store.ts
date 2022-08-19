import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '@store/user';
import contentReducer from '@store/content';
import memberReducer from '@store/member';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  content: contentReducer,
  member: memberReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 직렬화 여부 체크를 없앤다 : store에 function이나 promise를 넣는건 권장하지 않지만..
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
