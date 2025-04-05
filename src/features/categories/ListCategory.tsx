import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoriesTable } from './components/CategoryTable';


export const CategoryList = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [options, setOptions] = useState({
      page: 1,
      search: "",
      perPage: 10,
      rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, error } = useGetCategoriesQuery(options);
    const [deleteCategory, { error: deleteError, isSuccess: deleteSuccess }] =
      useDeleteCategoryMutation();
  
    function handleOnPageChange(page: number) {
        console.log("page", page);
      setOptions({ ...options, page: page + 1 });
    }
  
    function handleOnPageSizeChange(perPage: number) {
      setOptions({ ...options, perPage });
    }
  
    function handleFilterChange(filterModel: GridFilterModel) {
      if (!filterModel.quickFilterValues?.length) {
        return setOptions({ ...options, search: "" });
      }
  
      const search = filterModel.quickFilterValues.join("");
      setOptions({ ...options, search });
    }
  
    async function handleDeleteCategory(id: string) {
      await deleteCategory({ id });
    }
  
    useEffect(() => {
      if (deleteSuccess) {
        enqueueSnackbar(`Category deleted`, { variant: "success" });
      }
      if (deleteError) {
        enqueueSnackbar(`Category not deleted`, { variant: "error" });
      }
    }, [deleteSuccess, deleteError, enqueueSnackbar]);
  
    if (error) {
      return <Typography>Error fetching categories</Typography>;
    }
    
    console.log("data", data);
    return (
      <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/categories/create"
            style={{ marginBottom: "1rem" }}
          >
            New Category
          </Button>
        </Box>
        <CategoriesTable
          data={data}
          isFetching={isFetching}
          perPage={options.perPage}
          rowsPerPage={options.rowsPerPage}
          handleDelete={handleDeleteCategory}
          handleOnPageChange={handleOnPageChange}
          handleOnPageSizeChange={handleOnPageSizeChange}
          handleFilterChange={handleFilterChange}
        />
      </Box>
    );
  };