import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GenresTable } from "./components/GenresTable";
import { useDeleteGenreMutation, useGetGenresQuery } from "./genreSlice";
import { ConfirmDeleteDialog } from "../../shared/components/ConfirmDeleteDialog";

export const GenreList = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [options, setOptions] = useState({
        page: 1,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, error } = useGetGenresQuery(options);
    const [deleteGenre, { error: deleteError, isSuccess: deleteSuccess }] =
        useDeleteGenreMutation();

    const [openConfirm, setOpenConfirm] = useState(false);
    const [genreToDelete, setGenreToDelete] = useState<string | null>(null);

    function handleOnPageChange(page: number) {
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

    function askDeleteConfirmation(id: string) {
        setGenreToDelete(id);
        setOpenConfirm(true);
    }

    async function confirmDelete() {
        if (genreToDelete) {
            await deleteGenre({ id: genreToDelete });
            setGenreToDelete(null);
            setOpenConfirm(false);
        }
    }

    function handleCloseDialog() {
        setOpenConfirm(false);
        setGenreToDelete(null);
    }

    useEffect(() => {
        if (deleteSuccess) {
            enqueueSnackbar(`Genre deleted`, { variant: "success" });
        }
        if (deleteError) {
            enqueueSnackbar(`Genre not deleted`, { variant: "error" });
        }
    }, [deleteSuccess, deleteError, enqueueSnackbar]);


    if (error) {
        return <Typography>Error fetching genres</Typography>;
    }
    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/genres/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Genre
                </Button>
            </Box>

            <GenresTable
                data={data}
                perPage={options.perPage}
                rowsPerPage={options.rowsPerPage}
                isFetching={isFetching}
                page={options.page}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
                handleOnPageSizeChange={handleOnPageSizeChange}
                handleDelete={askDeleteConfirmation}
            />

            <ConfirmDeleteDialog
                open={openConfirm}
                onClose={handleCloseDialog}
                onConfirm={confirmDelete}
                title="Confirmar exclusão"
                description="Você tem certeza que deseja deletar este gênero? Esta ação não pode ser desfeita."
            />
        </Box>
    );
}
