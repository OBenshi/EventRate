import { Paper, Typography, Grid, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { useStyles } from "./Toolbox/cssTheme";
import { webColors } from "./Toolbox/webcolors";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
const ReviewBox = (props) => {
  const classes = useStyles();
  const review = props.review;
  console.log(review);
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

  return (
    <Paper style={{ backgroundColor: `${randomColor}` }}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="space-around">
            <Grid item>
              <Typography>{review.user.name}</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {reviewDate.toLocaleTimeString()}&nbsp;&nbsp;
                {reviewDate.toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid>
              <StyledRating
                name="partyRating"
                defaultValue={review.rating}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="default" />}
                readOnly
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" light={true} />
      <Grid container align="center">
        <Grid item xs={12}>
          <Typography>{review.text}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReviewBox;
