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
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { useStyles } from "../components/Toolbox/cssTheme";
import ReviewBox from "../components/ReviewBox";
import MakeReview from "../components/MakeReview";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";
function EventDetailView(params) {
  const { refresh, setRefresh } = useParty();
  const { partyName } = useParams();
  const classes = useStyles();
  const [party, setParty] = useState({});
  const [reviews, setReviews] = useState();
  const { isUser } = useAuth();
  console.log(`isUser`, isUser);
  useEffect(() => {
    fetch(`http://localhost:5000/parties/${partyName}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data[0].reviews);
        setParty(data[0]);
      });
  }, [refresh]);
  return (
    <div>
      {console.log(888888888888888888888888, reviews)}
      {/* <Paper elevation={8}> */}
      <Grid container justify="center" className={classes.cork}>
        <Grid item xs={12}>
          <Typography align="center" variant="h2" variantMapping={{ h2: "h1" }}>
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
              {/* <Button onClick={() => setRefresh(!refresh)}>123</Button> */}
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          <Paper elevation={3} className={classes.postIt}>
            {" "}
            <MakeReview party={party} />
          </Paper>
        </Grid>
      </Grid>
      {party.reviews ? (
        party.reviews
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
          .map((review) => {
            console.log(review.user);
            return <ReviewBox review={review} key={review._id} />;
          })
      ) : (
        <p>no reviews</p>
      )}
      {/* </Paper> */}
    </div>
  );
}

export default EventDetailView;
