import React, { useState } from "react";
import Header from "../../Component/Header";
import { Box, Avatar, Button, TextField } from "@mui/material";
import SideBar from "../../Component/SideBar";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import profilePicture from "./propic.jpg"; // Import the profile picture
import Swal from "sweetalert2";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(profilePicture);

  // Sample user data (replace with actual user data)
  const initialValues = {
    nicNumber: "199922900820",
    firstName: "Sajad",
    lastName: "Deen",
    fullName: "Sajad Deen",
    nameWithInitials: "S. Deen",
    email: "sajadmaxlenovo@gmail.com",
    whatsappNumber: "+94(0)769201262",
    homeAddress: " Kotuwegoda, Matara, Sri Lanka",
  };

  const validationSchema = Yup.object().shape({
    nicNumber: Yup.string().required("NIC Number is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    fullName: Yup.string().required("Full Name is required"),
    nameWithInitials: Yup.string().required("Name with Initials is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    whatsappNumber: Yup.string().required("WhatsApp/Mobile Number is required"),
    homeAddress: Yup.string().required("Home Address is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Submit logic goes here
    console.log(values);
    showSuccessAlert(); // Show success alert
    setSubmitting(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      text: "Profile Details Successfully Saved!",
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <div className="PageContent" style={{ width: "100%" }}>
        <Header title="PROFILE" />
        {/* Formik form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Two-column layout using Flexbox */}
              <Box sx={{ display: "flex" }}>
                {/* Left Column */}
                <Box sx={{ flex: 1, padding: 2 }}>
                  {/* Profile Picture */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Avatar
                      alt="Profile Picture"
                      src={profileImage}
                      sx={{ width: 150, height: 150 }}
                    />
                  </Box>
                  {/* User Name */}
                  <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                    <div>Sajad Deen</div>
                    {/* Edit Profile Picture Button */}
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        sx={{ marginTop: 1 }}
                      >
                        Change Profile Picture
                      </Button>
                    </label>
                  </Box>
                </Box>
                {/* Right Column */}
                <Box sx={{ flex: 2, padding: 2 }}>
                  {/* Form fields */}
                  <Field
                    name="nicNumber"
                    label="NIC Number"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  />
                  <Field
                    name="firstName"
                    label="First Name"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  />
                  <Field
                    name="lastName"
                    label="Last Name"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  />
                  <Field
                    name="fullName"
                    label="Full Name"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  />
                  <Field
                    name="nameWithInitials"
                    label="Name with Initials"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  />
                  <Field
                    name="email"
                    label="Email"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  />
                  <Field
                    name="whatsappNumber"
                    label="WhatsApp/Mobile Number"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  />
                  <Field
                    name="homeAddress"
                    label="Home Address"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  />
                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Box>
  );
};

export default Profile;
