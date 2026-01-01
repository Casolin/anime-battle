import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Sidebar from "../components/layout/SideBar";
import { Characters } from "./Characters";

export const Dashboard = () => {
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState("home");

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
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <Sidebar activePage={page} setActivePage={setPage} />

        <main className="col-md-9 col-lg-10 p-4">{renderPage()}</main>
      </div>
    </div>
  );
};
