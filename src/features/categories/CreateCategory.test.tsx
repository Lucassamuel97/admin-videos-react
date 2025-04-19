import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { renderWithProviders, screen, waitFor, fireEvent } from "../../utils/test-utils";
import { CategoryCreate } from "./CreateCategory";
import { baseUrl } from "../api/apiSlice";

export const handlers = [
  http.post(`${baseUrl}/categories`, async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return HttpResponse.json(
      { message: "Teste" },
      { status: 201 }
    );
  }
  ),
];

const server = setupServer(...handlers);

describe("CreateCategory", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryCreate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CategoryCreate />);
    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.change(description, { target: { value: "test desc" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category created successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle error", async () => {
    server.use(
      http.post(`${baseUrl}/categories`, async () => {
        return HttpResponse.json(
          { error: "Algo deu errado!" },  // Corpo da resposta
          { status: 500 }  // Status HTTP 500
        );
      })
    );

    renderWithProviders(<CategoryCreate />);
    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.change(description, { target: { value: "test desc" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category not created");
      expect(text).toBeInTheDocument();
    });
  });

});