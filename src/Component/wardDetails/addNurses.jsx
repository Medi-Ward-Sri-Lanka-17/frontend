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
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNurseForm = ({ open, handleClose, handleAddNurse }) => {
  const [successMessage, setSuccessMessage] = useState(null);
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
    fullName: "",
    serviceId: "",
    birthdate: "",
    email: "",
    position: "",
    leaveNo: "",
    mobileNo: "",
    serviceStartDate: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Required";
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

    return errors;
  };

  const onSubmit = async (values, actions) => {
    handleAddNurse(values);
    handleClose();
    //setSuccessMessage("Nurse added successfully.");
    actions.setSubmitting(false);
  };

  const showAlert = () => {
    toast.info("This is a toast alert!");
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={showAlert} startIcon={<AddIcon />}>
              Add Nurse
            </Button>
          </DialogActions>
        </Dialog>

        {successMessage && (
          <div
            style={{ textAlign: "center", marginTop: "10px", color: "green" }}
          >
            {successMessage}
          </div>
        )}
      </Form>
    </Formik>
  );
};

export default AddNurseForm;
