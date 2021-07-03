import { set } from "date-fns/esm";
import React, { useState, useEffect, useContext } from "react";
import {
  NavLink,
  Link,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const token = localStorage.getItem("token");

  const getUserInfo = async () => {
    if (token !== null) {
      console.log(token !== null, userInfo);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      fetch("http://localhost:5000/users/profile", config)
        .then((res) => res.json())
        .then((data) => {
          console.log("I'm data from AuthContext", data[0]);
          setUserInfo(data[0]);
          //setIsUser(true);
        });
    }
  };

  const isUserLoggedIn = () => {
    if (token !== null) {
      setIsUser(true);
    }
  };

  useEffect(() => {
    getUserInfo();
    isUserLoggedIn();
  }, [token]);
  const value = { token, userInfo, setUserInfo, isUser, setIsUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
