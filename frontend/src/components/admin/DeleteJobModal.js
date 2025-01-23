import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Divider, Typography } from "@mui/material";

const DeleteJobModal = ({ open, onClose, onDelete, jobId }) => {
  // Handle the modal close
  const handleClose = () => {
    onClose(); // Close the modal when clicking outside or cancel
  };

  // Handle the delete action
  const handleDelete = () => {
    onDelete(jobId); // Pass jobId to the onDelete function when deleting
    onClose(); // Close the modal after deletion
  };

  return (
    <>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Job <strong>{jobId}</strong></DialogTitle>
      <Divider/> 
      <DialogContent>
        <Typography>Are you sure you want to <strong>DELETE</strong> this job? This action <strong>CANNOT</strong> be undone and all associated applicants with this job will also be <strong>DELETED</strong>.</Typography>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>

    </>
  );
};

export default DeleteJobModal;
