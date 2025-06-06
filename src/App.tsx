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


const App = () => {
  return (

    <Layout>
      <UploadList />
      <Routes>
        <Route path="/" element={<CategoryList />} />

        {/* category */}
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/edit/:id" element={<CategoryEdit />} />

        {/* CastMembers */}
        <Route path="/cast-members" element={<CastMemberList />} />
        <Route path="/cast-members/create" element={<CreateCastMember />} />
        <Route path="/cast-members/edit/:id" element={<EditCastMember />} />
        {/* Genre */}
        <Route path="/genres" element={<GenreList />} />
        <Route path="/genres/create" element={<GenreCreate />} />
        <Route path="/genres/edit/:id" element={<GenreEdit />} />

        {/* Video */}
        <Route path="/videos" element={<VideosList />} />
        <Route path="/videos/create" element={<VideosCreate />} />
        <Route path="/videos/edit/:id" element={<VideosEdit />} />

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
