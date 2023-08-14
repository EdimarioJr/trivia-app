import React, { PropsWithChildren, ReactElement } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { setupStore, RootState, AppStore } from "@/store/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithReduxProvider(
  ui: ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
