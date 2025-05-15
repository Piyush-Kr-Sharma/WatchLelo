import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("auth");
    return data
      ? JSON.parse(data)
      : {
          user: null,
          token: "",
        };
  });

  // default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
  // auth?.token means "safely access the token property of the auth object." If auth is null or undefined, the result of auth?.token will be undefined instead of causing an error.

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
