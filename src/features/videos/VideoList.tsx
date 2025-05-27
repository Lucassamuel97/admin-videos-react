import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VideosTable } from "./components/VideosTable";
import { ConfirmDeleteDialog } from "../../shared/components/ConfirmDeleteDialog";
import { useDeleteVideoMutation, useGetVideosQuery } from "./VideoSlice";

export const VideosList = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [options, setOptions] = useState({
        page: 1,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, error } = useGetVideosQuery(options);
    const [deleteVideo, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteVideoMutation();

    const [openConfirm, setOpenConfirm] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

    function handleOnPageChange(page: number) {
        setOptions(prev => ({ ...prev, page }));
    }

    function handleOnPageSizeChange(perPage: number) {
        setOptions(prev => ({ ...prev, perPage }));
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if (!filterModel.quickFilterValues?.length) {
            return setOptions({ ...options, search: "" });
        }
        const search = filterModel.quickFilterValues.join("");
        setOptions({ ...options, search });
    }

    function askDeleteConfirmation(id: string) {
        setVideoToDelete(id);
        setOpenConfirm(true);
    }

    async function confirmDelete() {
        if (videoToDelete) {
            await deleteVideo({ id: videoToDelete });
            setVideoToDelete(null);
            setOpenConfirm(false);
        }
    }

    function handleCloseDialog() {
        setOpenConfirm(false);
        setVideoToDelete(null);
    }

    useEffect(() => {
        if (deleteSuccess) {
            enqueueSnackbar(`Video deleted`, { variant: "success" });
        }
        if (deleteError) {
            enqueueSnackbar(`Video not deleted`, { variant: "error" });
        }
    }, [deleteSuccess, deleteError, enqueueSnackbar]);


    if (error) {
        return <Typography>Error fetching videos</Typography>;
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/videos/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Video
                </Button>
            </Box>

            <VideosTable
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
                description="Você tem certeza que deseja deletar este video? Esta ação não pode ser desfeita."
            />
        </Box>
    );
};