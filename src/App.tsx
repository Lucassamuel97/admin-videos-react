import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CreateCastMember } from "./features/cast/CreateCastMembers";
import { EditCastMember } from "./features/cast/EditCastMember";
import { CastMemberList } from "./features/cast/ListCastMembers";
import { CategoryCreate } from "./features/categories/CreateCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { CategoryList } from "./features/categories/ListCategory";
import { GenreCreate } from "./features/genre/GenreCreate";
import { GenreEdit } from "./features/genre/GenreEdit";
import { GenreList } from "./features/genre/GenreList";
import { VideosList } from "./features/videos/VideoList";
import { VideosCreate } from "./features/videos/VideosCreate";
import { VideosEdit } from "./features/videos/VideosEdit";
import { UploadList } from "./features/uploads/UploadList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./components/Login";


const App = () => {
  return (

    <Layout>
      <UploadList />
      <Routes>

        <Route path="/" element={<CategoryList />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />

        {/* category */}
        <Route path="/categories" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
        <Route path="/categories/create" element={<ProtectedRoute><CategoryCreate /></ProtectedRoute>} />
        <Route path="/categories/edit/:id" element={<ProtectedRoute><CategoryEdit /></ProtectedRoute>} />

        {/* CastMembers */}
        <Route path="/cast-members" element={<ProtectedRoute><CastMemberList /></ProtectedRoute>} />
        <Route path="/cast-members/create" element={<ProtectedRoute><CreateCastMember /></ProtectedRoute>} />
        <Route path="/cast-members/edit/:id" element={<ProtectedRoute><EditCastMember /></ProtectedRoute>} />
        {/* Genre */}
        <Route path="/genres" element={<ProtectedRoute><GenreList /></ProtectedRoute>} />
        <Route path="/genres/create" element={<ProtectedRoute><GenreCreate /></ProtectedRoute>} />
        <Route path="/genres/edit/:id" element={<ProtectedRoute><GenreEdit /></ProtectedRoute>} />

        {/* Video */}
        <Route path="/videos" element={<ProtectedRoute><VideosList /></ProtectedRoute>} />
        <Route path="/videos/create" element={<ProtectedRoute><VideosCreate /></ProtectedRoute>} />
        <Route path="/videos/edit/:id" element={<ProtectedRoute><VideosEdit /></ProtectedRoute>} />

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
  );
}

export default App
