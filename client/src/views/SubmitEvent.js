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
import { Link, useHistory } from "react-router-dom";
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
import GenreList from "../components/GenreList";
import { DateTimePicker } from "@material-ui/pickers";

function SubmitEvent() {
  const classes = useStyles();
  const { isUser, userInfo, token } = useAuth();
  const history = useHistory();
  const { djs, setDjs, musicalGenres, setMusicalGenres } = useParty();
  // setDjs([]);
  const djRef = useRef();
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const descriptionRef = useRef();
  const locationRef = useRef();
  const partyDateRef = useRef();
  const [selectedDate, handleDateChange] = useState(new Date());
  //TODO const[musicalGenres,setMusicalGenres] = useState([])
  const musicalGenreRef = useRef();
  // const [musicalGenres, setMusicalGenres] = useParty();
  const nameRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    //  await postPartyImg();
    console.log(`selectedDate`, selectedDate.toISOString());
    // if (imgUrl) {
    const postDate = new Date(Date.now());
    const newParty = {
      name: nameRef.current.value,
      location: locationRef.current.value,
      Djs: djs,
      musical_genre: musicalGenres,
      rating: 0,
      img: imgUrl,
      description: descriptionRef.current.value,
      reviews: [],
      // TODO organizers (user)
      organizers: [userInfo._id],
      post_date: postDate.toISOString(),
      date: selectedDate.toISOString(),
      display: true,
    };
    fetch("http://localhost:5000/parties/new", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newParty),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`data`, data);
        history.push(`/parties/${newParty.name}`);
      })
      .catch((err) => {
        // setLoading(false);

        // setOtherError(err);
        console.log(err);
      });

    // setLoading(false);

    // }
  };
  useEffect(() => {
    // event.preventDefault();
    if (image !== "") {
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
          console.log("pic data", data);
          setImgUrl(data.url);
        })
        .catch((err) => console.error(err));
    }
  }, [image]);

  useEffect(() => {
    setDjs([]);
    setMusicalGenres([]);
  }, []);

  // getImgURL
  return (
    <div>
      <Grid container className={classes.cork}>
        <Typography variant="h2" align="center">
          SUBMIT A PARTY
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container>
            <Grid container align="center">
              <Grid item xs={12}>
                <Typography color="secondary"> Party name:</Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="partyName"
                  inputRef={nameRef}
                  label="Party name"
                  placeholder="Party name"
                  // multiline
                  rows="1"
                  fullWidth
                  // variant="standard"
                />{" "}
              </Grid>
            </Grid>
            <TextField
              id="partyDescription"
              inputRef={descriptionRef}
              label="Party description"
              placeholder="Party description"
              multiline
              rows="10"
              fullWidth
              variant="outlined"
            />
            <TextField
              id="partyLocation"
              inputRef={locationRef}
              label="Party location"
              placeholder="Party location"
              rows="1"
              // fullWidth
              variant="outlined"
            />
            <Grid container direction="row" justify="center">
              <Grid item>
                <TextField
                  // id="djInput"
                  inputRef={musicalGenreRef}
                  label="Musical Genres"
                  placeholder="Techno,House,Polka etc..."
                  rows="1"
                  variant="outlined"
                />
                <IconButton
                  // aria-label="open drawer"
                  onClick={() => {
                    // console.log(djRef.current.value);
                    setMusicalGenres([
                      ...musicalGenres,
                      musicalGenreRef.current.value,
                    ]);
                    musicalGenreRef.current.value = "";
                    // console.log(djs);
                  }}
                  // edge="start"
                >
                  <FontAwesomeIcon icon={faPlusSquare} color="#ffffff" />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <GenreList />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center">
              <Grid item>
                <TextField
                  // id="djInput"
                  inputRef={djRef}
                  label="Dj"
                  placeholder="Dj"
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
              </Grid>
              <Grid item xs={6}>
                <DjsList />
              </Grid>
            </Grid>
            <DateTimePicker
              disablePast
              variant="outlined"
              fullWidth
              // id="birthdate"
              inputRef={partyDateRef}
              // openTo="year"
              // format="dd/MM/yyyy"
              label="Party Date"
              // views={["year", "month", "date", "time"]}
              value={selectedDate}
              onChange={handleDateChange}
            />
            <Paper style={{ padding: 5, margin: 5 }}>
              <label forhtml="image">Upload Image</label>
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  // postPartyImg();
                }}
              />
            </Paper>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              // disabled={loading}
            >
              Submit Party
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
}
export default SubmitEvent;
