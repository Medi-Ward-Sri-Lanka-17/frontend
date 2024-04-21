// Existing imports...
import React, { useState } from "react";
import Header from "../../Component/Header";
import { Box, Grid, Avatar, Button, TextField } from "@mui/material";
import SideBar from "../../Component/SideBar";
import profilePicture from "./propic.png";
import Swal from "sweetalert2";
import validationSchema from "./Validation";

const Profile = () => {
  // Sample user data (replace with actual user data)
  const [userData, setUserData] = useState({
    nicNumber: "199922900820",
    fullName: "Pushpa Silva",
    userName: "Pushpa",
    dateOfBirth: "1999-08-16",
    email: "",
    mobileNumber: "0779201111",
    address: "No:1,Kotuwegoda, Matara",
    position: "Nurse",
    serviceStartDate: "2020-01-01",
    remainingCasualLeaves: 5,
    remainingVacationLeaves: 10,
    profilePicture: profilePicture,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    setUserData({ ...userData, profilePicture: URL.createObjectURL(file) });
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      text: message,
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  const handleChangeProfilePicture = () => {
    showSuccessAlert("You have successfully updated the profile picture!");
  };

  const toggleChangePasswordVisibility = () => {
    setChangePasswordVisible(true); // Set visibility to true
  };

  const handleChangePassword = () => {
    console.log("handle save changes");
    console.log(userData);
    validationSchema
      .validate(userData, { abortEarly: false })
      .then(() => {
        showSuccessAlert("You have successfully changed the profile details!");
        setFormErrors({});
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormErrors(errors);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <div className="PageContent" style={{ width: "100%" }}>
        <Header title="PROFILE" profilePicture={userData.profilePicture} />
        <Grid container spacing={4}>
          <Grid item xs={6}>
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
                onClick={toggleChangePasswordVisibility}
                sx={{ mt: 1 }}
              >
                Change Password
              </Button>
              {changePasswordVisible && (
                <Box>
                  <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={userData.currentPassword}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        currentPassword: e.target.value,
                      })
                    }
                    error={formErrors.hasOwnProperty("currentPassword")}
                    helperText={formErrors["currentPassword"]}
                  />
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={userData.newPassword}
                    onChange={(e) =>
                      setUserData({ ...userData, newPassword: e.target.value })
                    }
                    error={formErrors.hasOwnProperty("newPassword")}
                    helperText={formErrors["newPassword"]}
                  />
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={userData.confirmNewPassword}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        confirmNewPassword: e.target.value,
                      })
                    }
                    error={formErrors.hasOwnProperty("confirmNewPassword")}
                    helperText={formErrors["confirmNewPassword"]}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleChangePassword}
                    sx={{ mt: 2 }}
                  >
                    Confirm Password Change
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <TextField
                label="NIC Number"
                fullWidth
                margin="normal"
                value={userData.nicNumber}
                error={formErrors.hasOwnProperty("nicNumber")}
                helperText={formErrors["nicNumber"]}
              />
              <TextField
                label="Full Name"
                fullWidth
                margin="normal"
                value={userData.fullName}
                error={formErrors.hasOwnProperty("fullName")}
                helperText={formErrors["fullName"]}
              />
              <TextField
                label="User Name"
                fullWidth
                margin="normal"
                value={userData.userName}
                error={formErrors.hasOwnProperty("userName")}
                helperText={formErrors["userName"]}
              />
              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                margin="normal"
                value={userData.dateOfBirth}
                error={formErrors.hasOwnProperty("dateOfBirth")}
                helperText={formErrors["dateOfBirth"]}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={userData.email}
                error={formErrors.hasOwnProperty("email")}
                helperText={formErrors["email"]}
              />
              <TextField
                label="Mobile Number"
                fullWidth
                margin="normal"
                value={userData.mobileNumber}
                error={formErrors.hasOwnProperty("mobileNumber")}
                helperText={formErrors["mobileNumber"]}
              />
              <TextField
                label="Home Address"
                fullWidth
                margin="normal"
                value={userData.address}
                error={formErrors.hasOwnProperty("address")}
                helperText={formErrors["address"]}
              />
              <TextField
                label="Designation"
                fullWidth
                margin="normal"
                value={userData.position}
                error={formErrors.hasOwnProperty("position")}
                helperText={formErrors["position"]}
              />
              <TextField
                label="Service Start Date"
                type="date"
                fullWidth
                margin="normal"
                value={userData.serviceStartDate}
                error={formErrors.hasOwnProperty("serviceStartDate")}
                helperText={formErrors["serviceStartDate"]}
              />
              <TextField
                label="Remaining Casual Leaves"
                fullWidth
                margin="normal"
                value={userData.remainingCasualLeaves}
                error={formErrors.hasOwnProperty("remainingCasualLeaves")}
                helperText={formErrors["remainingCasualLeaves"]}
              />
              <TextField
                label="Remaining Vacation Leaves"
                fullWidth
                margin="normal"
                value={userData.remainingVacationLeaves}
                error={formErrors.hasOwnProperty("remainingVacationLeaves")}
                helperText={formErrors["remainingVacationLeaves"]}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
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
