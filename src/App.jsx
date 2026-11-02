import { lazy } from "react";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const DetailPage = lazy(() => import("./pages/DetailPage"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="posts/new" element={<CreatePost />} />
        <Route path="posts/:slug" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;