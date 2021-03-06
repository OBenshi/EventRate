import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Chip } from "@material-ui/core";
import { useStyles } from "./Toolbox/cssTheme";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";

const DjList = () => {
  const classes = useStyles();
  const { userInfo } = useAuth();
  const { djs, setDjs } = useParty();

  const handleDelete = (djToDelete) => () => {
    setDjs((chips) => chips.filter((dj) => dj !== djToDelete));
  };

  useEffect(() => {}, [djs]);
  return (
    <div>
      <Paper elevation={3} className={classes.pinkPostIt}>
        <Typography align="center" variant="h4">
          Dj's
        </Typography>
        <ul>
          {djs.map((dj) => (
            <li key={`${userInfo._id},${dj}`}>
              <Chip
                // icon={icon}
                label={dj}
                onDelete={handleDelete(dj)}
                className={classes.chip}
              />
            </li>
          ))}
        </ul>
      </Paper>
    </div>
  );
};

export default DjList;
