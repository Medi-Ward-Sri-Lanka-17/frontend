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
import { validationSchema } from "./Validation";
import Theme from "../../Component/Theme";
import { th } from "date-fns/locale";
import { useFormik } from "formik";
import { changePassword } from "../../Services/profile/changePassword";

const theme = Theme();

const Profile = () => {

  
//.......................................profile Picture Service...............................................
  const authContext = useAuth();
  const nic = authContext.nic;
  const uname=authContext.username;

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
          showErrorAlert(response.data)
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

  const showErrorAlert = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      confirmButtonColor: "#243e4f",
    });
  };

//...................................................Change Password..............................................................

  const toggleChangePasswordVisibility = () => {
    setChangePasswordVisible(true); // Set visibility to true
  };



  const initialValues={
    currentPassword:"",
    newPassword:"",
    confirmPassword:"",
    username:uname
  };

  async function onSubmit(){
    try {
      const response = await changePassword(formik.values,nic);
      if (response.status === 200) {
        showSuccessAlert(response.data)  
      } else {
        showErrorAlert(response.data)
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error Chnaging password:", error.message);
      showErrorAlert("Your Current Password is Incorrect")
    }

  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });


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
                sx={{ 
                  mt: 1,
                  backgroundColor:"#243E4F",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              >
                Change Password
              </Button>
              {changePasswordVisible && (
                <Box sx={{width:"75%"}}>
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      label="Current Password"
                      type="password"
                      name="currentPassword"
                      fullWidth
                      margin="normal"
                      value={formik.values.currentPassword}
                      onChange={formik.handleChange}
                      helperText={formik.errors.currentPassword}
                      FormHelperTextProps={{
                        style:{color:theme.palette.error.main}
                      }}
                    />
                    <TextField
                      label="New Password"
                      type="password"
                      name="newPassword"
                      fullWidth
                      margin="normal"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      helperText={formik.errors.newPassword}
                      FormHelperTextProps={{
                        style:{color:theme.palette.error.main}
                      }}
                    />
                    <TextField
                      label="Confirm New Password"
                      type="password"
                      name="confirmPassword"
                      fullWidth
                      margin="normal"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      helperText={formik.errors.confirmPassword}
                      FormHelperTextProps={{
                        style:{color:theme.palette.error.main}
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ 
                        mt: 2,
                        backgroundColor:theme.palette.primary.main,
                        ":hover":{
                          backgroundColor:theme.palette.secondary.main
                        }
                      }}
                    >
                      Confirm Password Change
                    </Button>
                  </form>
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
                disabled
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
                disabled
                onChange={handleInputChange}
              />
              <TextField
                label="Service Start Date"
                name="serviceStartedDate"
                type="date"
                fullWidth
                margin="normal"
                value={userData.serviceStartedDate}
                disabled
                onChange={handleInputChange}
              />
              <TextField
                label="Remaining Casual Leaves"
                name="remainingCasualLeaves"
                fullWidth
                margin="normal"
                value={userData.remainingCasualLeaves}
                disabled
                onChange={handleInputChange}
              />
              <TextField
                label="Remaining Vacation Leaves"
                name="remainingVacationLeave"
                fullWidth
                margin="normal"
                value={userData.remainingVacationLeave}
                disabled
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                sx={{ 
                  mt: 2,
                  backgroundColor:theme.palette.primary.main,
                  ":hover":{
                    backgroundColor:theme.palette.secondary.main
                  }
                
                }}
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
