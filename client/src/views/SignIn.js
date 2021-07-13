import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Copyright from "../components/copyright";
import { useStyles } from "../components/Toolbox/cssTheme";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";

export default function SignIn() {
  const { isUser, setIsUser, setWithExpiry, emailRegex } = useAuth();
  const classes = useStyles();
  const passwordRef = useRef();
  const emailRef = useRef();
  const history = useHistory();
  const { refresh, setRefresh } = useParty();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [otherError, setOtherError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(passwordRef.current.value);
    fetch("http://localhost:5000/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordRef.current.value,
        email: emailRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data1234", data);
        if (!data.errors) {
          setWithExpiry("token", data.token, 28800000);
          setIsUser(true);
          history.push("/");
          // history.go(-1);
          setLoading(false);
          setRefresh(!refresh);
          // window.location.reload();
        } else {
          data.errors.forEach((error) => {
            if (error.param === "email") {
              setEmailError(error.msg);
            } else if (error.param === "password") {
              setPasswordError(error.msg);
            } else if (error.param === "other") {
              setOtherError(error.msg);
            }
            setLoading(false);
          });
        }
      })
      .catch((err) => {
        console.log("data1234ßßßßßßß", err);
        // setOtherError(err);
        setLoading(false);
      });
  };
  const handleDisabled = () => {
    if (passwordError || emailError || loading) {
      return true;
    }
    return false;
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.cork}>
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          {otherError && <Alert severity="error">{otherError}</Alert>}
          {emailError && <Alert severity="error">{emailError}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={emailRef}
            onChange={(event) => {
              if (
                /^(([^<>()\[\]\\.,;:\s\W@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  emailRef.current.value
                )
              ) {
                setEmailError(null);
              } else {
                setEmailError("Please enter a valid Email");
              }
            }}
            autoFocus
          />
          {passwordError && <Alert severity="error">{passwordError}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
            onChange={() => {
              if (passwordRef.current.value.length < 6) {
                console.log(9);
                setPasswordError("Password must be at least 6 characters long");
              } else {
                setPasswordError(null);
              }
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={handleDisabled()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
