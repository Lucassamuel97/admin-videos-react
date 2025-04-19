import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders, screen, waitFor, fireEvent } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { EditCastMember } from "./EditCastMember";

const data = {
  id: 1,
  name: "test",
  type: 1,
  deleted_at: null,
  created_at: "2022-09-27T17:10:33+0000",
  updated_at: "2022-09-27T17:10:33+0000",
};

export const handlers = [
  http.get(`${baseUrl}/cast_members/`, async ({ params }) => {
    return HttpResponse.json({ data });
  }),
  http.put(`${baseUrl}/cast_members/${data.id}`, async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return HttpResponse.json(
      { data },
      { status: 201 }
    );
  }
  ),
];

const server = setupServer(...handlers);

describe("EditCastMember", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<EditCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<EditCastMember />);
    const name = await screen.findByTestId("name");
    await waitFor(() => {
      expect(name).toHaveValue("test");
    });

    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Cast member updated");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle error", async () => {
    server.use(
      http.put(`${baseUrl}/cast_members/${data.id}`, async () => {
        return HttpResponse.json(
          { message: "error" },
          { status: 500 }
        );
      })
    );

    renderWithProviders(<EditCastMember />);
    const name = await screen.findByTestId("name");
    await waitFor(() => {
      expect(name).toHaveValue("test");
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Cast member not updated");
      expect(text).toBeInTheDocument();
    });
  });
});