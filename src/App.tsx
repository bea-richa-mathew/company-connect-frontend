import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Projects from "./pages/public/Projects";
import Careers from "./pages/public/Careers";
import JobDetails from "./pages/public/JobDetails";
import Contact from "./pages/public/Contact";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/employee/Dashboard";
import Profile from "./pages/employee/Profile";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";
import Tasks from "./pages/employee/Tasks";
import Announcements from "./pages/employee/Announcements";

import { useAuth } from "./context/AuthContext";

function ProtectedEmployeeRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <EmployeeLayout />;
}

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">
        <p className="text-7xl font-bold">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-slate-500">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:id" element={<JobDetails />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedEmployeeRoute />}>
        <Route path="/employee" element={<Dashboard />} />
        <Route path="/employee/profile" element={<Profile />} />
        <Route path="/employee/attendance" element={<Attendance />} />
        <Route path="/employee/leave" element={<Leave />} />
        <Route path="/employee/tasks" element={<Tasks />} />
        <Route
          path="/employee/announcements"
          element={<Announcements />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}