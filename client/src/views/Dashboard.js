import React from "react";

function Dashboard() {
  console.log(localStorage.getItem("token"));
  return <div>dashboard</div>;
}

export default Dashboard;
