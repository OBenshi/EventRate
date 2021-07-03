import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { useStyles } from "./Toolbox/cssTheme";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";

const DjList = () => {
  const classes = useStyles();
  const { userInfo } = useAuth();
  const { djs } = useParty();

  useEffect(() => {}, [djs]);
  return (
    <div>
      <Grid item xs={4}>
        <Paper elevation={3} className={classes.pinkPostIt}>
          <Typography align="center" variant="h4">
            Dj's
          </Typography>
          <ul>
            {djs.map((dj) => (
              <li key={`${userInfo._id},${dj}`}>{dj}</li>
            ))}
          </ul>
        </Paper>
      </Grid>
    </div>
  );
};

export default DjList;
