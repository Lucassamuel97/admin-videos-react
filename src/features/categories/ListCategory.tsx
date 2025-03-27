import { Box, Button, IconButton, Typography } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import { selectCategories } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';


export const CategoryList = () => {
    const categories = useAppSelector(selectCategories);

    // use categories from the store
    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            flex: 1
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
            onClick={() => console.log(params.row.id)}
            aria-label="delete"
            data-testid="delete-button"
          >
            <DeleteIcon />
          </IconButton>
        );
    }

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
                {/* {categories.map((category) => (
                    <Typography key={category.id}>{category.name}</Typography>
                ))} */}
                <DataGrid rows={rows} columns={columns} />
            </Typography>
        </Box>
    )
}