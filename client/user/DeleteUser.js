import React, { useState } from "react";
import authHelper from "../auth/auth-helper";
import { remove } from "lodash";
import { Navigate } from "react-router";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Button
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import PropTypes from "prop-types";

const DeleteUser = (props) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const jwt = authHelper.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const deleteAccount = () => {
    remove({ userId: props.userId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        authHelper.clearJwt(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <span>
      <IconButton aria-label="delete" onClick={clickButton} color="secondary">
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default DeleteUser;
