import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { castMemberResponse } from "../mocks/castMemberMock";
import { categoryResponsePage2 } from "../mocks/categoryMock";
import { CastMemberList } from "./ListCastMembers";

export const handlers = [
    http.get(`${baseUrl}/cast_members`, async (request) => {
        const page = new URL(request.request.url).searchParams.get("page");
        if (page === "2") {
            return HttpResponse.json(categoryResponsePage2);
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        return HttpResponse.json(castMemberResponse);
    }),
];

const server = setupServer(...handlers);

describe("ListCastmembers", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

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
});
