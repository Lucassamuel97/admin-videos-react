import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Category } from "./categorySlice";
import { Link } from "react-router-dom";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryCreate = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: '',
    name: '',
    description: null,
    is_active: false,
    deleted_at: null,
    created_at: '',
    updated_at: '',
  });

  const handleChange = (e: any) => { };
  const handleToggle = (e: any) => { };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
          
          <CategoryForm
            category={category}
            isDisabled={isDisabled}
            isLoading={false}
            onSubmit={(e) => {
              e.preventDefault();
              // handle submit
            }}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />
        </Box>
      </Paper>
    </Box>
  );
};