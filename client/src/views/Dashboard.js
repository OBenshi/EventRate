import React, { useEffect, useState, useRef } from "react";
import { Paper, Typography, Grid, Divider } from "@material-ui/core";
import { useAuth } from "../Contexts/AuthContext";
// import{Typography} from ""
function Dashboard() {
  const { userInfo, isUser } = useAuth();
  console.log(99999999);
  useEffect(() => {
    console.log(userInfo);
  });
  return (
    <div>
      <Typography color="primary">{userInfo._id && userInfo._id}</Typography>
    </div>
  );
}

export default Dashboard;
