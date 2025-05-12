import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    RadioGroup,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { CastMember } from "../../../types/CastMembers";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genres";
import { FileObject, Video } from "../../../types/Videos";

type Props = {
    video: Video;
    genres?: Genre[];
    categories?: Category[];
    castMembers?: CastMember[];
    isDisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function VideosForm({
    video,
    genres,
    categories,
    castMembers,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
}: Props) {
    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root": { my: 2 } }}>
                        <FormControl fullWidth>
                            <TextField
                                name="title"
                                label="Title"
                                value={video.title}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{ "data-testid": "title" }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                multiline
                                minRows={4}
                                name="description"
                                label="Description"
                                disabled={isDisabled}
                                onChange={handleChange}
                                value={video.description}
                                inputProps={{ "data-testid": "description" }}
                            />
                        </FormControl>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="year_launched"
                                        label="Year Launched"
                                        disabled={isDisabled}
                                        onChange={handleChange}
                                        value={video.year_launched}
                                        inputProps={{ "data-testid": "year_launched" }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="duration"
                                        label="Duration"
                                        disabled={false}
                                        value={video.duration}
                                        onChange={handleChange}
                                        inputProps={{ "data-testid": "duration" }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box display="flex" sx={{ my: 2 }} gap={2}>
                    <Button variant="contained" component={Link} to="/videos">
                        Back
                    </Button>

                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        disabled={isDisabled || isLoading}
                    >
                        {isLoading ? "Loading..." : "Save"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}