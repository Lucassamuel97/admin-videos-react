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