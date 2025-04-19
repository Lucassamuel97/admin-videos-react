import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { castMemberResponse, castMemberResponseNoRows, castMemberResponsePage2 } from "../mocks/castMemberMock";
import { CastMemberList } from "./ListCastMembers";

export const handlers = [
    http.get(`${baseUrl}/cast_members`, async (request) => {
        const url = new URL(request.request.url);
        const page = url.searchParams.get("page");
        const search = url.searchParams.get("search")

        if (page === "2") {
            return HttpResponse.json(castMemberResponsePage2);
        }

        if (search == "semregistros") {
            return HttpResponse.json(castMemberResponseNoRows);
        }

        await new Promise(resolve => setTimeout(resolve, 200));
        return HttpResponse.json(castMemberResponse);
    }),
    http.delete(`${baseUrl}/cast_members/:id`, async (request) => {
        const url = new URL(request.request.url);
        const id = url.pathname.split("/").pop();

        await new Promise(resolve => setTimeout(resolve, 200));
        return HttpResponse.json({ message: `Cast member ${id} deleted` }, { status: 204 });
    }),
];

const server = setupServer(...handlers);

describe("ListCastmembers", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close()); ''

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CastMemberList />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render loading state", () => {
        renderWithProviders(<CastMemberList />);
        const loading = screen.getByRole("progressbar");
        expect(loading).toBeInTheDocument();
    });

    it("should render success state", async () => {
        renderWithProviders(<CastMemberList />);
        await waitFor(() => {
            const name = screen.getByText("Teste");
            expect(name).toBeInTheDocument();
        });
    });

    it("should render error state", async () => {
        server.use(
            http.get(`${baseUrl}/cast_members`, async () => {
                return HttpResponse.json(
                    { error: "Algo deu errado!" },  // Corpo da resposta
                    { status: 500 }  // Status HTTP 500
                );
            })
        );

        renderWithProviders(<CastMemberList />);

        await waitFor(() => {
            const error = screen.getByText("Error!");
            expect(error).toBeInTheDocument();
        });
    });

    it("should handle On PageChange", async () => {
        renderWithProviders(<CastMemberList />);

        await waitFor(() => {
            const name = screen.getByText("Teste");
            expect(name).toBeInTheDocument();
        });

        const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
        fireEvent.click(nextButton);

        await waitFor(() => {
            const name = screen.getByText("Teste 2");
            expect(name).toBeInTheDocument();
        });
    });

    it("should handle filter change", async () => {
        renderWithProviders(<CastMemberList />);

        await waitFor(() => {
            const name = screen.getByText("Teste");
            expect(name).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Search…");
        fireEvent.change(input, { target: { value: "Teste" } });

        await waitFor(() => {
            const loading = screen.getByRole("progressbar");
            expect(loading).toBeInTheDocument();
        });
    });

    it("should not search the api for whitespace in the filter", async () => {
        renderWithProviders(<CastMemberList />);
    
        // Aguarda o primeiro item aparecer
        const name = await screen.findByText("Teste");
        expect(name).toBeInTheDocument();
    
        const input = screen.getByPlaceholderText("Search…");
        
        // Simula digitação de espaços em branco
        fireEvent.change(input, { target: { value: "  " } });
    
        // Aguarda e verifica se nenhum loading apareceu (ou seja, não buscou novamente)
        await waitFor(() => {
            const loading = screen.queryByRole("progressbar");
            expect(loading).not.toBeInTheDocument();
        });
    
        // Garante que os dados antigos ainda estão lá
        expect(name).toBeInTheDocument();
    });


    it("should handle no rows", async () => {
        renderWithProviders(<CastMemberList />);

        await waitFor(() => {
            const name = screen.getByText("Teste");
            expect(name).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Search…");
        fireEvent.change(input, { target: { value: "semregistros" } });

        await waitFor(() => {
            const noRows = screen.getByText("No rows");
            expect(noRows).toBeInTheDocument();
        });
    });

    it("should handle Delete Category success", async () => {
        renderWithProviders(<CastMemberList />);

        await waitFor(() => {
            const name = screen.getByText("Teste");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByTestId("delete-button")[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const name = screen.getByText("Cast member deleted");
            expect(name).toBeInTheDocument();
        });
    });

    it("should handle Delete Category error", async () => {
        server.use(
            http.delete(`${baseUrl}/cast_members/:id`, async () => {
                return HttpResponse.json(
                    { error: "Algo deu errado!" },  // Corpo da resposta
                    { status: 500 }  // Status HTTP 500
                );
            })
        );

        renderWithProviders(<CastMemberList />);

        await waitFor(() => {
            const name = screen.getByText("Teste");
            expect(name).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByTestId("delete-button")[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const error = screen.getByText("Cast member not deleted");
            expect(error).toBeInTheDocument();
        });
    }
    );
});
