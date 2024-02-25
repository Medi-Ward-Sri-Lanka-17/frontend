import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import Swal from "sweetalert2";
import {
  fetchWardData,
  fetchShiftData,
  fetchPosition,
} from "../../Data/wardDetails/wardService";
import { EditBasicWardDetailsValidation } from "../../Validation/wardDetailsValidation";

const AddWardDetailsForm = ({ open, handleClose, handleWardDetails }) => {
  const [loggedUserPosition, setLoggedUserPosition] = useState("");
  const [wardData, setWardData] = useState({
    wardName: "",
    wardNumber: "",
    sisterName: "",
    numberOfNurses: "",
    morningShift: "",
    eveningShift: "",
    nightShift: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionData = await fetchPosition();
        setLoggedUserPosition(positionData);

        const data = await fetchWardData();
        setWardData({
          wardName: data.wardName,
          sisterName: data.sisterName,
          wardNumber: data.wardNumber,
          sisterName: data.sisterName,
          numberOfNurses: data.numberOfNurses,
        });

        const shiftData = await fetchShiftData();
        setWardData((prevData) => ({
          ...prevData,
          morningShift: shiftData.morningShift,
          eveningShift: shiftData.eveningShift,
          nightShift: shiftData.nightShift,
        }));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  {
    /*=======================success alert============================*/
  }
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
      initialValues={wardData}
      enableReinitialize={true}
      validationSchema={EditBasicWardDetailsValidation}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          handleWardDetails(values); //Update the values according to the editBasicWardDetails form
          showSuccessAlert();
          handleClose();
        } catch (error) {
          console.error("Error submitting form:", error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        handleChange,
        values,
        isSubmitting,
        handleSubmit,
        touched, //touched property in Formik, it is a state variable that keeps track of which fields have been "touched" or interacted with.
        errors,
      }) => (
        <Form>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit ward details</DialogTitle>
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
                value={values.wardName}
                disabled={loggedUserPosition === "sister"}
                error={touched.wardName && Boolean(errors.wardName)}
                helperText={touched.wardName && errors.wardName}
              />

              <label>Ward Number</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="wardNumber"
                required
                onChange={handleChange}
                value={values.wardNumber}
                disabled={loggedUserPosition === "sister"}
                error={touched.wardNumber && Boolean(errors.wardNumber)}
                helperText={touched.wardNumber && errors.wardNumber}
              />

              <label>Sister Name</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="sisterName"
                required
                onChange={handleChange}
                value={values.sisterName}
                disabled={loggedUserPosition === "sister"}
                error={touched.sisterName && Boolean(errors.sisterName)}
                helperText={touched.sisterName && errors.sisterName}
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
                value={values.numberOfNurses}
                disabled={loggedUserPosition === "sister"}
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
                value={values.morningShift}
                disabled={loggedUserPosition === "matron"}
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
                value={values.eveningShift}
                disabled={loggedUserPosition === "matron"}
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
                value={values.nightShift}
                disabled={loggedUserPosition === "matron"}
                error={touched.nightShift && Boolean(errors.nightShift)}
                helperText={touched.nightShift && errors.nightShift}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                onClick={() => {
                  handleSubmit();
                  Object.keys(values).forEach((field) => {
                    touched[field] = true;
                  });
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default AddWardDetailsForm;
