import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Content {
  content: string;
}

// 대시보드 이동용
export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    content: 'mainContent',
  },
  reducers: {
    setContent: (state, action: PayloadAction<Content>) => {
      state.content = action.payload.content;
    },
  },
});

export const { setContent } = contentSlice.actions;

export default contentSlice.reducer;

export const selectContent = (state) => state.content.value;
