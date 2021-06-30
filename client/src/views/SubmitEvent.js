//==================================================
//
//*   ####  ##   ##  #####   ###    ###  ##  ######
//*  ##     ##   ##  ##  ##  ## #  # ##  ##    ##
//*   ###   ##   ##  #####   ##  ##  ##  ##    ##
//*     ##  ##   ##  ##  ##  ##      ##  ##    ##
//*  ####    #####   #####   ##      ##  ##    ##
//
//*  #####  ##   ##  #####  ##     ##  ######
//*  ##     ##   ##  ##     ####   ##    ##
//*  #####  ##   ##  #####  ##  ## ##    ##
//*  ##      ## ##   ##     ##    ###    ##
//*  #####    ###    #####  ##     ##    ##
//
//==================================================

import React, { useEffect, useState, useRef } from "react";
import { useStyles } from "../components/Toolbox/cssTheme";
import { TextField } from "@material-ui/core";

/*   name: req.body.name,
    location: req.body.location,
    Djs: req.body.Djs,
    musical_genre: req.body.musical_genre,
    rating: req.body.rating,
    img: req.body.img || "",
    description: req.body.description,
    reviews: req.body.reviews,
    organizers: req.body.organizers,
    post_date: req.body.post_date,
    date: req.body.date,
    */
function SubmitEvent() {
  const classes = useStyles();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const date = useRef();

  const handleSubmit = () => {
    console.log(9);
  };
  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        kjkjhljkhkjb
        <TextField
          id="partyDescription"
          inputRef={descriptionRef}
          label="Party description"
          placeholder="Party description"
          multiline
          rows="10"
          fullWidth
          variant="outlined"
        />{" "}
        <TextField
          id="partyLocation"
          inputRef={locationRef}
          label="Party location"
          placeholder="Party location"
          rows="1"
          // fullWidth
          variant="outlined"
        />
      </form>
    </div>
  );
}
export default SubmitEvent;
