import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Category, createCategory } from "./categorySlice";
import { Link } from "react-router-dom";
import { CategoryForm } from "./components/CategoryForm";
import { useAppDispatch } from "../../app/hooks";

export const CategoryCreate = () => {

  const dispatch = useAppDispatch();
  const [isdisabled, setIsdisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    description: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createCategory(categoryState));
    enqueueSnackbar("Category created successfully", {
      variant: "success"
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  return (
    <Box>""
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>

          <CategoryForm
            category={categoryState}
            isDisabled={isdisabled}
            isLoading={false}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />
        </Box>
      </Paper>
    </Box>
  );
};