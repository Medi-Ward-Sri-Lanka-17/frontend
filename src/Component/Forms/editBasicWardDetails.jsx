import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";
import { EditBasicWardDetailsValidation } from "../../Validation/wardDetailsValidation";
import { useAuth } from "../../Security/AuthContext";
import { retrieveBasicWardData } from "../../Services/WardDetails/WardDetailsServices";
import { sendEditedWardDetails } from "../../Services/WardDetails/WardDetailsServices";
import { retrieveBasicWardDataSister } from "../../Services/WardDetails/WardDetailsServices";
import { retrieveSistersNics } from "../../Services/WardDetails/WardDetailsServices";

const AddWardDetailsForm = ({
  open,
  handleClose,
  selectedWard,
  onClose,
  isWardSelect,
}) => {
  const [loggedUserPosition, setLoggedUserPosition] = useState("");
  const [isCancelButtonPress, setIsCancelButtonPress] = useState(false);
  const [sistersNics, setSisterNics] = useState([]);
  const [isSisterNicDropdown, setIsSisterNicDropdown] = useState(false);
  const [wardData, setWardData] = useState({
    wardName: "",
    wardNo: "",
    sisterNic: "",
    numberOfNurses: "",
    morningShift: "",
    eveningShift: "",
    nightShift: "",
  });

  const authContext = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionData = authContext.position;
        const username = authContext.username;
        setLoggedUserPosition(positionData);

        if (positionData === "Matron") {
          if (isWardSelect === true) {
            const data = await retrieveBasicWardData(selectedWard);
            const sisterNics = await retrieveSistersNics();

            setSisterNics(sisterNics);

            setWardData({
              wardName: data.wardName,
              sisterNic: data.sisterNic,
              wardNo: data.wardNo,
              numberOfNurses: data.numberOfNurses,
              morningShift: data.morningShift,
              eveningShift: data.eveningShift,
              nightShift: data.nightShift,
            });
          }
        } else {
          const data = await retrieveBasicWardDataSister(username);

          setWardData({
            wardName: data.wardName,
            sisterNic: data.sisterNic,
            wardNo: data.wardNo,
            numberOfNurses: data.numberOfNurses,
            morningShift: data.morningShift,
            eveningShift: data.eveningShift,
            nightShift: data.nightShift,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [selectedWard, isCancelButtonPress]);

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

  const handleWardDetails = async (values) => {
    try {
      const response = await sendEditedWardDetails(values);
      showSuccessAlert();
      handleClose(); // Close the dialog
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  /*=============Cancel button========================= */
  const handleCancel = () => {
    handleClose(); // Close the dialog
    setIsCancelButtonPress(true);
  };

  const handleSisterNicClick = () => {
    setIsSisterNicDropdown(true);
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
        resetForm,
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
                disabled={
                  loggedUserPosition === "Sister" ||
                  loggedUserPosition === "Matron"
                }
                error={touched.wardName && Boolean(errors.wardName)}
                helperText={touched.wardName && errors.wardName}
              />

              <label>Ward Number</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="wardNo"
                required
                onChange={handleChange}
                value={values.wardNo}
                disabled={
                  loggedUserPosition === "Sister" ||
                  loggedUserPosition === "Matron"
                }
                error={touched.wardNo && Boolean(errors.wardNo)}
                helperText={touched.wardNo && errors.wardNo}
              />

              <label>Sister NIC</label>
              {isSisterNicDropdown ? (
                <Field
                  as={Select}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="sisterNic"
                  required
                  disabled={loggedUserPosition === "Sister"}
                  onChange={handleChange}
                  value={values.sisterNic}
                  error={touched.sisterNic && Boolean(errors.sisterNic)}
                  helperText={touched.sisterNic && errors.sisterNic}
                >
                  {sistersNics.map((nic) => (
                    <MenuItem key={nic} value={nic}>
                      {nic}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="sisterNic"
                  required
                  onChange={handleChange}
                  value={values.sisterNic}
                  disabled={loggedUserPosition === "Sister"}
                  onClick={handleSisterNicClick}
                  error={touched.sisterNic && Boolean(errors.sisterNic)}
                  helperText={touched.sisterNic && errors.sisterNic}
                />
              )}

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
                disabled={loggedUserPosition === "Sister"}
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
                disabled={loggedUserPosition === "Matron"}
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
                disabled={loggedUserPosition === "Matron"}
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
                disabled={loggedUserPosition === "Matron"}
                error={touched.nightShift && Boolean(errors.nightShift)}
                helperText={touched.nightShift && errors.nightShift}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleCancel();
                  resetForm(); // Reset the form to its initial values
                }}
                color="primary"
              >
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
