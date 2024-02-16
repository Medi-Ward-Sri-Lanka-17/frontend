import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";
import {
  fetchWardData,
  fetchShiftData,
  fetchPosition,
  shiftData,
} from "../../Data/wardDetails/wardService";

const AddWardDetailsForm = ({ open, handleClose, handleAddNurse }) => {
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
    /*===============success alert=====================*/
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
      onSubmit={(values) => {
        console.log(values);
        // handleAddNurse(values);
        handleClose();
      }}
    >
      {({ handleChange, values }) => (
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
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" onClick={showSuccessAlert}>
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
