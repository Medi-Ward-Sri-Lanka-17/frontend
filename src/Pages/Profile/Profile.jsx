import React, { useState } from "react";
import Header from "../../Component/Header";
import { Box, Grid, Avatar, Button, TextField } from "@mui/material";
import SideBar from "../../Component/SideBar";
import profilePicture from "./propic.png"; // Import the profile picture
import Swal from "sweetalert2"; // Import Swal for alerts
import "./Validation";

const Profile = () => {
  // Sample user data (replace with actual user data)
  const [userData, setUserData] = useState({
    nicNumber: "199922900820",
    dateOfBirth: "1999-08-16",
    position: "Nurse",
    serviceStartDate: "2020-01-01",
    remainingCasualLeaves: 5,
    remainingVacationLeaves: 10,
    profilePicture: profilePicture, // Use the imported profile picture
  });

  // Function to handle profile picture selection
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file
    console.log("Selected file:", file);
    // Update profile picture in state
    setUserData({ ...userData, profilePicture: URL.createObjectURL(file) });
  };

  // Function to show success alert
  const showSuccessAlert = (message) => {
    Swal.fire({
      text: message,
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  // Function to handle changing profile picture
  const handleChangeProfilePicture = () => {
    // Simulating profile picture change
    showSuccessAlert("You have successfully updated the profile picture!");
  };

  // Function to handle changing password
  const handleChangePassword = () => {
    // Handle changing password action
    console.log("Change password clicked");
  };

  // Function to handle saving changes
  const handleSaveChanges = () => {
    // Handle saving changes action
    showSuccessAlert("You have successfully changed the profile details!");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <div className="PageContent" style={{ width: "100%" }}>
        {/* Pass the profilePicture prop to the Header component */}
        <Header title="PROFILE" profilePicture={userData.profilePicture} />

        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={6}>
            {/* Profile Picture Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={userData.name}
                src={userData.profilePicture}
                sx={{ width: 150, height: 150 }}
              />
              <Box sx={{ mt: 1 }}>
                <Button variant="outlined" component="label">
                  Select Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: "none" }}
                  />
                </Button>
              </Box>
              <Button
                variant="outlined"
                onClick={handleChangeProfilePicture}
                sx={{ mt: 1 }}
              >
                Update Profile Picture
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
                sx={{ mt: 1 }}
              >
                Change Password
              </Button>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={6}>
            {/* Profile Information Section */}
            <Box>
              <TextField
                label="NIC Number"
                fullWidth
                margin="normal"
                value={userData.nicNumber}
              />
              <TextField
                label="Full Name"
                fullWidth
                margin="normal"
                value={userData.name}
              />
              <TextField
                label="User Name"
                fullWidth
                margin="normal"
                value={userData.name}
              />
              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                margin="normal"
                value={userData.dateOfBirth}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={userData.email}
              />
              <TextField label="Mobile Number" fullWidth margin="normal" />
              <TextField label="Home Address" fullWidth margin="normal" />
              <TextField
                label="Designation"
                fullWidth
                margin="normal"
                value={userData.position}
              />
              <TextField
                label="Service Start Date"
                type="date"
                fullWidth
                margin="normal"
                value={userData.serviceStartDate}
              />
              <TextField
                label="Remaining Casual Leaves"
                fullWidth
                margin="normal"
                value={userData.remainingCasualLeaves}
              />
              <TextField
                label="Remaining Vacation Leaves"
                fullWidth
                margin="normal"
                value={userData.remainingVacationLeaves}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Profile;
