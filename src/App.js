import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "features/layout/Layout";
import Home from "pages/home/HomeContents";
import NewUser from "pages/user/NewUser";
import NoPage from "pages/404/PageNotFound";
import TestingConnection from "pages/lab/TestingConnection";
import Project from "pages/project/project";
import ProjectForm from "pages/project/newproject";
import AdminDashboard from "pages/dashboard/AdminDashboard";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/project" element={<Project />} />
          <Route path="/newproject" element={<ProjectForm />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/test" element={<TestingConnection />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}