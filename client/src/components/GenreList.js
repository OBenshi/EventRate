import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Chip } from "@material-ui/core";
import { useStyles } from "./Toolbox/cssTheme";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";

const GenreList = () => {
  const classes = useStyles();
  const { userInfo } = useAuth();
  const { musicalGenres, setMusicalGenres } = useParty();

  const handleDelete = (GenreToDelete) => () => {
    setMusicalGenres((chips) =>
      chips.filter((genre) => genre !== GenreToDelete)
    );
  };

  useEffect(() => {}, [musicalGenres]);
  return (
    <div>
      <Paper elevation={3} className={classes.pinkPostIt}>
        <Typography align="center" variant="h4">
          Musical Genres
        </Typography>
        <ul>
          {musicalGenres.map((genre) => (
            <li key={`${userInfo._id},${genre}`}>
              <Chip
                // icon={icon}
                label={genre}
                onDelete={handleDelete(genre)}
                className={classes.chip}
              />
            </li>
          ))}
        </ul>
      </Paper>
    </div>
  );
};

export default GenreList;
