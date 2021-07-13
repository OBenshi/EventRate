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
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Copyright from "../components/copyright";
import { useStyles } from "../components/Toolbox/cssTheme";
import { useAuth } from "../Contexts/AuthContext";
const serverURL = require("../config");
export default function ManageProfile() {
  const classes = useStyles();
  const { userInfo, setUserInfo, setWithExpiry, token } = useAuth();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOtherError(null);
    setEmailError(null);
    setUsernameError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setPasswordError(null);

    setLoading(true);
    if (passwordRef.current.value !== "") {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        setPasswordError(`Passwords do not match`);
      }
    }
    if (emailRef.current.value !== "") {
      if (
        !/^(([^<>()\[\]\\.,;:\s\W@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          emailRef.current.value
        )
      ) {
        setEmailError("Email is not valid");
      }
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
      const updatedUser = {
        username:
          usernameRef.current.value !== "" && usernameRef.current.value
            ? usernameRef.current.value
            : userInfo.username,
        email:
          emailRef.current.value !== "" && emailRef.current.value
            ? emailRef.current.value
            : userInfo.email,
        password:
          passwordRef.current.value !== "" && passwordRef.current.value
            ? passwordRef.current.value
            : userInfo.password,
        firstName:
          firstNameRef.current.value !== "" && firstNameRef.current.value
            ? firstNameRef.current.value
            : userInfo.firstName,
        lastName:
          lastNameRef.current.value !== "" && lastNameRef.current.value
            ? lastNameRef.current.value
            : userInfo.lastName,
      };
      console.log(`updatedUser`, updatedUser);

      fetch(`${serverURL}/users/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(updatedUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.errors) {
            setUserInfo(data.user);
            history.push("/");
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
        .catch((error) => {
          console.error(error);
        });

      setLoading(false);
      return;
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.cork}>
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Manage Profile
        </Typography>
        <Typography
          component="h5"
          variant="h5"
          color="secondary"
          align="center"
        >
          Leave blank to keep current settings
        </Typography>
        {otherError && <Alert severity="error">{otherError}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {usernameError && <Alert severity="error">{usernameError}</Alert>}
              <Typography>
                Your current username address is&nbsp;
                <Typography component="span" color="secondary">
                  {userInfo.username}
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="usernameManage"
                inputRef={usernameRef}
                label="Username"
                name="username"
                autoComplete="username"
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
              <Typography>
                Your current email address is {userInfo.email}
              </Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                inputRef={emailRef}
                label="Email Address"
                name="email"
                autoComplete="email"
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
            Update
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
