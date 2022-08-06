import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Content {
  content: string;
  param?: any;
}

// 대시보드 이동용
export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    content: 'mainContent',
    param: undefined,
  },
  reducers: {
    setContent: (state, action: PayloadAction<Content>) => {
      state.content = action.payload.content;
    },
    setParam: (state, action: PayloadAction<any>) => {
      state.param = action.payload.param;
    },
  },
});

export const { setContent, setParam } = contentSlice.actions;

export default contentSlice.reducer;

export const selectContent = (state) => state.content.value;
