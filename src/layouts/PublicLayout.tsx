import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
      <Navbar />

      <main className="min-h-[70vh] bg-white dark:bg-black">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}