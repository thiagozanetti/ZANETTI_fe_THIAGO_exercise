import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GlobalState {
  isLoading: boolean;
}

const initialState: GlobalState = {
  isLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {setIsLoading} = globalSlice.actions;
export default globalSlice.reducer;