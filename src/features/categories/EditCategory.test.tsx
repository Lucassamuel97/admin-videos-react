import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders, screen, waitFor, fireEvent } from "../../utils/test-utils";
import { CategoryEdit } from "./EditCategory";
import { baseUrl } from "../api/apiSlice";

const data = {
    id: "1",
    name: "Category 1",
    description: "Category test",
    is_active: true,
    deleted_at: null,
    created_at: "2022-09-27T17:10:33+0000",
    updated_at: "2022-09-27T17:10:33+0000",
};

export const handlers = [
    http.get(`${baseUrl}/categories/:id`, async ({ params }) => {
        return HttpResponse.json({data});
    }),
    http.put(`${baseUrl}/categories/${data.id}`, async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return HttpResponse.json(
            {data},
            { status: 201 }
        );
    }
    ),
];

const server = setupServer(...handlers);

describe("EditCategory", () => {
    afterAll(() => server.close());
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());

    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CategoryEdit />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should handle submit", async () => {
        renderWithProviders(<CategoryEdit />);
        const name = await screen.findByTestId("name");
        const description = screen.getByTestId("description");
        const isActive = screen.getByTestId("is_active");
        const submit = screen.getByText("Save");

        await waitFor(() => {
            expect(name).toHaveValue("Category 1");
        });

        fireEvent.change(name, { target: { value: "test" } });
        fireEvent.change(description, { target: { value: "test desc" } });
        fireEvent.click(isActive);
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Category updated successfully");
            expect(text).toBeInTheDocument();
        });
    
    });

    it("should handle error", async () => {
        server.use(
            http.put(`${baseUrl}/categories/${data.id}`, async () => {
                return HttpResponse.json(
                    { error: "Algo deu errado!" },  // Corpo da resposta
                    { status: 500 }  // Status HTTP 500
                );
            })
        );

        renderWithProviders(<CategoryEdit />);
        const name = await screen.findByTestId("name");
        const description = screen.getByTestId("description");
        const isActive = screen.getByTestId("is_active");
        const submit = screen.getByText("Save");

        fireEvent.change(name, { target: { value: "test" } });
        fireEvent.change(description, { target: { value: "test desc" } });
        fireEvent.click(isActive);
        fireEvent.click(submit);

        await waitFor(() => {
            const text = screen.getByText("Category not updated");
            expect(text).toBeInTheDocument();
        });
    });
});