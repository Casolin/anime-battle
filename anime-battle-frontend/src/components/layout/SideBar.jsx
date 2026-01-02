import useAuth from "../../hooks/useAuth";
import "../../styles/sidebar.css";

const Sidebar = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  return (
    <>
      <button className="sidebar-hamburger" onClick={() => setIsOpen(true)}>
        ☰
      </button>

      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <img src="/logo.webp" alt="Logo" className="sidebar-logo" />

        <nav className="sidebar-nav">
          <button
            className={activePage === "home" ? "active" : ""}
            onClick={() => {
              setActivePage("home");
              setIsOpen(false);
            }}
          >
            Dashboard
          </button>

          <button
            className={activePage === "characters" ? "active" : ""}
            onClick={() => {
              setActivePage("characters");
              setIsOpen(false);
            }}
          >
            Characters
          </button>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
