import { Box, Button, debounce, IconButton, Typography } from "@mui/material"
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteCategory, selectCategories, useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";


export const CategoryList = () => {
    const {data, isFetching, error} = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
                debounceMs: 500,
            },
        }
    };

    // use categories from the store
    const rows: GridRowsProp = data ? data.data.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
    })) : [];

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            renderCell: renderNameCell
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1
        },
        {
            field: "isActive",
            headerName: "Active",
            flex: 1,
            type: "boolean",
            renderCell: renderIsActiveCell
        },
        {
            field: "created_at",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "id",
            headerName: "Actions",
            type: "string",
            flex: 1,
            renderCell: renderActionsCell
        },
    ];

    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography color={rowData.value ? "primary" : "secondary"}>
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        );
    }
    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDeleteCategory(params.row.id)}
                aria-label="delete"
                data-testid="delete-button"
            >
                <DeleteIcon />
            </IconButton>
        );
    }

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
          <Link
            style={{ textDecoration: "none" }}
            to={`/categories/edit/${rowData.id}`}
          >
            <Typography color="primary">{rowData.value}</Typography>
          </Link>
        );
      }

    async function handleDeleteCategory(id: string) {
        await deleteCategory({id}); 
    }

    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueueSnackbar("Category deleted successfully", {
                variant: "warning",
            });
        }
        if (deleteCategoryStatus.isError) {
            enqueueSnackbar("Error deleting category", {
                variant: "error",
            });
        }
    }, [deleteCategoryStatus, enqueueSnackbar]);

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
            <Typography variant="h3">
                CategoryList Page

            </Typography>
            {/* {categories.map((category) => (
                    <Typography key={category.id}>{category.name}</Typography>
                ))} */}
            <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <DataGrid 
                    pageSizeOptions={[2, 50, 100, { value: -1, label: 'All' }]}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    disableColumnSelector={true}
                    disableColumnFilter={true}
                    disableDensitySelector={true}
                    disableRowSelectionOnClick={true}
                    rows={rows}
                    columns={columns}
                    slotProps={componentProps}
                />
            </Box>
        </Box>
    )
}