import { Typography } from "@material-ui/core";
import React from "react";
import { FmL } from "../components/FmL";
import { useAuth } from "../Contexts/AuthContext";
const Home = () => {
  const { userInfo, isUser } = useAuth();
  console.log(userInfo);
  return (
    <div>
      <Typography
        variant="h2"
        variantMapping={{ h2: "h1" }}
        color="primary"
        align="center"
      >
        WELCOME TO EventRate
      </Typography>
      {!isUser && (
        <div>
          <Typography variant="h6">signup</Typography>
        </div>
      )}
      {userInfo && <p>{userInfo.firstName}</p>}
      <button onClick={FmL}>fuck</button>
    </div>
  );
};

export default Home;
