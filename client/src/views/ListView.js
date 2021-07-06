import React from "react";
import { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
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
import { useParty } from "../Contexts/PartyContext";
import { useSearch } from "../Contexts/SearchContext";
function ListView(props) {
  const { parties, setParties, refresh } = useParty();
  const { searchTerm } = useSearch();

  useEffect(() => {
    fetch("http://localhost:5000/parties/all")
      .then((res) => res.json())
      .then((data) => {
        setParties(data);
      });
  }, []);
  return (
    <div>
      <Typography variant="h1" color="textPrimary">
        listView
      </Typography>
      <Grid container align="center" spacing={3}>
        {parties.length &&
          parties.map((party) => {
            if (party.name.toUpperCase().includes(searchTerm.toUpperCase())) {
              return (
                <Grid item xs={12} key={party._id}>
                  <PartyInfoCard party={party} />
                </Grid>
              );
            }
          })}
      </Grid>{" "}
    </div>
  );
}

export default ListView;
