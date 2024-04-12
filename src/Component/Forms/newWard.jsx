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
import { Formik, Form, Field } from "formik";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { EditBasicWardDetailsValidation } from "../../Validation/wardDetailsValidation";
import { addWard } from "../../Services/WardDetails/WardDetailsServices";
import { useAuth } from "../../Security/AuthContext";

const AddNewWardForm = ({ open, handleClose }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [loggedUserPosition, setLoggedUserPosition] = useState("");
  const [wardData, setWardData] = useState({
    wardName: "",
    wardNo: "",
    matron: "",
    numberOfNurses: "",
    morningShift: "",
    eveningShift: "",
    nightShift: "",
  });

  const authContext = useAuth();

  const showSuccessAlert = () => {
    console.log("success aleert function");
    Swal.fire({
      text: "New ward successfully added!",
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionData = authContext.position;
        setLoggedUserPosition(positionData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleCancel = (resetForm) => {
    handleClose();
    resetForm();
  };

  // const handleCancel = () => {
  //   handleClose(); // Close the dialog
  //   setWardData({
  //     // Reset the form fields
  //     wardName: "",
  //     wardNo: "",
  //     matron: "",
  //     numberOfNurses: "",
  //     morningShift: "",
  //     eveningShift: "",
  //     nightShift: "",
  //   });
  // };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("HandleSubmit method");
      console.log(values);
      await addWard(values);
      showSuccessAlert();
      handleClose();
      resetForm(); // Reset the form fields
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={wardData}
      validationSchema={EditBasicWardDetailsValidation}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        isSubmitting,
        handleSubmit,
        touched,
        errors,
        resetForm,
      }) => (
        <Form>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add ward details</DialogTitle>
            <DialogContent>
              <label>Ward Name</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="wardName"
                required
                onChange={handleChange}
                error={touched.wardName && Boolean(errors.wardName)}
                helperText={touched.wardName && errors.wardName}
              />
              <label>Ward number</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="wardNo"
                required
                onChange={handleChange}
                error={touched.wardNo && Boolean(errors.wardNo)}
                helperText={touched.wardNo && errors.wardNo}
              />
              <label>Matron NIC</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="matron"
                required
                onChange={handleChange}
                error={touched.matron && Boolean(errors.matron)}
                helperText={touched.matron && errors.matron}
              />

              <label>Total number of nurses in ward</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="numberOfNurses"
                required
                onChange={handleChange}
                error={touched.numberOfNurses && Boolean(errors.numberOfNurses)}
                helperText={touched.numberOfNurses && errors.numberOfNurses}
              />

              <label>Number of nurses in morning shift</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="morningShift"
                required
                onChange={handleChange}
                error={touched.morningShift && Boolean(errors.morningShift)}
                helperText={touched.morningShift && errors.morningShift}
              />

              <label>Number of nurses in evening shift</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="eveningShift"
                required
                onChange={handleChange}
                error={touched.eveningShift && Boolean(errors.eveningShift)}
                helperText={touched.eveningShift && errors.eveningShift}
              />

              <label>Number of nurses in night shift</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="nightShift"
                required
                onChange={handleChange}
                error={touched.nightShift && Boolean(errors.nightShift)}
                helperText={touched.nightShift && errors.nightShift}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCancel(resetForm)} color="primary">
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewWardForm;
