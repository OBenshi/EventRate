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
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  IconButton,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";
import DjsList from "../components/DjList";

function SubmitEvent() {
  const classes = useStyles();
  const { isUser, userInfo } = useAuth();
  const { djs, setDjs } = useParty();
  const djRef = useRef();
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const descriptionRef = useRef();
  const locationRef = useRef();
  const dateRef = useRef();
  //TODO const[musicalGenres,setMusicalGenres] = useState([])
  const musicalGenreRef = useRef();
  const nameRef = useRef();

  const postParty = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "eventRate");
    data.append("cloud_name", "eventrate");

    fetch("https://api.cloudinary.com/v1_1/eventrate/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImgUrl(data.url);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = () => {
    console.log(9);
  };
  //   useEffect(() => {
  //     if (imgUrl) {
  //       const postDate= new Date(Date.now())
  //       const newParty = {
  //             name: nameRef.current.value,
  //         location: locationRef.current.value,
  //             //TODO Djs array
  //             Djs: req.body.Djs,
  //             musical_genre: musicalGenreRef.current.value,
  //             rating: 0,
  //             img: imgUrl || "",
  //             description: descriptionRef.current.value,
  //         reviews: [],
  //             //TODO organizers (user)
  //             organizers: ,
  //             post_date: postDate.toISOString(),
  //             date: dateRef.current.value,
  //       };
  //     }
  //   }
  // ,[imgUrl])
  return (
    <div>
      <Grid container className={classes.cork}>
        <Typography variant="h2" align="center">
          SUBMIT A PARTY
        </Typography>
        <form className={classes.form} noValidate>
          {/*   name:location:Djs:musical_genre:rating:img:description:reviews:organizers:post_date:date: */}
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
          <Grid container xs={12}>
            <TextField
              id="musicalGenre"
              inputRef={musicalGenreRef}
              label="musical genre"
              placeholder="Musical Genre"
              rows="1"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid container>
            <TextField
              // id="djInput"
              inputRef={djRef}
              label="dj"
              placeholder="dj22"
              rows="1"
              variant="outlined"
            />
            <IconButton
              // aria-label="open drawer"
              onClick={() => {
                console.log(djRef.current.value);
                setDjs([...djs, djRef.current.value]);
                djRef.current.value = "";
                console.log(djs);
              }}
              // edge="start"
            >
              <FontAwesomeIcon icon={faPlusSquare} color="#ffffff" />
            </IconButton>
            <DjsList />
          </Grid>
          {/* <DatePicker
            disableFuture
            variant="outlined"
            fullWidth
            id="birthdate"
            inputRef={birthdayRef}
            openTo="year"
            format="dd/MM/yyyy"
            label="Date of birth"
            views={["year", "month", "date"]}
            value={selectedDate}
            onChange={handleDateChange}
          /> */}
          <Paper style={{ padding: 5, margin: 5 }}>
            <label forhtml="image">Upload Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Paper>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={postParty}
            // disabled={loading}
          >
            Sign Up
          </Button>
        </form>
      </Grid>
    </div>
  );
}
export default SubmitEvent;
