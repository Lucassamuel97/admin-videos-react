import { Box, ThemeProvider } from "@mui/system";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { darkTheme, lightTheme } from "./config/theme";
import { CssBaseline, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import { CategoryList } from "./features/categories/ListCategory";
import { CategoryCreate } from "./features/categories/CreateCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { SnackbarProvider } from 'notistack'
import { CastMemberList } from "./features/cast/ListCastMembers";
import { CreateCastMember } from "./features/cast/CreateCastMembers";
import { EditCastMember } from "./features/cast/EditCastMember";
import { GenreCreate } from "./features/genre/GenreCreate";
import { GenreEdit } from "./features/genre/GenreEdit";
import { GenreList } from "./features/genre/GenreList";
import { VideosList } from "./features/videos/VideoList";
import { VideosEdit } from "./features/videos/VideosEdit";
import { VideosCreate } from "./features/videos/VideosCreate";
import { useEffect, useState } from "react";


const App = () => {

  const [theme, setTheme] = useState(darkTheme);

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
    localStorage.setItem("theme", theme === darkTheme ? "light" : "dark");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme === "dark" ? darkTheme : lightTheme);
    }
  }
  , []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Header theme={theme.palette.mode} handleThemeChange={handleThemeChange} />
        <Layout>
          <Routes>
            <Route path="/" element={<CategoryList />} />

            {/* category */}
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<CategoryCreate/>} />
            <Route path="/categories/edit/:id" element={<CategoryEdit/>} />

            {/* CastMembers */}
            <Route path="/cast-members" element={<CastMemberList />} />
            <Route path="/cast-members/create" element={<CreateCastMember/>} />
            <Route path="/cast-members/edit/:id" element={<EditCastMember/>} />
            {/* Genre */}
            <Route path="/genres" element={<GenreList />} />
            <Route path="/genres/create" element={<GenreCreate />} />
            <Route path="/genres/edit/:id" element={<GenreEdit/>} />

            {/* Video */}
            <Route path="/videos" element={<VideosList />} />
            <Route path="/videos/create" element={<VideosCreate />} /> 
            {<Route path="/videos/edit/:id" element={<VideosEdit />} /> }

            {/* 500 */}

            {/* 404 */}
            <Route path="*" element={
              <Box>
                <Typography variant="h3">
                  404 - Not Found
                </Typography>
                <Link to="/">Go Home</Link>
              </Box>
            } />
          </Routes>
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App
