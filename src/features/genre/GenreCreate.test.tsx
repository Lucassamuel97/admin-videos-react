import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { GenreCreate } from "./GenreCreate";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../mocks/categoryMock";

const handlers = [
  http.get(`${baseUrl}/categories`, async ({ params }) => {
    return HttpResponse.json({ categoryResponse });
  }),
  http.post(`${baseUrl}/genres`, async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return HttpResponse.json(
      { message: "Teste" },
      { status: 201 }
    );
  }
  ),
];

const server = setupServer(...handlers);

describe("GenreCreate", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreCreate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<GenreCreate />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    await waitFor(() => {
      expect(submit).toBeInTheDocument();
    });

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre created");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle error", async () => {
    server.use(
      http.post(`${baseUrl}/genres`, async () => {
        return HttpResponse.json(
          { error: "Algo deu errado!" },  // Corpo da resposta
          { status: 500 }  // Status HTTP 500
        );
      })
    );

    renderWithProviders(<GenreCreate />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    await waitFor(() => {
      expect(submit).toBeInTheDocument();
    });

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre not created");
      expect(text).toBeInTheDocument();
    });
  });
});