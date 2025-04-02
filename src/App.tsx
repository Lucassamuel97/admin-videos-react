import { Box, ThemeProvider } from "@mui/system";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import { CategoryList } from "./features/categories/ListCategory";
import { CategoryCreate } from "./features/categories/CreateCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { SnackbarProvider } from 'notistack'



const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Box
      component="main"
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.grey[900],
        }}>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<CategoryCreate/>} />
            <Route path="/categories/edit/:id" element={<CategoryEdit/>} />

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
      </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App
