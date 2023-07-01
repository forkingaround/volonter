import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "features/layout/Layout";
import Home from "pages/home/HomeContents";
import NewUser from "pages/user/NewUser";
import NoPage from "pages/404/PageNotFound";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}