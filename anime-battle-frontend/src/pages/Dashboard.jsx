import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Sidebar from "../components/layout/SideBar";
import { Characters } from "./Characters";

export const Dashboard = () => {
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loader) return <Loader />;

  const renderPage = () => {
    switch (page) {
      case "characters":
        return <Characters />;
      default:
        return (
          <div className="text-center mt-5">
            <h2>Welcome to Anime Battle!</h2>
            <p>Select a page from the sidebar to continue.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activePage={page}
        setActivePage={setPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className="dashboard-content">
        <div className="container-fluid">{renderPage()}</div>
      </main>
    </div>
  );
};
