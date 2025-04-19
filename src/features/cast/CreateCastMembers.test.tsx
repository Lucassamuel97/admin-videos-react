import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { renderWithProviders, screen, waitFor, fireEvent } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CreateCastMember } from "./CreateCastMembers";

export const handlers = [
  http.post(`${baseUrl}/cast_members`, async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return HttpResponse.json(
      { message: "Teste" },
      { status: 201 }
    );
  }
  ),
];

const server = setupServer(...handlers);

describe("CreateCastMember", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CreateCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CreateCastMember />);
    const nameInput = screen.getByTestId("name");
    const submitButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "Teste" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const text = screen.getByText("Cast member created");
      expect(text).toBeInTheDocument();
    });
  }
  );

  it("should handle error", async () => {
    server.use(
      http.post(`${baseUrl}/cast_members`, async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return HttpResponse.json(
          { message: "Error" },
          { status: 500 }
        );
      }
      )
    );

    renderWithProviders(<CreateCastMember />);
    const nameInput = screen.getByTestId("name");
    const submitButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "Teste" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const text = screen.getByText("Cast member not created");
      expect(text).toBeInTheDocument();
    });
  });

});
