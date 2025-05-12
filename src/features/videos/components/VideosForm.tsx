import {
    Autocomplete,
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

                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                data-testid="categories-search"
                                loading={isLoading}
                                options={categories || []}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={video.categories}
                                disabled={isDisabled || !categories}
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.id}>
                                        {option.name}
                                    </li>
                                )}
                                onChange={(e, newValue) => {
                                    handleChange({
                                        target: { name: "categories", value: newValue },
                                    } as any);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Categories"
                                        data-testid="categories-input"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                data-testid="genres-search"
                                loading={isLoading}
                                options={genres || []}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={video.genres}
                                disabled={isDisabled || !genres}
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.id}>
                                        {option.name}
                                    </li>
                                )}
                                onChange={(e, newValue) => {
                                    handleChange({
                                        target: { name: "genres", value: newValue },
                                    } as any);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Genres"
                                        data-testid="genres-input"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                data-testid="cast-members-search"
                                loading={isLoading}
                                options={castMembers || []}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={video.cast_members}
                                disabled={isDisabled || !castMembers}
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.id}>
                                        {option.name}
                                    </li>
                                )}
                                onChange={(e, newValue) => {
                                    handleChange({
                                        target: { name: "cast_members", value: newValue },
                                    } as any);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Cast Members"
                                        data-testid="cast-members-input"
                                    />
                                )}
                            />
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