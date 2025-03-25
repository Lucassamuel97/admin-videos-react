import { Box, ThemeProvider } from "@mui/system";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";

const Home = () => {
  return (
    <Typography variant="h3">Home</Typography>
  )
}

const About = () => {
  return (
    <Typography variant="h3">About</Typography>
  )
}


const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <Box
      component="main"
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.grey[900],
        }}>
        <Header />
        <Layout>
          <h1>Welcome to router</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App
