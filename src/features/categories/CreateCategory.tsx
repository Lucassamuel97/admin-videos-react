import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Category, createCategory, useCreateCategoryMutation } from "./categorySlice";
import { Link } from "react-router-dom";
import { CategoryForm } from "./components/CategoryForm";
import { useAppDispatch } from "../../app/hooks";

export const CategoryCreate = () => {
  const [createCategory, status] = useCreateCategoryMutation();
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
    await createCategory(categoryState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Category created successfully", { variant: "success" });
      setIsdisabled(true);
    }
    if (status.error) {
      enqueueSnackbar("Category not created", { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

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