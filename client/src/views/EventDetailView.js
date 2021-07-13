import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import MakeReview from "../components/MakeReview";
import ReviewBox from "../components/ReviewBox";
import { useStyles } from "../components/Toolbox/cssTheme";
import { webColors } from "../components/Toolbox/webcolors";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";
const { serverURL } = require("../config");

function EventDetailView(params) {
  const { refresh, setRefresh, setPartyToEdit, partyToEdit } = useParty();
  const { partyName } = useParams();
  const classes = useStyles();
  const [party, setParty] = useState({});
  const [partyDate, setPartyDate] = useState(null);
  const [reviews, setReviews] = useState();
  const { isUser, userInfo, token } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [warnOpen, setWarnOpen] = useState(false);
  const history = useHistory();
  console.log(`isUser`, isUser);
  console.log(`userInfo`, userInfo);
  console.log(`party`, party);
  // console.log(
  //   party.organizers.findIndex(
  //     (organizer) => organizer._id === userInfo._id
  //   ) === -1
  // );
  const randomColor = webColors[Math.floor(Math.random() * webColors.length)];

  const handleWarnOpen = () => {
    setWarnOpen(true);
  };

  const handleWarnClose = () => {
    setWarnOpen(false);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const reviewToDelete = {
      _id: party._id,
    };
    fetch(`${serverURL}/parties/delete`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(reviewToDelete),
    })
      .then((res) => res.json())
      .then((things) => {
        console.log(things);
        history.push("/parties");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetch(`${serverURL}/parties/${partyName}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data[0].reviews);
        setParty(data[0]);
        setPartyDate(new Date(data[0].date));
      });
  }, [refresh]);
  return (
    <div className={classes.partyDetailsRoot}>
      {/* {console.log(888888888888888888888888, reviews)} */}
      {/* <Paper elevation={8}> */}
      <Grid container justify="center" className={classes.cork} spacing={3}>
        <Grid item xs={10}>
          <Paper
            elevation={8}
            style={{
              backgroundColor:
                webColors[Math.floor(Math.random() * webColors.length)],
            }}
          >
            <Typography
              align="center"
              variant="h2"
              variantMapping={{ h2: "h1" }}
            >
              {party.name}
            </Typography>
            <br />
            <Typography variant="h3" align="center">
              {partyDate &&
                `${partyDate.toDateString()},${partyDate.getHours()}:${partyDate.getMinutes()}`}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper
            elevation={3}
            style={{
              backgroundColor:
                webColors[Math.floor(Math.random() * webColors.length)],
            }}
          >
            <Typography variant="h5" align="center">
              {party.location}
            </Typography>
          </Paper>
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
        )}{" "}
        {party.description && (
          <Grid item xs={10}>
            <Paper elevation={3} style={{ backgroundColor: `${randomColor}` }}>
              <Typography>{party.description}</Typography>
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
        )}{" "}
        {isUser &&
          party &&
          userInfo._id &&
          party.organizers &&
          party.organizers.findIndex(
            (organizer) => organizer._id === userInfo._id
          ) !== -1 && (
            <Grid Grid item xs={12}>
              <Paper elevation={3} className={classes.postIt}>
                <Link
                  to={`/parties/${party.name}/edit`}
                  onClick={() => {
                    setPartyToEdit(party);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} size={"2x"} />
                </Link>

                <IconButton aria-label="" onClick={handleWarnOpen}>
                  <FontAwesomeIcon icon={faTrashAlt} size={"1x"} />
                </IconButton>
                <Dialog
                  open={warnOpen}
                  onClose={handleWarnClose}
                  aria-labelledby="about-to-delete-party"
                  aria-describedby="about-to-delete-party"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this party?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this party?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleWarnClose} color="primary">
                      No
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Paper>
            </Grid>
          )}
      </Grid>
      <Grid container className={classes.reviewsContainer}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.postIt}>
            {" "}
            <MakeReview party={party} />
          </Paper>
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
              if (review.display === true) {
                return <ReviewBox review={review} key={review._id} />;
              }
            })
        ) : (
          <p>no reviews</p>
        )}
      </Grid>
      {/* </Paper> */}
    </div>
  );
}

export default EventDetailView;
