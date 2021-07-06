import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function PrivateRoute({ children, ...rest }) {
  //   let auth = useAuth();
  const { isUser } = useAuth();
  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };
  console.log(`isUser in private route`, isUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getWithExpiry("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
