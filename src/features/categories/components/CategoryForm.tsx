import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../categorySlice";

type Props = {
    category: Category;
    isDisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CategoryForm({
    category,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
    handleToggle
}: Props) {
    
    return (
        <Box mb={2}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      id="name"
                      label="Name"
                      name="name"
                      variant="outlined"
                      value={category.name}
                      disabled={isDisabled}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      id="description"
                      label="Description"
                      name="description"
                      variant="outlined"
                      value={category.description}
                      disabled={isDisabled}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          name="is_active"
                          color="secondary"
                          onChange={handleToggle}
                          checked={category.is_active || false}
                          inputProps={{ "aria-label": "controlled" }}
                          data-testid="is_active"
                          disabled={isDisabled}
                        />
                      }
                      label="Active"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button variant="contained" component={Link} to="/categories">
                      Back
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={isDisabled}
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
    )
}