import { expect, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { BrowserRouter } from "react-router";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <BrowserRouter>
        <Provider store={store}>{children} </Provider>
      </BrowserRouter>
    ),
    ...options,
  });
}

export { default as userEvent } from "@testing-library/user-event";

export { customRender as pageRender };
