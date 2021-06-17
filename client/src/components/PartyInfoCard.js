import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const useStyles = makeStyles({
  partyCard: {
    maxWidth: "80%",
  },
  media: {
    height: 300,
    // display: "block",
  },
});

export default function PartyInfoCard(props) {
  const party = props.party;
  const classes = useStyles();

  return (
    <Card className={classes.partyCard}>
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

          {party.description && (
            <Typography variant="body2" color="textSecondary" component="p">
              {party.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Link to={`/parties/${party.name}`}>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
