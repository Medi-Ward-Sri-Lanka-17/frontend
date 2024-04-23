import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import { Box, Grid, Avatar, Button, TextField } from "@mui/material";
import SideBar from "../../Component/SideBar";
import profilePicture from "./propic.png"; // Import the profile picture
import Swal from "sweetalert2"; // Import Swal for alerts
import "./Validation";
import { useAuth } from "../../Security/AuthContext";
import { retrieveProfilePicture } from "../../Services/Home/retrieveProfilePicture";
import { retrieveDetails } from "../../Services/profile/retrieveDetails";
import { UpdateUserDetails } from "../../Services/profile/UpdateUserDetails";
import { uploadProfilePicture } from "../../Services/profile/UploadProfilePicture";
import { profileDetailsValidation, passwordValidation } from "./Validation"; 

const Profile = () => {
//.......................................profile Picture Service...............................................
  const authContext = useAuth();
  const nic = authContext.nic;

  const [proImgUrl,setProImgUrl]=useState(null)

  useEffect(()=>{
    refreshPropilePicture(nic) 
 },[nic])

 async function refreshPropilePicture(nic){
      const response= await retrieveProfilePicture(nic)
      setProImgUrl(response)
 }

//......................................User Detail load Service.....................................................
  
useEffect(()=>{
  refreshUserDetails(nic) 
},[nic])

async function refreshUserDetails(nic){
    const response= await retrieveDetails(nic)
    setUserData(response)
}




  // Sample user data (replace with actual user data)
  const [userData, setUserData] = useState({
    dob: "",
    email: "",
    fullName: "",
    mobileNo: "",
    nic: "",
    position: "",
    remainingCasualLeaves: 0,
    remainingVacationLeave: 0,
    serviceStartedDate: "",
    username: ""
  });


//............................................User Details Update...................................................
const [formErrors, setFormErrors] = useState({});
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);


  // Function to handle saving changes
  const handleSaveChanges = () => {
    updateUserProDetails(userData)

  };


  async function updateUserProDetails(updateData) {
    try {
      const response = await UpdateUserDetails(updateData);
      if (response.status === 200) {
        showSuccessAlert(response.data)  
      } else {
    
        console.error("Update failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  }


  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



//...............................................Upload Profile Picture Service.......................................................

  const [selectFile,setSelectFile]=useState(null)
  
  // Function to handle profile picture selection
  const handleProfilePictureChange = (event) => {

    const file = event.target.files[0];
    console.log("Selected file:", file);
    setSelectFile(file)
    console.log(selectFile)
    setProImgUrl(URL.createObjectURL(file));

  };

  useEffect(() => {
    console.log("Updated selectFile:", selectFile);
  }, [selectFile]); 


    // Function to handle changing profile picture
    const handleChangeProfilePicture = () => {
        uploadDp(selectFile,nic)
  
    };


    async function uploadDp(selectFile,nic) {
      try {
        const response = await uploadProfilePicture(selectFile,nic);
        if (response.status === 200) {
          showSuccessAlert(response.data)  
        } else {
      
          console.error("Upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating user details:", error.message);
      }
    }

    
    


  const showSuccessAlert = (message) => {
    Swal.fire({
      text: message,
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

//...................................................Change Password..............................................................

  const toggleChangePasswordVisibility = () => {
    setChangePasswordVisible(true); // Set visibility to true
  };

  const handleChangePassword = () => {
    // Handle changing password action
    


  
    console.log("handle save changes");
    console.log(userData);
    passwordValidation
      .validate(userData, { abortEarly: false }) // Use passwordValidation here
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
        {/* Pass the profilePicture prop to the Header component */}
        <Header title="PROFILE" proImgUrl={proImgUrl} />

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
                src={proImgUrl}
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
                name="nic"
                value={userData.nic}
                onChange={handleInputChange}
              />
              <TextField
                label="Full Name"
                fullWidth
                name="fullName"
                margin="normal"
                value={userData.fullName}
                onChange={handleInputChange}
              />
              <TextField
                label="User Name"
                name="username"
                fullWidth
                margin="normal"
                value={userData.username}
                onChange={handleInputChange}
              />
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                fullWidth
                margin="normal"
                value={userData.dob}
                onChange={handleInputChange}
              />
              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                value={userData.email}
                onChange={handleInputChange}
              />
              <TextField label="Mobile Number" fullWidth margin="normal" value={userData.mobileNo} onChange={handleInputChange} />
              {/* <TextField label="Home Address" fullWidth margin="normal" value={use}/> */}
              <TextField
                label="Designation"
                name="position"
                fullWidth
                margin="normal"
                value={userData.position}
                onChange={handleInputChange}
              />
              <TextField
                label="Service Start Date"
                name="serviceStartedDate"
                type="date"
                fullWidth
                margin="normal"
                value={userData.serviceStartedDate}
                onChange={handleInputChange}
              />
              <TextField
                label="Remaining Casual Leaves"
                name="remainingCasualLeaves"
                fullWidth
                margin="normal"
                value={userData.remainingCasualLeaves}
                onChange={handleInputChange}
              />
              <TextField
                label="Remaining Vacation Leaves"
                name="remainingVacationLeave"
                fullWidth
                margin="normal"
                value={userData.remainingVacationLeave}
                onChange={handleInputChange}
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
