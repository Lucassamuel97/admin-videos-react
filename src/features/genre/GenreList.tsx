import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GenresTable } from "./components/GenresTable";
import { useGetGenresQuery } from "./genreSlice";

export const GenreList = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [options, setOptions] = useState({
        page: 1,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, error } = useGetGenresQuery(options);


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
                handleDelete={e => {
                    if (window.confirm("Are you sure you want to delete this genre?")) {
                        enqueueSnackbar("Genre deleted", {
                            variant: "success",
                        });
                    }
                }
                }
            />
        </Box>
    );
}
