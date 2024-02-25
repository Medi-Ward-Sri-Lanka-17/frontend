import React, { useState, useEffect } from "react";
import { fetchPosition } from "../../Data/wardDetails/wardService";
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
//import "react-toastify/dist/ReactToastify.css";
import { addNurseValidation } from "../../Validation/validation";
//import "./style.css";

const AddStaffMemberForm = ({ open, handleClose, handleAddNurse }) => {
  const [loggedUserPosition, setLoggedUserPosition] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionData = await fetchPosition();
        setLoggedUserPosition(positionData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    fullName: "",
    serviceId: "",
    birthdate: "",
    email: "",
    position: "",
    leaveNo: "",
    mobileNo: "",
    serviceStartDate: "",
    wardNo: "",
    remainingVacationLeaves: "",
    remainingCasualLeaves: "",
  };

  const showSuccessAlert = () => {
    handleClose();
    Swal.fire({
      text: "Staff member successfully added!",
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  const formikAddNurse = useFormik({
    initialValues: initialValues,
    validationSchema: addNurseValidation,
    onSubmit: async (values, actions) => {
      setTimeout(() => {
        console.log(values);
        handleAddNurse(values);
        showSuccessAlert();
        handleClose();
        actions.setSubmitting(false);
      }, 700);
    },
  });

  //Use a seperate method for validate, because there was a problem in the validating with the onSubmit button
  const handleManualSubmit = () => {
    console.log(formikAddNurse.errors);
    formikAddNurse.submitForm();
    // handleAddNurse(formikAddNurse.values);
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
            name="serviceId"
            value={formikAddNurse.values.serviceId}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.serviceId &&
              Boolean(formikAddNurse.errors.serviceId)
            }
            helperText={
              formikAddNurse.touched.serviceId &&
              formikAddNurse.errors.serviceId
            }
          />

          <label>Birthday</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="date"
            name="birthdate"
            value={formikAddNurse.values.birthdate}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.birthdate &&
              Boolean(formikAddNurse.errors.birthdate)
            }
            helperText={
              formikAddNurse.touched.birthdate &&
              formikAddNurse.errors.birthdate
            }
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
            value={formikAddNurse.values.wardNo}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.wardNo &&
              Boolean(formikAddNurse.errors.wardNo)
            }
            helperText={
              formikAddNurse.touched.wardNo && formikAddNurse.errors.wardNo
            }
          />

          <label>Leave No</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="leaveNo"
            value={formikAddNurse.values.leaveNo}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.leaveNo &&
              Boolean(formikAddNurse.errors.leaveNo)
            }
            helperText={
              formikAddNurse.touched.leaveNo && formikAddNurse.errors.leaveNo
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
            name="serviceStartDate"
            value={formikAddNurse.values.serviceStartDate}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.serviceStartDate &&
              Boolean(formikAddNurse.errors.serviceStartDate)
            }
            helperText={
              formikAddNurse.touched.serviceStartDate &&
              formikAddNurse.errors.serviceStartDate
            }
          />

          <label>Remaining Vacation Leaves</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="remainingVacationLeaves"
            value={formikAddNurse.values.remainingVacationLeaves}
            required
            onChange={formikAddNurse.handleChange}
            onBlur={formikAddNurse.handleBlur}
            error={
              formikAddNurse.touched.remainingVacationLeaves &&
              Boolean(formikAddNurse.errors.remainingVacationLeaves)
            }
            helperText={
              formikAddNurse.touched.remainingVacationLeaves &&
              formikAddNurse.errors.remainingVacationLeaves
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
          <Button onClick={handleClose} color="primary">
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
