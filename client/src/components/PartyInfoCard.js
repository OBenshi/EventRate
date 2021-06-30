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

export default function PartyInfoCard(props) {
  const party = props.party;
  const classes = useStyles();
  const [averagePopularity, setAveragePopularity] = useState(0);

  const calcPartyRating = (party) => {
    const initialVals = { avg: 0, n: 0 };
    setAveragePopularity(party.reviews.reduce(averageScores, initialVals).avg);
    console.log("Average popularity:", averagePopularity);
  };
  useEffect(() => {
    calcPartyRating(party);
  }, []);
  return (
    <Card
      className={`${classes.partyCard} ${classes.cork}`}
      id={`${party.name}InfoCard`}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={party.img}
          title={party.name}
        />
        <CardContent>
          <Link to={`/parties/${party.name}`}>
            <Typography gutterBottom variant="h5" component="h3">
              {party.name}
            </Typography>
          </Link>
          <h1>{averagePopularity && averagePopularity}</h1>
          {party.description && (
            <Typography variant="body2" color="textSecondary" component="p">
              {`${party.description.substring(0, 150)}...`}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container align="center">
          <Button size="small" color="primary">
            Share
          </Button>
          <Link to={`/parties/${party.name}`}>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </Link>
        </Grid>
      </CardActions>
    </Card>
  );
}
