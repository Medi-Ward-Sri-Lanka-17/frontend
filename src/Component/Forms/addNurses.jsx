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
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { addSatffValidation } from "../../Validation/wardDetailsValidation";
import { useAuth } from "../../Security/AuthContext";
import { addStaff } from "../../Services/WardDetails/WardDetailsServices";
import { retrieveWardNumbers } from "../../Services/WardDetails/WardDetailsServices";

const AddStaffMemberForm = ({ open, handleClose, handleAddNurse }) => {
  const [loggedUserPosition, setLoggedUserPosition] = useState("");
  const [WardNumbers, setWardNumbers] = useState([]);
  const [nurseData, setNurseData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    nic: "",
    dob: "",
    email: "",
    position: "",
    leaveNum: "",
    mobileNo: "",
    serviceStartedDate: "",
    wardNo: "",
    remainingVacationLeave: "",
    remainingCasualLeaves: "",
  });

  //=====Retrieve the logged user position and ward numbers======

  const authContext = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionData = authContext.position;
        setLoggedUserPosition(positionData);
        const response = await retrieveWardNumbers();
        const wardNumbersArray = response.wardNumbers; //retreive the ward numbers array from the response
        setWardNumbers(wardNumbersArray); // set the ward numbers array to wardNumbers use state in frontend
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const showSuccessAlert = () => {
    Swal.fire({
      text: "Staff member successfully added!",
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  const handleCancel = () => {
    handleClose();
    formikAddNurse.resetForm();
  };

  const formikAddNurse = useFormik({
    initialValues: nurseData,
    validationSchema: addSatffValidation,
    onSubmit: async (values, actions) => {
      setTimeout(() => {
        addStaff(values);
        showSuccessAlert();
        handleClose();
        actions.resetForm();
        actions.setSubmitting(false);
      }, 700);
    },
  });

  //Use a seperate method for validate, because there was a problem in the validating with the onSubmit button
  const handleManualSubmit = () => {
    console.log(formikAddNurse.errors);
    formikAddNurse.submitForm();
  };

  return (
    <form autoComplete="off">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Nurse</DialogTitle>
        <DialogContent>
          <label>First Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="firstName"
            value={formikAddNurse.values.firstName}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.firstName &&
              Boolean(formikAddNurse.errors.firstName)
            }
            helperText={
              formikAddNurse.touched.firstName &&
              formikAddNurse.errors.firstName
            }
          />

          <label>Last Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="lastName"
            value={formikAddNurse.values.lastName}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.lastName &&
              Boolean(formikAddNurse.errors.lastName)
            }
            helperText={
              formikAddNurse.touched.lastName && formikAddNurse.errors.lastName
            }
          />

          <label>Full Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="fullName"
            value={formikAddNurse.values.fullName}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.fullName &&
              Boolean(formikAddNurse.errors.fullName)
            }
            helperText={
              formikAddNurse.touched.fullName && formikAddNurse.errors.fullName
            }
          />

          <label>Service ID</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="nic"
            value={formikAddNurse.values.nic}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.nic && Boolean(formikAddNurse.errors.nic)
            }
            helperText={formikAddNurse.touched.nic && formikAddNurse.errors.nic}
          />

          <label>Birthday</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="date"
            name="dob"
            value={formikAddNurse.values.dob}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.dob && Boolean(formikAddNurse.errors.dob)
            }
            helperText={formikAddNurse.touched.dob && formikAddNurse.errors.dob}
          />

          <label>Email</label>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            fullWidth
            name="email"
            value={formikAddNurse.values.email}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.email &&
              Boolean(formikAddNurse.errors.email)
            }
            helperText={
              formikAddNurse.touched.email && formikAddNurse.errors.email
            }
          />

          <label>Position</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="position"
            value={formikAddNurse.values.position}
            required
            select
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.position &&
              Boolean(formikAddNurse.errors.position)
            }
            helperText={
              formikAddNurse.touched.position && formikAddNurse.errors.position
            }
          >
            <MenuItem value="Nurse">Nurse</MenuItem>
            <MenuItem value="Sister" disabled={loggedUserPosition === "sister"}>
              Sister
            </MenuItem>
          </TextField>

          <label>Ward Number</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="wardNo"
            select
            value={formikAddNurse.values.wardNo}
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.wardNo &&
              Boolean(formikAddNurse.errors.wardNo)
            }
            helperText={
              formikAddNurse.touched.wardNo && formikAddNurse.errors.wardNo
            }
          >
            {WardNumbers.map((wardNumber) => (
              <MenuItem key={wardNumber} value={wardNumber}>
                {wardNumber}
              </MenuItem>
            ))}
          </TextField>

          <label>Leave No</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="leaveNum"
            value={formikAddNurse.values.leaveNum}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.leaveNum &&
              Boolean(formikAddNurse.errors.leaveNum)
            }
            helperText={
              formikAddNurse.touched.leaveNum && formikAddNurse.errors.leaveNum
            }
          />

          <label>Mobile No</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="mobileNo"
            value={formikAddNurse.values.mobileNo}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.mobileNo &&
              Boolean(formikAddNurse.errors.mobileNo)
            }
            helperText={
              formikAddNurse.touched.mobileNo && formikAddNurse.errors.mobileNo
            }
          />

          <label>Service Start Date</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="date"
            name="serviceStartedDate"
            value={formikAddNurse.values.serviceStartedDate}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.serviceStartedDate &&
              Boolean(formikAddNurse.errors.serviceStartedDate)
            }
            helperText={
              formikAddNurse.touched.serviceStartedDate &&
              formikAddNurse.errors.serviceStartedDate
            }
          />

          <label>Remaining Vacation Leaves</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="remainingVacationLeave"
            value={formikAddNurse.values.remainingVacationLeave}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.remainingVacationLeave &&
              Boolean(formikAddNurse.errors.remainingVacationLeave)
            }
            helperText={
              formikAddNurse.touched.remainingVacationLeave &&
              formikAddNurse.errors.remainingVacationLeave
            }
          />

          <label>Remaining Casual Leaves</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="remainingCasualLeaves"
            value={formikAddNurse.values.remainingCasualLeaves}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.remainingCasualLeaves &&
              Boolean(formikAddNurse.errors.remainingCasualLeaves)
            }
            helperText={
              formikAddNurse.touched.remainingCasualLeaves &&
              formikAddNurse.errors.remainingCasualLeaves
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleManualSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddStaffMemberForm;
