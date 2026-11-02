import { lazy } from "react";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const PostDetailPage = lazy(() => import("./pages/detailpage"));
const CreatePostPage = lazy(() => import("./pages/createpost"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="posts/new" element={<CreatePostPage />} />
        <Route path="posts/:slug" element={<PostDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;