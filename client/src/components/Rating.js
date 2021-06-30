import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

export function CustomizedRatings() {
  return (
    <StyledRating
      name="partyRating"
      defaultValue={4}
      getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
      precision={0.5}
      icon={<FavoriteIcon fontSize="default" />}
      //   readOnly={true}
      onChange={(event) => console.log(event.target.value)}
    />
  );
}
