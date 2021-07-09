import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { DatePicker } from "@material-ui/pickers";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Copyright from "../components/copyright";
import { useStyles } from "../components/Toolbox/cssTheme";
import { useAuth } from "../Contexts/AuthContext";

export default function SignUp() {
  const classes = useStyles();
  const { userInfo, setUserInfo, setWithExpiry } = useAuth();
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [otherError, setOtherError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [selectedDate, handleDateChange] = useState(new Date());
  const birthdayRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRegex = new RegExp(
    '^(([^<>()[]\\.,;:sW@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$'
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOtherError("");
    setEmailError("");
    setUsernameError("");
    setFirstNameError("");
    setLastNameError("");
    setPasswordError("");

    setLoading(true);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setPasswordError(`Passwords do not match`);
    }
    if (firstNameRef.current.value === "") {
      setFirstNameError("First name is required");
    }
    if (lastNameRef.current.value === "") {
      setLastNameError("Last name is required");
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s\W@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        emailRef.current.value
      )
    ) {
      setEmailError("Email is not valid");
    }
    if (
      otherError ||
      emailError ||
      usernameError ||
      passwordError ||
      firstNameError ||
      lastNameError
    ) {
      setLoading(false);
      return;
    } else {
      const newUser = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        birthday: selectedDate.toISOString(),
        reviews: [],
        own_parties: [],
      };
      fetch("http://localhost:5000/users/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(`data`, data);
          if (!data.errors) {
            setWithExpiry("token", data.token, 28800000);
            setUserInfo(data.user);
            history.push("/parties");
          } else {
            data.errors.forEach((error) => {
              if (error.param === "username") {
                setUsernameError(error.msg);
              } else if (error.param === "email") {
                setEmailError(error.msg);
              } else if (error.param === "password") {
                setPasswordError(error.msg);
              }
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          setOtherError(err);
          console.log(err);
        });
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.cork}>
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {otherError && <Alert severity="error">{otherError}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {usernameError && <Alert severity="error">{usernameError}</Alert>}
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                inputRef={usernameRef}
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(event) => {
                  if (event.target.value.length < 3) {
                    setUsernameError(
                      "username must be at least 3 characters long."
                    );
                  } else {
                    setUsernameError(null);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                inputRef={firstNameRef}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                inputRef={lastNameRef}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              {emailError && <Alert severity="error">{emailError}</Alert>}
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                // onChange={(event)=>{if(event.target.value)}}
                inputRef={emailRef}
                label="Email Address"
                name="email"
                onChange={(event) => {
                  if (
                    !/^(([^<>()\[\]\\.,;:\s\W@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                      event.target.value
                    )
                  ) {
                    setEmailError("Please enter a valid email address");
                  } else {
                    setEmailError("");
                  }
                }}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
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
              />
            </Grid>
            <Grid item xs={12}>
              {passwordError && <Alert severity="error">{passwordError}</Alert>}
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={passwordRef}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                inputRef={passwordConfirmRef}
                // autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
