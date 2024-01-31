import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { fetchSisterData } from "../../Data/wardDetails/sisterService";
import { fetchPosition } from "../../Data/wardDetails/wardService";

const StaffDetailsForm = ({ open, handleClose, initialSisterName }) => {
  const [fullName, setFullName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("Sister");
  const [leaveNo, setLeaveNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [serviceStartDate, setServiceStartDate] = useState("");
  const [loggedUserPosition, setLoggedUserPosition] = useState("");
  const [editMode, setEditMode] = useState(false); // State variable for edit mode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sisterData = await fetchSisterData();
        const loggedPositionData = await fetchPosition();
        setFullName(sisterData.fullName);
        setServiceId(sisterData.serviceId);
        setBirthdate(sisterData.birthdate);
        setEmail(sisterData.email);
        setLeaveNo(sisterData.leaveNo);
        setMobileNo(sisterData.mobileNo);
        setServiceStartDate(sisterData.serviceStartDate);
        setPosition(loggedPositionData);
        setLoggedUserPosition(loggedPositionData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleSave = (values) => {
    // Handle saving data or any other logic here
    console.log("Saved data:", values);
    handleClose();
  };

  const handleEdit = () => {
    // Toggle the edit mode
    setEditMode(!editMode);
  };

  const initialValues = {
    fullName: fullName,
    serviceId: serviceId,
    birthdate: birthdate,
    email: email,
    position: position,
    leaveNo: leaveNo,
    mobileNo: mobileNo,
    serviceStartDate: serviceStartDate,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSave}
      enableReinitialize={true}
    >
      {({ values, handleChange, handleSubmit, setValues }) => (
        <Form>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Sister details</DialogTitle>
            <DialogContent>
              <label>Full Name</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="fullName"
                onChange={handleChange}
                value={values.fullName}
                required
                disabled={!editMode}
              />
              <label>Email</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                label="Email"
                fullWidth
                name="email"
                onChange={handleChange}
                value={values.email}
                required
                disabled={!editMode}
              />
              <label>Mobile No</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="mobileNo"
                onChange={handleChange}
                value={values.mobileNo}
                required
                disabled={!editMode}
              />
              {loggedUserPosition && loggedUserPosition === "matron" && (
                <>
                  <label>Service ID</label>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="serviceId"
                    onChange={handleChange}
                    value={values.serviceId}
                    required
                    disabled={!editMode}
                  />
                  <label>Birthday</label>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="date"
                    name="birthdate"
                    onChange={handleChange}
                    value={values.birthdate}
                    required
                    disabled={!editMode}
                  />
                  <label>Position</label>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="position"
                    onChange={handleChange}
                    value={values.position}
                    required
                    disabled={!editMode}
                  />
                  <label>Leave No</label>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="leaveNo"
                    onChange={handleChange}
                    value={values.leaveNo}
                    required
                    disabled={!editMode}
                  />
                  <label>Service Start Date</label>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="date"
                    name="serviceStartDate"
                    onChange={handleChange}
                    value={values.serviceStartDate}
                    required
                    disabled={!editMode}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              {editMode ? (
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  disabled={
                    loggedUserPosition === "sister" &&
                    loggedUserPosition === "nurse"
                  }
                >
                  Save
                </Button>
              ) : (
                <Button
                  color="primary"
                  disabled={
                    loggedUserPosition === "sister" &&
                    loggedUserPosition === "nurse"
                  }
                  onClick={() => {
                    handleEdit();
                    // Fetch data and set the form values when entering edit mode
                    fetchSisterData().then((sisterData) => {
                      setValues({
                        ...sisterData,
                        position: "Sister", // Assuming position is not editable
                      });
                    });
                  }}
                >
                  Edit
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default StaffDetailsForm;
