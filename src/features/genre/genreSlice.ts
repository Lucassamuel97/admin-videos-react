import { Results } from "../../types/Category";
import {
    Genre,
    GenreParams,
    GenrePayload,
    Genres,
    Result,
} from "../../types/Genres";
import { apiSlice } from "../api/apiSlice";
const endpointUrl = "/genres";

export const initialState = {
    id: "",
    name: "",
    created_at: "",
    updated_at: "",
    deleted_at: null,
    isActive: false,
    categories: [],
    description: "",
    pivot: { genre_id: "", category_id: "" },
};

function getCategories() {
    return "categories?all=true";
}

function parseQueryParams(params: GenreParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.perPage) {
        query.append("per_page", params.perPage.toString());
    }

    if (params.search) {
        query.append("search", params.search);
    }

    if (params.isActive) {
        query.append("is_active", params.isActive.toString());
    }

    return query.toString();
}

function createGenreMutation(genre: GenrePayload) {
    return { url: endpointUrl, method: "POST", body: genre };
}

function getGenre({ id }: { id: string }) {
    return `${endpointUrl}/${id}`;
}

function updateGenreMutation(genre: GenrePayload) {
    return { url: `${endpointUrl}/${genre.id}`, method: "PUT", body: genre };
}


export const genreSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCaTegories: query<Results, void>({
            query: getCategories,
        }),
        getGenre: query<Result, { id: string }>({
            query: getGenre,
            providesTags: ["Genres"],
        }),
        updateGenre: mutation<Genre, GenrePayload>({
            query: updateGenreMutation,
            invalidatesTags: ["Genres"],
        }),
        createGenre: mutation<Genre, GenrePayload>({
            query: createGenreMutation,
            invalidatesTags: ["Genres"],
        }),
    }),
});

export const {
    useCreateGenreMutation,
    useGetCaTegoriesQuery,
    useGetGenreQuery,
    useUpdateGenreMutation,
} = genreSlice;