import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { renderWithProviders, screen} from "../../utils/test-utils";
import { CategoryList } from "./ListCategory";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../mocks";

export const handlers = [
  http.get("/alguma-coisa", async () => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return HttpResponse.json({ /* ... */ });
  })
];

const server = setupServer(...handlers);

describe("CategoryList", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<CategoryList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

});