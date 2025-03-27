import { Box, Button, Typography } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import { selectCategories } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';


export const CategoryList = () => {
    const categories = useAppSelector(selectCategories);

    // use categories from the store
    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description
    }));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', width: 150 },
        { field: 'name', headerName: 'Nome', width: 150 },
        { field: 'description', headerName: 'Descrição', width: 150 },
    ];

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