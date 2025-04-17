import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { renderWithProviders, screen, waitFor, fireEvent} from "../../utils/test-utils";
import { CategoryList } from "./ListCategory";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse , categoryResponsePage2} from "../mocks";

export const handlers = [
  http.get(`${baseUrl}/categories`, async (request) => {
    const page = new URL(request.request.url).searchParams.get("page");
    if (page === "2") {
      return HttpResponse.json(categoryResponsePage2);
    }
    await new Promise(resolve => setTimeout(resolve, 200));
    return HttpResponse.json(categoryResponse);
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

  it("should render success state", async () => {
    renderWithProviders(<CategoryList />);
    // esperar que o elemento seja renderizado
    await waitFor(() => {
      const name = screen.getByText(categoryResponse.data[0].name);
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      http.get(`${baseUrl}/categories`, async () => {
        return HttpResponse.json(
          { error: "Algo deu errado!" },  // Corpo da resposta
          { status: 500 }  // Status HTTP 500
        );
      })  
    );

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const error = screen.getByText("Error fetching categories");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle On PageChange", async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("PaleTurquoise");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText("SeaGreen");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<CategoryList />);
    // esperar que o elemento seja renderizado
    await waitFor(() => {
      const name = screen.getByText("PaleTurquoise");
      expect(name).toBeInTheDocument();
    });
    // pegar o input com o placeholder "Search..."
    const input = screen.getByPlaceholderText("Search…");

    // Fire event on change
    fireEvent.change(input, { target: { value: "PapayaWhip" } });

    await waitFor(() => {
      screen.debug(); // Mostra o DOM no terminal
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
      expect(input).toHaveValue("PapayaWhip");
    });
  });

});