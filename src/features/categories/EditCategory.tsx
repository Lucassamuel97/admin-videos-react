import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material"
import { isDisabled } from "@testing-library/user-event/dist/cjs/utils/index.js";
import { Form, Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories, selectCategoryById } from "./categorySlice";
import { useState } from "react";

export const CategoryEdit = () => {

  const id = useParams().id || "";
  const [isDisabled, setIsDisabled] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id));

  const handleChange = (e: any) => { };
  const handleToggle = (e: any) => { };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
          <Box mb={2}>
            <form>
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
        </Box>
      </Paper>
    </Box>
  );
};