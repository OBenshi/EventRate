import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Paper, Typography, Grid } from "@material-ui/core";
import { useStyles } from "../components/Toolbox/cssTheme";
import ReviewBox from "../components/ReviewBox";
import MakeReview from "../components/MakeReview";
function EventDetailView(params) {
  const { partyName } = useParams();
  const classes = useStyles();
  const [party, setParty] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/parties/${partyName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setParty(data[0]);
      });
  }, []);
  return (
    <div>
      {console.log(party.reviews)}
      <Paper elevation={3} className={classes.cork}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              variantMapping={{ h2: "h1" }}
            >
              {party.name}
            </Typography>
          </Grid>
          {party.img && (
            <Grid item xs={10}>
              <Paper elevation={3}>
                <img
                  className={classes.partyImg}
                  src={party.img}
                  alt={party.name}
                />
              </Paper>
            </Grid>
          )}
          {party.Djs && (
            <Grid item xs={4}>
              <Paper elevation={3} className={classes.pinkPostIt}>
                <Typography align="center" variant="h4">
                  Dj's
                </Typography>
                <ul>
                  {party.Djs.map((dj) => (
                    <li key={`${party.name},${dj}`}>{dj}</li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          )}
          {party.musical_genre && (
            <Grid item xs={4}>
              <Paper elevation={3} className={classes.yellowPostIt}>
                <Typography align="center" variant="h4">
                  Music
                </Typography>
                <ul>
                  {party.musical_genre.map((genre) => (
                    <li key={`${party.name},${genre}`}>{genre}</li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.postIt}>
              {" "}
              <MakeReview />
            </Paper>
          </Grid>
        </Grid>
        {party.reviews ? (
          party.reviews.map((review) => (
            <ReviewBox review={review} key={review._id} />
          ))
        ) : (
          <p>no reviews</p>
        )}
      </Paper>
    </div>
  );
}

export default EventDetailView;
