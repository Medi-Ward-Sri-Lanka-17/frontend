import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { addSisterValidation } from "../../Validation/wardDetailsValidation";
import { useAuth } from "../../Security/AuthContext";
import { retrieveSisterDetails } from "../../Services/WardDetails/WardDetailsServices";
import { sendEditedSisterDetailsForMatron } from "../../Services/WardDetails/WardDetailsServices";

const StaffDetailsForm = ({ open, handleClose, sisterWardNo, isPressMore }) => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    nic: "",
    birthdate: "",
    email: "",
    position: "Sister",
    leaveNo: "",
    mobileNo: "",
    serviceStartDate: "",
  });

  const [loggedUserPosition, setLoggedUserPosition] = useState("");
  const [editMode, setEditMode] = useState(false); // State variable for edit mode

  const authContext = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedPositionData = authContext.position;
        setLoggedUserPosition(loggedPositionData);
        if (isPressMore === true) {
          const sisterData = await retrieveSisterDetails(sisterWardNo);
          console.log(sisterData);
          setFormValues({
            ...sisterData,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [isPressMore]);

  const handleEdit = async () => {
    try {
      setEditMode(!editMode);
      if (isPressMore === true && loggedUserPosition === "Matron") {
        const sisterData2 = await retrieveSisterDetails(sisterWardNo);
        setFormValues({
          ...sisterData2,
        });
      }
    } catch (error) {
      console.error("Error during handleEdit:", error);
    }
  };

  const showSuccessAlert = () => {
    let alertText = "";
    if (loggedUserPosition === "Sister") {
      alertText = "Your details successfully updated";
    } else {
      alertText = "Sister details successfully updated";
    }
    handleClose();
    Swal.fire({
      text: alertText,
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  const showErrorAlert = () => {
    let alertText = "";
    if (loggedUserPosition === "Sister") {
      alertText = "Your details update failed";
    } else {
      alertText = "Sister details update failed";
    }
    Swal.fire({
      text: alertText,
      icon: "warning",
      confirmButtonColor: "#243e4f",
    });
  };

  const manualSubmit = async () => {
    try {
      sisterFormik.handleSubmit();

      const valuesToUpdate = sisterFormik.values;

      if (loggedUserPosition === "Matron") {
        const response = await sendEditedSisterDetailsForMatron(valuesToUpdate);
        if (response == true) {
          showSuccessAlert();
        } else {
          showErrorAlert();
        }
      }
      sisterFormik.submitForm();
    } catch (error) {
      console.error("Error during manualSubmit:", error);
    }
  };

  const handleCancel = async () => {
    sisterFormik.resetForm();
    setFormValues(formValues);
    setEditMode(false);
    handleClose();
  };

  const sisterFormik = useFormik({
    initialValues: formValues,
    validationSchema: addSisterValidation,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      setTimeout(() => {
        console.log(values);
        showSuccessAlert();
        handleClose();
        actions.setSubmitting(false);
      }, 700);
    },
  });

  return (
    <form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sister details</DialogTitle>
        <DialogContent>
          <label>Full Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="fullName"
            onChange={sisterFormik.handleChange}
            value={sisterFormik.values.fullName}
            required
            disabled={!editMode}
            error={
              sisterFormik.touched.fullName &&
              Boolean(sisterFormik.errors.fullName)
            }
            helperText={
              sisterFormik.touched.fullName && sisterFormik.errors.fullName
            }
          />
          <label>First Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="firstName"
            onChange={sisterFormik.handleChange}
            value={sisterFormik.values.firstName}
            required
            disabled={!editMode}
            error={
              sisterFormik.touched.firstName &&
              Boolean(sisterFormik.errors.firstName)
            }
            helperText={
              sisterFormik.touched.firstName && sisterFormik.errors.firstName
            }
          />
          <label>Last Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="lastName"
            onChange={sisterFormik.handleChange}
            value={sisterFormik.values.lastName}
            required
            disabled={!editMode}
            error={
              sisterFormik.touched.lastName &&
              Boolean(sisterFormik.errors.lastName)
            }
            helperText={
              sisterFormik.touched.lastName && sisterFormik.errors.Name
            }
          />
          <label>Email</label>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            fullWidth
            name="email"
            onChange={sisterFormik.handleChange}
            value={sisterFormik.values.email}
            required
            disabled={!editMode}
            error={
              sisterFormik.touched.email && Boolean(sisterFormik.errors.email)
            }
            helperText={sisterFormik.touched.email && sisterFormik.errors.email}
          />
          <label>Mobile No</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="mobileNo"
            onChange={sisterFormik.handleChange}
            value={sisterFormik.values.mobileNo}
            required
            disabled={!editMode}
            error={
              sisterFormik.touched.mobileNo &&
              Boolean(sisterFormik.errors.mobileNo)
            }
            helperText={
              sisterFormik.touched.mobileNo && sisterFormik.errors.mobileNo
            }
          />
          {loggedUserPosition && loggedUserPosition === "Matron" && (
            <>
              <label>Service ID</label>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="nic"
                onChange={sisterFormik.handleChange}
                value={sisterFormik.values.nic}
                required
                disabled={!editMode}
                error={
                  sisterFormik.touched.nic && Boolean(sisterFormik.errors.nic)
                }
                helperText={sisterFormik.touched.nic && sisterFormik.errors.nic}
              />
              <label>Birthday</label>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="date"
                name="birthdate"
                onChange={sisterFormik.handleChange}
                value={sisterFormik.values.birthdate}
                required
                disabled={!editMode}
                error={
                  sisterFormik.touched.birthdate &&
                  Boolean(sisterFormik.errors.birthdate)
                }
                helperText={
                  sisterFormik.touched.birthdate &&
                  sisterFormik.errors.birthdate
                }
              />
              <label>Position</label>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="position"
                onChange={sisterFormik.handleChange}
                value={sisterFormik.values.position}
                required
                disabled={!editMode}
                error={
                  sisterFormik.touched.position &&
                  Boolean(sisterFormik.errors.position)
                }
                helperText={
                  sisterFormik.touched.position && sisterFormik.errors.position
                }
              />
              <label>Leave No</label>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="leaveNo"
                onChange={sisterFormik.handleChange}
                value={sisterFormik.values.leaveNo}
                required
                disabled={!editMode}
                error={
                  sisterFormik.touched.leaveNo &&
                  Boolean(sisterFormik.errors.leaveNo)
                }
                helperText={
                  sisterFormik.touched.leaveNo && sisterFormik.errors.leaveNo
                }
              />
              <label>Service Start Date</label>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="date"
                name="serviceStartDate"
                onChange={sisterFormik.handleChange}
                value={sisterFormik.values.serviceStartDate}
                required
                disabled={!editMode}
                error={
                  sisterFormik.touched.serviceStartDate &&
                  Boolean(sisterFormik.errors.serviceStartDate)
                }
                helperText={
                  sisterFormik.touched.serviceStartDate &&
                  sisterFormik.errors.serviceStartDate
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          {editMode ? (
            <Button
              color="primary"
              disabled={
                loggedUserPosition === "Sister" ||
                loggedUserPosition === "Nurse"
              }
              onClick={manualSubmit}
            >
              Save
            </Button>
          ) : (
            <Button
              color="primary"
              disabled={
                loggedUserPosition === "Sister" ||
                loggedUserPosition === "Nurse"
              }
              onClick={() => handleEdit()}
            >
              Edit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default StaffDetailsForm;
