import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out succesfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <nav className="col-md-3 col-lg-2 d-flex flex-column bg-dark text-white p-4">
      <img
        src="/logo.webp"
        alt="Anime Battle Logo"
        className="img-fluid mb-3"
      />

      <ul className="nav flex-column gap-3">
        <li className="w-100">
          <button
            className={`nav-link text-white p-3 rounded-3 w-100 ${
              activePage === "home" ? "active bg-primary" : "bg-dark"
            }`}
            onClick={() => setActivePage("home")}
            style={{
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Dashboard
          </button>
        </li>

        <li className="w-100">
          <button
            className={`nav-link text-white p-3 rounded-3 w-100 ${
              activePage === "characters" ? "active bg-primary" : "bg-dark"
            }`}
            onClick={() => setActivePage("characters")}
            style={{
              transition: "background-color 0.3s ease, transform 0.2s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Characters
          </button>
        </li>

        <li className="w-100">
          <button
            className={`nav-link text-white p-3 rounded-3 w-100 ${
              activePage === "battle" ? "active bg-primary" : "bg-dark"
            }`}
            onClick={() => setActivePage("battle")}
            style={{
              transition: "background-color 0.3s ease, transform 0.2s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Battle
          </button>
        </li>
      </ul>

      <div className="mt-auto">
        <button
          className="btn btn-outline-danger w-100 py-2"
          onClick={handleLogout}
          style={{
            borderRadius: "30px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
