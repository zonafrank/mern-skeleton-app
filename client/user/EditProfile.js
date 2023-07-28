import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  Icon,
  TextField,
  Typography,
  makeStyles,
  CardContent
} from "@material-ui/core";
import authHelper from "../auth/auth-helper";
import apiUser from "./api-user";
import { Navigate, useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: "middle"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2)
  }
}));

const EditProfile = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false
  });

  const params = useParams();

  const jwt = authHelper.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    apiUser
      .read({ userId: params.userId }, { t: jwt.token }, signal)
      .then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, name: data.name, email: data.email });
        }
      });

    return () => {
      abortController.abort();
    };
  }, [params.userId]);

  const submitClick = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    };

    apiUser
      .update({ userId: params.userId }, { t: jwt.token }, user)
      .then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, userId: data._id, redirectToProfile: true });
        }
      });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCancelClick = () => {
    setValues({ ...values, redirectToProfile: true, userId: params.userId });
  };

  if (values.redirectToProfile) {
    return <Navigate to={`/user/${values.userId}`} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          onChange={handleChange("name")}
          margin="normal"
          value={values.name}
        />
        <br />
        <TextField
          id="email"
          label="Email"
          type="email"
          className={classes.textField}
          onChange={handleChange("email")}
          margin="normal"
          value={values.email}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          className={classes.textField}
          onChange={handleChange("password")}
          margin="normal"
          value={values.password}
        />
        <br />
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          className={classes.submit}
          onClick={submitClick}
        >
          Submit
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className={classes.submit}
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProfile;
