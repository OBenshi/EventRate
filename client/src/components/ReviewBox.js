import {
  Paper,
  Typography,
  Grid,
  Divider,
  IconButton,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, useRef } from "react";
import { useStyles } from "./Toolbox/cssTheme";
import { webColors } from "./Toolbox/webcolors";
// import { randomColor } from "./Toolbox/Toolbox";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useAuth } from "../Contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPaperPlane,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useParty } from "../Contexts/PartyContext";
const { serverURL } = require("../config");
const ReviewBox = (props) => {
  const classes = useStyles();
  const review = props.review;
  const [rating, setRating] = useState(review.rating);
  const ratingRef = useRef();
  const { refresh, setRefresh } = useParty();
  const [reviewText, setReviewText] = useState(review.text);
  const { isUser, userInfo, token } = useAuth();
  const [ownComment, setOwnComment] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // console.log(review);
  const randomColor = webColors[Math.floor(Math.random() * webColors.length)];
  const reviewDate = new Date(review.date);
  const StyledRating = withStyles({
    iconFilled: {
      color: "#ff6d75",
    },
    iconHover: {
      color: "#ff3d47",
    },
  })(Rating);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const editedReview = {
      _id: review._id,
      rating: rating,
      text: reviewText,
    };
    fetch(`${serverURL}/reviews/edit`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(editedReview),
    })
      .then((res) => res.json())
      .then((things) => {
        console.log(things);
        // setRefresh(!refresh);
      })
      .then(setEditMode(false))
      .then(setRefresh(!refresh))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const reviewToDelete = {
      _id: review._id,
    };
    fetch("http://localhost:5000/reviews/delete", {
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
        // setRefresh(!refresh);
      })
      .then(setEditMode(false))
      .then(setRefresh(!refresh))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = () => console.log("handleChange");

  useEffect(() => {
    if (isUser) {
      if (userInfo._id === review.user._id) {
        setOwnComment(true);
      }
    }
  });
  return (
    <Paper
      className={classes.ReviewBox}
      style={{ backgroundColor: `${randomColor}` }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="space-around">
            <Grid item>
              <Typography>{review.user.username}</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {reviewDate.toLocaleTimeString()}&nbsp;&nbsp;
                {reviewDate.toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid>
              <StyledRating
                name={`${review._id},${review.user._id}`}
                defaultValue={review.rating}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="default" />}
                onChange={(event) => {
                  console.log(`event.target.value`, event.target.value);
                  setRating(event.target.value);
                }}
                readOnly={!editMode}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" light={true} />
      <Grid container align="center">
        <Grid item xs={12}>
          {!editMode ? (
            <Typography>{review.text}</Typography>
          ) : (
            <TextareaAutosize
              id="reviewTextarea"
              label="Review Text"
              className={classes.reviewEditText}
              aria-label="review"
              // fullWidth={true}
              // inputRef={textRef}
              onChange={(event) => setReviewText(event.target.value)}
              defaultValue={review.text}
            />
          )}
        </Grid>
        {ownComment && (
          <Grid item xs={12} align="right">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </IconButton>
            <IconButton aria-label="edit" onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
            {editMode && (
              <IconButton aria-label="submit" onClick={handleEditSubmit}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </IconButton>
            )}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default ReviewBox;
