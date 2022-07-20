import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    tap: 'test',
  },
  reducers: {
    setTap: (state, action) => {
      state.tap = action.payload;
    },
  },
});

export const { setTap } = userSlice.actions;

export default userSlice.reducer;
