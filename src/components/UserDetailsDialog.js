import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography
} from "@mui/material";

const UserDetailsDialog = ({ open, handleClose, user, handleStatusChange }) => {
  const [status, setStatus] = useState(user.status);

  const handleStatusSelect = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    handleStatusChange(user.username, status);
    handleClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Username: {user.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">First Name: {user.firstName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Last Name: {user.lastName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Email: {user.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Mobile Number: {user.mobileNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Date of Birth: {user.dob}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">User Type: {user.userType}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Gender: {user.gender}</Typography>
          </Grid>

          {/* Status Dropdown */}
          <Grid item xs={12}>
            <TextField
              select
              label="Status"
              value={status}
              onChange={handleStatusSelect}
              fullWidth
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Suspend">Suspend</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsDialog;
