import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileObject, Video } from "../../types/Videos";
import { initialState, useGetVideoQuery } from "./VideoSlice";


export function VideosEdit() {
  const id = useParams<{ id: string }>().id as string;
  const { data: video, isFetching } = useGetVideoQuery({ id });
  const [videoState, setVideoState] = useState<Video>(initialState);



  useEffect(() => {
    if (video) {
      setVideoState(video);
    }
  }, [video]);

  console.log("video", videoState);
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Video</Typography>
          </Box>
        </Box>

        {/* <VideosForm
          video={videoState}
          genres={genres?.data}
          isLoading={isFetching}
          isDisabled={isFetching}
          categories={categories}
          castMembers={castMembers?.data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleAddFile={handleAddFile}
          handleRemoveFile={handleRemoveFile}
        /> */}
      </Paper>
    </Box>
  );
}