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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchWardData,
  fetchShiftData,
} from "../../Data/wardDetails/wardService";

const AddWardDeatilsForm = ({ open, handleClose, handleAddNurse }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [loggedUserPosition, setLoggedUserPosition] = useState("");
  const [wardName, setWardName] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [sisterName, setSisterName] = useState("");
  const [numberOfNurses, setNumberOfNurses] = useState("");
  const [morningShift, setMorningShift] = useState("");
  const [eveningShift, setEveningShift] = useState("");
  const [nightShift, setNightShift] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //position retrieve
        const positionData = await fetchPosition();
        setLoggedUserPosition(positionData);

        //ward data retrieve
        const data = await fetchWardData();
        setWardName(data.wardName);
        setWardNumber(data.wardNumber);
        setSisterName(data.sisterName);
        setNumberOfNurses(data.numberOfNurses);

        //shift data retrieve
        const shiftData = await fetchShiftData();
        setMorningShift(shiftData.morningShift);
        setEveningShift(shiftData.eveningShift);
        setNightShift(shiftData.nightShift);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const onSubmit = () => {
    return null;
  };

  const initialValues = {
    wardName: "",
    wardNumber: "",
    sisterName: "",
    numberOfNursesInTheWard: "",
    morningShift: "",
    eveningShift: "",
    nightShift: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      //   validate={validate}
    >
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
              value={wardName}
              disabled={loggedUserPosition === "sister"}
            />
            <label>Ward number</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="wardNumber"
              required
              value={wardNumber}
              disabled={loggedUserPosition === "sister"}
            />
            <label>Sister name</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="sisterName"
              required
              value={sisterName}
              disabled={loggedUserPosition === "sister"}
            />

            <label>Total number of nurses in ward</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="numberOfNursesInTheWard"
              required
              value={numberOfNurses}
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
              value={morningShift}
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
              value={eveningShift}
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
              value={nightShift}
              disabled={loggedUserPosition === "matron"}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </Form>
    </Formik>
  );
};

export default AddWardDeatilsForm;
