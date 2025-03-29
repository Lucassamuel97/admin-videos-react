import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { i } from "vitest/dist/reporters-w_64AS5f.js";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const category: Category = {
  id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  name: 'Fruits',
  description: 'Fruits are the sweet and fleshy product of a tree or other plant that contains seed and can be eaten as food.',
  is_active: true,
  deleted_at: null,
  created_at: '2025-09-15T00:00:00.000000Z',
  updated_at: '2025-09-15T00:00:00.000000Z',
}

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
    createCategory: (state, action) => { },
    updateCategory: (state, action) => { },
    deleteCategory: (state, action) => { },
  },
});


// Selectors
export const selectCategories = (state: RootState) => state.categories;

// Select category by id
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);

  return category || {
    id: '',
    name: '',
    description: null,
    is_active: false,
    deleted_at: null,
    created_at: '',
    updated_at: '',
  };
}

export default categorySlice.reducer;