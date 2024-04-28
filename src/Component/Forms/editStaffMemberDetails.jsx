import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Formik, Form, useFormik } from "formik";
import Swal from "sweetalert2";
import { addSatffValidation } from "../../Validation/wardDetailsValidation";
import { useAuth } from "../../Security/AuthContext";
import { retrieveNurseData } from "../../Services/WardDetails/WardDetailsServices.js";
import { sendEditedNurseDetails } from "../../Services/WardDetails/WardDetailsServices.js";

const EditStaffMemberForm = ({ open, handleClose, nic }) => {
  const [loggedUserPosition, setLoggedUserPosition] = useState("");
  const [nurse, setNurse] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    nic: "",
    dob: "",
    email: "",
    position: "",
    leaveNo: "",
    mobileNo: "",
    serviceStartedDate: "",
    wardNo: "",
    remainingVacationLeaves: "",
    remainingCasualLeaves: "",
  });

  const authContext = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionData = authContext.position;
        const nurseData = await retrieveNurseData(nic);
        console.log(nurseData);
        setNurse(nurseData);
        setLoggedUserPosition(positionData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [nic]);

  const showSuccessAlert = () => {
    handleClose();
    Swal.fire({
      text: "Staff member successfully added!",
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  const handleEditNurse = (values) => {
    var response = sendEditedNurseDetails(values);
    console.log(response);
  };

  const formikEditNurse = useFormik({
    initialValues: nurse,
    enableReinitialize: true,
    validationSchema: addSatffValidation,
    onSubmit: async (values, actions) => {
      setTimeout(() => {
        console.log(values);

        showSuccessAlert();
        handleClose();
        actions.resetForm();
        actions.setSubmitting(false);
      }, 700);
    },
  });

  //Use a seperate method for validate, because there was a problem in the validating with the onSubmit button
  const handleManualSubmit = (values) => {
    handleEditNurse(values);
    console.log(formikEditNurse.errors);
    formikEditNurse.submitForm();
    // handleAddNurse(formikEditNurse.values);
  };

  return (
    <form autoComplete="off">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Nurse Details</DialogTitle>
        <DialogContent>
          <label>First Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="firstName"
            value={formikEditNurse.values.firstName}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.firstName &&
              Boolean(formikEditNurse.errors.firstName)
            }
            helperText={
              formikEditNurse.touched.firstName &&
              formikEditNurse.errors.firstName
            }
          />

          <label>Last Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="lastName"
            value={formikEditNurse.values.lastName}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.lastName &&
              Boolean(formikEditNurse.errors.lastName)
            }
            helperText={
              formikEditNurse.touched.lastName &&
              formikEditNurse.errors.lastName
            }
          />

          <label>Full Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="fullName"
            value={formikEditNurse.values.fullName}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.fullName &&
              Boolean(formikEditNurse.errors.fullName)
            }
            helperText={
              formikEditNurse.touched.fullName &&
              formikEditNurse.errors.fullName
            }
          />

          <label>Service ID</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="nic"
            value={formikEditNurse.values.nic}
            required
            disabled={true}
            error={
              formikEditNurse.touched.nic && Boolean(formikEditNurse.errors.nic)
            }
            helperText={
              formikEditNurse.touched.nic && formikEditNurse.errors.nic
            }
          />

          <label>Birthday</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="date"
            name="dob"
            value={formikEditNurse.values.dob}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.dob && Boolean(formikEditNurse.errors.dob)
            }
            helperText={
              formikEditNurse.touched.dob && formikEditNurse.errors.dob
            }
          />

          <label>Email</label>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            fullWidth
            name="email"
            value={formikEditNurse.values.email}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.email &&
              Boolean(formikEditNurse.errors.email)
            }
            helperText={
              formikEditNurse.touched.email && formikEditNurse.errors.email
            }
          />

          <label>Position</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="position"
            value={formikEditNurse.values.position}
            required
            disabled={true}
            error={
              formikEditNurse.touched.position &&
              Boolean(formikEditNurse.errors.position)
            }
            helperText={
              formikEditNurse.touched.position &&
              formikEditNurse.errors.position
            }
          />

          <label>Ward Number</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="wardNo"
            value={formikEditNurse.values.wardNo}
            required
            disabled={true}
            error={
              formikEditNurse.touched.wardNo &&
              Boolean(formikEditNurse.errors.wardNo)
            }
            helperText={
              formikEditNurse.touched.wardNo && formikEditNurse.errors.wardNo
            }
          />

          <label>Leave No</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="leaveNo"
            value={formikEditNurse.values.leaveNo}
            required
            disabled={true}
            error={
              formikEditNurse.touched.leaveNo &&
              Boolean(formikEditNurse.errors.leaveNo)
            }
            helperText={
              formikEditNurse.touched.leaveNo && formikEditNurse.errors.leaveNo
            }
          />

          <label>Mobile No</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="mobileNo"
            value={formikEditNurse.values.mobileNo}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.mobileNo &&
              Boolean(formikEditNurse.errors.mobileNo)
            }
            helperText={
              formikEditNurse.touched.mobileNo &&
              formikEditNurse.errors.mobileNo
            }
          />

          <label>Service Start Date</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="date"
            name="serviceStartedDate"
            value={formikEditNurse.values.serviceStartedDate}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.serviceStartedDate &&
              Boolean(formikEditNurse.errors.serviceStartedDate)
            }
            helperText={
              formikEditNurse.touched.serviceStartedDate &&
              formikEditNurse.errors.serviceStartedDate
            }
          />

          <label>Remaining Vacation Leaves</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="remainingVacationLeaves"
            value={formikEditNurse.values.remainingVacationLeaves}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.remainingVacationLeaves &&
              Boolean(formikEditNurse.errors.remainingVacationLeaves)
            }
            helperText={
              formikEditNurse.touched.remainingVacationLeaves &&
              formikEditNurse.errors.remainingVacationLeaves
            }
          />

          <label>Remaining Casual Leaves</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="remainingCasualLeaves"
            value={formikEditNurse.values.remainingCasualLeaves}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.remainingCasualLeaves &&
              Boolean(formikEditNurse.errors.remainingCasualLeaves)
            }
            helperText={
              formikEditNurse.touched.remainingCasualLeaves &&
              formikEditNurse.errors.remainingCasualLeaves
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => handleManualSubmit(formikEditNurse.values)}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default EditStaffMemberForm;
