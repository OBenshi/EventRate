import React from "react";
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PartyInfoCard from "../components/PartyInfoCard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
function ListView(props) {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/parties/all")
      .then((res) => res.json())
      .then((data) => {
        setParties(data);
      });
  }, []);
  return (
    <div>
      <h1>listView</h1>
      <Grid container align="center" spacing={3}>
        {parties.length &&
          parties.map((party) => (
            <Grid item xs={12} key={party._id}>
              <PartyInfoCard party={party} />
            </Grid>
          ))}
      </Grid>{" "}
    </div>
  );
}

export default ListView;
