import React, { useEffect, useState } from "react";
import { averageScores } from "./Toolbox/Toolbox";
import {
  Button,
  Typography,
  CardActionArea,
  CardActions,
  CardContent,
  Card,
  CardMedia,
  Grid,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useStyles } from "./Toolbox/cssTheme";
import { useParty } from "../Contexts/PartyContext";

export default function PartyInfoCard(props) {
  const party = props.party;
  const classes = useStyles();
  const [averagePopularity, setAveragePopularity] = useState(0);
  const { refresh, setRefresh } = useParty();

  // const calcPartyRating = (party) => {
  //   const initialVals = { avg: 0, n: 0 };
  //   setAveragePopularity(party.reviews.reduce(averageScores, initialVals).avg);
  //   console.log("Average popularity:", averagePopularity);
  // };
  useEffect(() => {
    // calcPartyRating(party);
  }, [refresh]);
  const PartyPic = party.img;
  return (
    <Card
      className={`${classes.partyCard} ${classes.cork}`}
      id={`${party.name}InfoCard`}
    >
      <CardActionArea>
        {PartyPic && (
          <CardMedia
            className={classes.media}
            image={PartyPic}
            title={party.name}
          />
        )}
        <CardContent>
          <Link to={`/parties/${party.name}`} className={classes.navlink}>
            <Typography gutterBottom color="textSecondary" variant="h4">
              {party.name}
            </Typography>
          </Link>
          {/* <h1>{averagePopularity && averagePopularity}</h1> */}
          {party.description && (
            <Typography variant="body2" color="textPrimary">
              {`${party.description.substring(0, 150)}...`}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="center">
          <Link to={`/parties/${party.name}`}>
            <Button size="small" color="primary">
              <Typography color="primary" align="center">
                LEARN MORE
              </Typography>
            </Button>
          </Link>
        </Grid>
      </CardActions>
    </Card>
  );
}
