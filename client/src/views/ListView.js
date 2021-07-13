import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import PartyInfoCard from "../components/PartyInfoCard";
import { useParty } from "../Contexts/PartyContext";
import { useSearch } from "../Contexts/SearchContext";
const { serverURL } = require("../config");
function ListView(props) {
  const { parties, setParties, refresh } = useParty();
  const { searchTerm } = useSearch();

  useEffect(() => {
    fetch(`${serverURL}/parties/all`)
      .then((res) => res.json())
      .then((data) => {
        setParties(data);
      });
  }, []);
  return (
    <div>
      {/* <Typography variant="h1" color="textPrimary">
        listView
      </Typography> */}
      <Grid container align="center" spacing={3}>
        {parties.length &&
          parties
            .sort((a, b) => {
              const dateA = a.date;
              const dateB = b.date;
              if (dateA < dateB) {
                return 1;
              }
              if (dateA > dateB) {
                return -1;
              }
              return 0;
            })
            .map((party) => {
              if (party.name.toUpperCase().includes(searchTerm.toUpperCase())) {
                if (party.display === true) {
                  return (
                    <Grid item xs={12} key={party._id}>
                      <PartyInfoCard party={party} />
                    </Grid>
                  );
                }
              }
            })}
      </Grid>{" "}
    </div>
  );
}

export default ListView;
