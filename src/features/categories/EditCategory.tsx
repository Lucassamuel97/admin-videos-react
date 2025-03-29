import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {

  const id = useParams().id || "";
  const [isDisabled, setIsDisabled] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id));

  const handleChange = (e: any) => { };
  const handleToggle = (e: any) => { };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
          <CategoryForm
            category={category}
            isDisabled={isDisabled}
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