import React, { useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

const SnackbarService = ({ snackbar, snackbarMsg }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("something went wrong");

  //set props value
  useEffect(() => {
    setOpen(snackbar);
    setMessage(snackbarMsg);
  }, [snackbar]);

  //close the snackbar
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    >
    </Snackbar>
  );
};

export default SnackbarService;
