import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { GenreEdit } from "./GenreEdit";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../mocks/categoryMock";

const data = {
  id: "1",
  name: "test",
  is_active: true,
  deleted_at: null,
  created_at: "2021-09-01T00:00:00.000000Z",
  updated_at: "2021-09-01T00:00:00.000000Z",
  categories: [],
  pivot: { genre_id: "1", category_id: "1" },
};

const handlers = [
  http.get(`${baseUrl}/categories`, async ({ params }) => {
    return HttpResponse.json({ categoryResponse });
  }),
  http.get(`${baseUrl}/genres/:id`, async ({ params }) => {
    return HttpResponse.json({data});
  }),
  http.put(`${baseUrl}/genres/${data.id}`, async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return HttpResponse.json(
      { data },
      { status: 201 }
    );
  }
  ),
];

const server = setupServer(...handlers);

describe("GenreEdit", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<GenreEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("test");
    });

    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "test2" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre updated");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      http.put(`${baseUrl}/genres/${data.id}`, async () => {
        return HttpResponse.json(
          { error: "Algo deu errado!" },
          { status: 500 }
        );
      })
    );

    renderWithProviders(<GenreEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("test");
    });

    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "test2" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Error updating genre");
      expect(text).toBeInTheDocument();
    });
  });
});