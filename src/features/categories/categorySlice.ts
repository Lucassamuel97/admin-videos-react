import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { CategoryParams, Result, Results } from "../../types/Category";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams) {
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

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

function createCategoryMutation(category: Category) {
  return { url: endpointUrl, method: "POST", body: category };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

const category: Category = {
  id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  name: 'Fruits',
  description: 'Fruits are the sweet and fleshy product of a tree or other plant that contains seed and can be eaten as food.',
  is_active: true,
  deleted_at: null,
  created_at: '2025-09-15T00:00:00.000000Z',
  updated_at: '2025-09-15T00:00:00.000000Z',
};

export const initialState = [
  category,
  { ...category, id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e', name: 'Vegetables' },
  { ...category, id: '10b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6f', name: 'Meat', is_active: false },
  { ...category, id: '11b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6g', name: 'Fish' },
];

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory: (state, action) => { 
      state.push(action.payload);
    },
    updateCategory: (state, action) => { 
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCategory: (state, action) => { 
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) =>
  state.categories.find((category) => category.id === id) ?? null;

export const { createCategory, updateCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice.reducer;

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
} = categoriesApiSlice;
