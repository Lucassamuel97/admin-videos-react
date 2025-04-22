import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import { GenreForm } from "./components/GenreForm";
import {
  initialState as genreInintalState,
  useCreateGenreMutation,
  useGetCaTegoriesQuery,
} from "./genreSlice";

import { Genre } from "../../types/Genres";

export const GenreCreate = () => {

  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useGetCaTegoriesQuery();
  const [createGenre, status] = useCreateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(genreInintalState);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createGenre({
      id: genreState.id,
      name: genreState.name,
      categories_id: genreState.categories?.map((category) => category.id),
    });
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Genre created`, { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar(`Genre not created`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);


  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={genreState}
          categories={categories?.data}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
}