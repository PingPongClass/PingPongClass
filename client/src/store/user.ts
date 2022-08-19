import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  tap: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    tap: 'test',
  },
  reducers: {
    setTap: (state, action: PayloadAction<User>) => {
      state.tap = action.payload.tap;
    },
  },
});

export const { setTap } = userSlice.actions;

export default userSlice.reducer;
