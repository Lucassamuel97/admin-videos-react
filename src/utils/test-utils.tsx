import { ReactElement, PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
// Removed PreloadedState as it is not exported from @reduxjs/toolkit

import { AppStore, RootState, makeStore } from "../app/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = makeStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          {children}
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from "@testing-library/react";
