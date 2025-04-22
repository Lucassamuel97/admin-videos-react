import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import { GenreForm } from "./components/GenreFomr";

export const GenreCreate = () => {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={{}}
          categories={[ { id: '1', name: "Action" , description: 'teste', deleted_at: 'null', is_active: true, created_at: 'null', updated_at: 'null' },]}  
          isLoading={false}
          isDisabled={false}
          handleSubmit={(e) => {e.preventDefault();}}
          handleChange={(e) => {e.preventDefault();}}
        />
      </Paper>
    </Box>
  );
}