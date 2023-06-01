import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface HeaderState {
  title: string;
  showBackButton: boolean;
}

const initialState: HeaderState = {
  title: '',
  showBackButton: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeader(state, action: PayloadAction<HeaderState>) {
      state.title = action.payload.title;
      state.showBackButton = action.payload.showBackButton;
    },
  },
});

export const {setHeader} = headerSlice.actions;
export default headerSlice.reducer;