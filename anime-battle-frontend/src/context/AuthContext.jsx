import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = () => {
      try {
        const storedAuth = JSON.parse(localStorage.getItem("auth"));
        if (storedAuth?.user && storedAuth?.token) {
          setUser(storedAuth.user);
          setToken(storedAuth.token);
        }
      } catch (err) {
        localStorage.removeItem("auth");
        console.error({ message: err.message });
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("auth", JSON.stringify(data));
    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("auth", JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
