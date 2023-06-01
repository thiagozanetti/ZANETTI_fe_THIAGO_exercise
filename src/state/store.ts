import {configureStore} from '@reduxjs/toolkit';
import globalReducer from './slices/global';
import headerReducer from './slices/header';
import apiSlice from './slices/team';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    header: headerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
