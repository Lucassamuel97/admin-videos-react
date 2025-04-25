import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
    fireEvent,
    renderWithProviders,
    screen,
    waitFor,
} from "../../utils/test-utils";

import { GenreList } from "./GenreList";
import { baseUrl } from "../api/apiSlice";
import { genreResponse, genreResponsePage2 } from "../mocks/genreMock";
import { categoryResponse } from "../mocks/categoryMock";

const handlers = [
    http.get(`${baseUrl}/genres`, async (request) => {
        const page = new URL(request.request.url).searchParams.get("page");
        if (page === "2") {
            return HttpResponse.json(genreResponsePage2);
        }
        await new Promise(resolve => setTimeout(resolve, 50));
        return HttpResponse.json(genreResponse);
    }),
    http.delete(`${baseUrl}/genres/:id`, async ({ params }) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return HttpResponse.json({ message: `Genre ${params.id} deleted` });
    }),
];

const server = setupServer(...handlers);

describe("GenreList", () => {
    beforeEach(() => server.listen());
    afterEach(() => {
        server.resetHandlers();
        server.close();
    });

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<GenreList />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render loading state", () => {
        renderWithProviders(<GenreList />);
        const loading = screen.getByRole("progressbar");
        expect(loading).toBeInTheDocument();
    });

    it("should render error state", async () => {
        server.use(
            http.get(`${baseUrl}/genres`, async () => {
                return HttpResponse.json(
                    { error: "Algo deu errado!" },  // Corpo da resposta
                    { status: 500 }  // Status HTTP 500
                );
            })
        );

        renderWithProviders(<GenreList />);
        await waitFor(() => {
            const error = screen.getByText("Error fetching genres");
            expect(error).toBeInTheDocument();
        });
    });

    it("should handle On PageChange", async () => {
        renderWithProviders(<GenreList />);

        await waitFor(() => {
            const name = screen.getByText("Norfolk Island");
            expect(name).toBeInTheDocument();
        });

        await waitFor(() => {
            const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
            expect(nextButton).toBeEnabled();
            fireEvent.click(nextButton);
        });

        screen.debug();

        await waitFor(() => {
            const name = screen.getByText("Norfolk Island 2");
            expect(name).toBeInTheDocument();
        });
    });

    it("should handle filter change", async () => {
        renderWithProviders(<GenreList />);

        await waitFor(() => {
            const name = screen.getByText("Norfolk Island");
            expect(name).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Search…");
        fireEvent.change(input, { target: { value: "Norfolk Island" } });

        await waitFor(() => {
            const loading = screen.getByRole("progressbar");
            expect(loading).toBeInTheDocument();
        });
    });

    it("should handle Delete Genre success", async () => {
        renderWithProviders(<GenreList />);

        await waitFor(() => {
            const name = screen.getByText("Norfolk Island");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getByTestId("DeleteIcon");
        fireEvent.click(deleteButton);

        fireEvent.click(screen.getByRole("button", { name: /deletar/i }));

        await waitFor(() => {
            const name = screen.getByText("Genre deleted");
            expect(name).toBeInTheDocument();
        });
    });

    it("should handle Delete Genre error", async () => {
        server.use(
            http.delete(`${baseUrl}/genres/${genreResponse.data[0].id}`, async () => {
                return HttpResponse.json(
                    { error: "Algo deu errado!" },  // Corpo da resposta
                    { status: 500 }  // Status HTTP 500
                );
            })
        );

        renderWithProviders(<GenreList />);

        await waitFor(() => {
            const name = screen.getByText("Norfolk Island");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getByTestId("DeleteIcon");
        fireEvent.click(deleteButton);

        fireEvent.click(screen.getByRole("button", { name: /deletar/i }));

        await waitFor(() => {
            const error = screen.getByText("Genre not deleted");
            expect(error).toBeInTheDocument();
        });
    }
    );

    it("should handle the cancellation of the Delete Genre call", async () => {
        renderWithProviders(<GenreList />);

        await waitFor(() => {
            const name = screen.getByText("Norfolk Island");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getByTestId("DeleteIcon");
        fireEvent.click(deleteButton);

        fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));

        await waitFor(() => {
            const name = screen.getByText("Norfolk Island");
            expect(name).toBeInTheDocument();
        });
    }
    );

});