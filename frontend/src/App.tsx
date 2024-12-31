import { Route, Routes } from "react-router";
import Layout from "./layout";
import BlogsPage from "./pages/Blogs";
import HomePage from "./pages/Home";
import BlogPage from "./pages/Blog";
import { ROUTE } from "./shared/constants/ROUTE";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTE.HOME} element={<HomePage />} />
        <Route path={`${ROUTE.BLOGS.DEFAULT}`} element={<BlogsPage />} />
        <Route
          path={`${ROUTE.BLOGS.DEFAULT}${ROUTE.BLOGS.SLUG}`}
          element={<BlogPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
