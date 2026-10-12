import {
  Route,
  Routes
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import PortalLayout from "./layouts/PortalLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Projects from "./pages/public/Projects";
import ProjectCaseStudy from "./pages/public/ProjectCaseStudy";
import Careers from "./pages/public/Careers";
import JobDetails from "./pages/public/JobDetails";
import Contact from "./pages/public/Contact";
import Settings from "./components/Settings";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import Profile from "./pages/employee/Profile";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";
import Tasks from "./pages/employee/Tasks";
import Announcements from "./pages/employee/Announcements";

import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />
        <Route
          path="/projects/:slug"
          element={<ProjectCaseStudy />}
        />

        <Route
          path="/careers"
          element={<Careers />}
        />

        <Route
          path="/careers/:id"
          element={<JobDetails />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route 
        path="/settings" 
        element={<Settings />} 
        />

        {/* Existing Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Route>

      {/* EMPLOYEE PORTAL ONLY */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PortalLayout />}>
          <Route
            path="/employee"
            element={<EmployeeDashboard />}
          />

          <Route
            path="/employee/profile"
            element={<Profile />}
          />

          <Route
            path="/employee/attendance"
            element={<Attendance />}
          />

          <Route
            path="/employee/leave"
            element={<Leave />}
          />

          <Route
            path="/employee/tasks"
            element={<Tasks />}
          />

          <Route
            path="/employee/announcements"
            element={<Announcements />}
          />
        </Route>
      </Route>

      {/* PAGE NOT FOUND */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}