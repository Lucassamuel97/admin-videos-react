import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useDeleteCastMemberMutation, useGetcastMembersQuery } from "./CastMembersSlice";
import { GridFilterModel } from "@mui/x-data-grid";
import { enqueueSnackbar } from "notistack";
import { CastMemberTable } from "./components/CastMembersTable";

export const CastMemberList = () => {

    const [options, setOptions] = useState({
        page: 1,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30],
    });

    const { data, isFetching, error } = useGetcastMembersQuery(options);
    const [deleteCastMember, deleteCastMemberStatus] =
        useDeleteCastMemberMutation();

    async function handleDeleteCastMember(id: string) {
        await deleteCastMember({ id });
    }

    function handleOnPageChange(page: number) {
        setOptions(prev => ({ ...prev, page }));
    }

    function handleOnPageSizeChange(perPage: number) {
        setOptions(prev => ({ ...prev, perPage }));
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            return setOptions({ ...options, search });
        }

        return setOptions({ ...options, search: "" });
    }

    useEffect(() => {
        if (deleteCastMemberStatus.isSuccess) {
            enqueueSnackbar(`Cast member deleted`, { variant: "success" });
        }
        if (deleteCastMemberStatus.isError) {
            enqueueSnackbar(`Cast member not deleted`, { variant: "error" });
        }
    }, [deleteCastMemberStatus, enqueueSnackbar]);

    if (error) {
        return <Typography variant="h2">Error!</Typography>;
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/cast-members/create"
                    sx={{ mb: 2 }}
                >
                    New Cast Member
                </Button>
            </Box>

            <CastMemberTable
                data={data}// ← ajustando de volta para base 0
                perPage={options.perPage}
                rowsPerPage={options.rowsPerPage}
                isFetching={isFetching}
                page={options.page}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
                handleOnPageSizeChange={handleOnPageSizeChange}
                handleDelete={handleDeleteCastMember}
            />
        </Box>
    );
}