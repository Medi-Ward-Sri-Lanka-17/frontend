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
import { Formik, Form, useFormik } from "formik";
import Swal from "sweetalert2";
import { addNurseValidation } from "../../Validation/wardDetailsValidation";
import { getNurseById } from "../../Data/wardDetails/nursesService";

const EditStaffMemberForm = ({ open, handleClose, staffMemberServiceId }) => {
  const [loggedUserPosition, setLoggedUserPosition] = useState("");
  const [nurse, setNurse] = useState({
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionData = await fetchPosition();
        const nurseData = await getNurseById(staffMemberServiceId);
        setNurse(nurseData);
        setLoggedUserPosition(positionData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const showSuccessAlert = () => {
    handleClose();
    Swal.fire({
      text: "Staff member successfully added!",
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  const handleEditNurse = (values) => {
    console.log("updated nurses data ", values);
  };

  const formikEditNurse = useFormik({
    initialValues: nurse,
    enableReinitialize: true,
    validationSchema: addNurseValidation,
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
  const handleManualSubmit = () => {
    console.log(formikEditNurse.errors);
    formikEditNurse.submitForm();
    // handleAddNurse(formikEditNurse.values);
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
            name="serviceId"
            value={formikEditNurse.values.serviceId}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.serviceId &&
              Boolean(formikEditNurse.errors.serviceId)
            }
            helperText={
              formikEditNurse.touched.serviceId &&
              formikEditNurse.errors.serviceId
            }
          />

          <label>Birthday</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="date"
            name="birthdate"
            value={formikEditNurse.values.birthdate}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.birthdate &&
              Boolean(formikEditNurse.errors.birthdate)
            }
            helperText={
              formikEditNurse.touched.birthdate &&
              formikEditNurse.errors.birthdate
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
            select
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.position &&
              Boolean(formikEditNurse.errors.position)
            }
            helperText={
              formikEditNurse.touched.position &&
              formikEditNurse.errors.position
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
            value={formikEditNurse.values.wardNo}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
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
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
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
            name="serviceStartDate"
            value={formikEditNurse.values.serviceStartDate}
            required
            onChange={formikEditNurse.handleChange}
            onBlur={formikEditNurse.handleBlur}
            error={
              formikEditNurse.touched.serviceStartDate &&
              Boolean(formikEditNurse.errors.serviceStartDate)
            }
            helperText={
              formikEditNurse.touched.serviceStartDate &&
              formikEditNurse.errors.serviceStartDate
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
          <Button color="primary" onClick={handleManualSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default EditStaffMemberForm;
