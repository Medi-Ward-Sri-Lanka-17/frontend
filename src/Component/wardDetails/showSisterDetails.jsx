import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const StaffDetailsForm = ({ open, handleClose, initialSisterName }) => {
  const [sisterName, setSisterName] = useState(initialSisterName || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    // Handle saving data or any other logic here
    console.log("Saved data:", { sisterName, phoneNumber, email });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Staff Details</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            label="Sister Name"
            name="sisterName"
            value={sisterName}
            fullWidth
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <Button color="primary" variant="outlined" onClick={handleSave}>
            Save
          </Button>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StaffDetailsForm;
