import {PropsWithChildren, ReactElement} from 'react';
import {render} from '@testing-library/react';
import type {RenderOptions} from '@testing-library/react';
import type {PreloadedState} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import {setupStore} from 'state/store';
import type {AppStore, RootState} from 'state/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  element: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({children}: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return {store, ...render(element, {wrapper: Wrapper, ...renderOptions})};
}
