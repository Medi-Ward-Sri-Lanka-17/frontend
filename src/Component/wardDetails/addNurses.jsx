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
  Alert as MuiAlert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const AddNurseForm = ({ open, handleClose, handleAddNurse }) => {
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

  const validate = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Required";
    }

    if (!values.firstName) {
      errors.firstName = "Required";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    }

    if (!values.serviceId) {
      errors.serviceId = "Required";
    }

    if (!values.birthdate) {
      errors.birthdate = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.position) {
      errors.position = "Required";
    }

    if (!values.leaveNo) {
      errors.leaveNo = "Required";
    }

    if (!values.mobileNo) {
      errors.mobileNo = "Required";
    }

    if (!values.serviceStartDate) {
      errors.serviceStartDate = "Required";
    }

    if (!values.wardNo) {
      errors.wardNo = "Required";
    }

    if (!values.remainingVacationLeaves) {
      errors.remainingVacationLeaves = "Required";
    }

    if (!values.remainingCasualLeaves) {
      errors.remainingCasualLeaves = "Required";
    }

    return errors;
  };

  const onSubmit = async (values, actions) => {
    handleAddNurse(values);
    handleClose();
    actions.setSubmitting(false);
  };

  const showSuccessAlert = () => {
    handleClose();
    Swal.fire({
      text: "Staff member successfully added!",
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      <Form>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Nurse</DialogTitle>
          <DialogContent>
            <label>First Name</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="firstName"
              required
            />

            <label>Last Name</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="lastName"
              required
            />

            <label>Full Name</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="fullName"
              required
            />

            <label>Service ID</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="serviceId"
              required
            />
            <label>Birthday</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              type="date"
              name="birthdate"
              required
            />

            <label>Email</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              label="Email"
              fullWidth
              name="email"
              required
            />

            <label>Position</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="position"
              required
              select
            >
              <MenuItem value="Nurse">Nurse</MenuItem>
              <MenuItem
                value="Sister"
                disabled={loggedUserPosition === "sister"}
              >
                Sister
              </MenuItem>
            </Field>

            <label>Ward Number</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="wardNo"
              required
            />

            <label>Leave No</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="leaveNo"
              required
            />

            <label>Mobile No</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="mobileNo"
              required
            />

            <label>Service Start Date</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              type="date"
              name="serviceStartDate"
              required
            />

            <label>Remaining Vacation Leaves</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="remainingVacationLeaves"
              required
            />

            <label>Remaining Casual Leaves</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="remainingCasualLeaves"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={showSuccessAlert}>
              Add Nurse
            </Button>
          </DialogActions>
        </Dialog>
      </Form>
    </Formik>
  );
};

export default AddNurseForm;
