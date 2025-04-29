import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileObject, Video } from "../../types/Videos";
import { initialState, useGetVideoQuery } from "./VideoSlice";
import { VideosForm } from "./components/VideosForm";


export function VideosEdit() {
    const id = useParams<{ id: string }>().id as string;
    const { enqueueSnackbar } = useSnackbar();

    const { data: video, isFetching } = useGetVideoQuery({ id });
    const [videoState, setVideoState] = useState<Video>(initialState);
    const [status, setStatus] = useState({
        isSuccess: false,
        isError: false,
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setVideoState((state) => ({ ...state, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // await updateVideo(mapVideoToForm(videoState));
    }

    useEffect(() => {
        if (video) {
            setVideoState(video.data);
        }
    }, [video]);

    console.log("videoState", videoState);

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar(`Video updated`, { variant: "success" });
        }

        if (status.isError) {
            enqueueSnackbar(`Error updating Video`, { variant: "error" });
        }
    }, [status, enqueueSnackbar]);
    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Edit Video</Typography>
                    </Box>
                </Box>

                <VideosForm
                    video={videoState}
                    genres={[]}
                    isLoading={isFetching}
                    isDisabled={isFetching}
                    categories={[]}
                    castMembers={[]}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Paper>
        </Box>
    );
}