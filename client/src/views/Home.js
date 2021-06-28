import React from "react";
import { FmL } from "../components/FmL";
import { useAuth } from "../Contexts/AuthContext";
const Home = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  return (
    <div>
      home
      {userInfo && <p>{userInfo.firstName}</p>}
      <button onClick={FmL}>fuck</button>
    </div>
  );
};

export default Home;
