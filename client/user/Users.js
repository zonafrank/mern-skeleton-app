import React, { useEffect, useState } from "react";
import apiUserService from "./api-user";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ArrowForward, Person } from "@material-ui/icons";
import useStyles from "../hooks/useStyles";

const Users = () => {
  const [users, setUsers] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    apiUserService.list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((user, i) => {
          return (
            <Link key={i} to={`/user/${user._id}`}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
};

export default Users;
