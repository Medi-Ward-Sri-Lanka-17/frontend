import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Header from "../../Component/Header";
import SideBar from "../../Component/SideBar";
import Swal from "sweetalert2"; // Import Swal library
import { getUserDetails } from "../../Services/LeaveManagement/LeaveRequestServices";
import { useAuth } from "../../Security/AuthContext";
import { saveLeaveRequest } from "../../Services/LeaveManagement/LeaveRequestServices";

const RequestLeave = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const calculateLeaveCount = (commencingDate, endingLeavesDate) => {
    const diffInMilliseconds =
      new Date(endingLeavesDate) - new Date(commencingDate);
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return diffInDays;
  };

  const [formData, setFormData] = useState({
    fullName: "pushpa silva",
    nic: "12345",
    position: "Nurse",
    leaveNum: "19",
    numberOfTakenCasualLeaves: "20",
    numberOfTakenVacationLeaves: "10",
    requestedDateAndTime: getCurrentDateTime(),
    leaveBeginDate: "",
    leaveEndDate: "",
    reason: "",
  });

  const showSuccessAlert = (text) => {
    Swal.fire({
      text: text,
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };

  //=================Service related functionalities===========================

  //Get the logged user username
  const authContext = useAuth();
  const userName = authContext.username;

  useEffect(() => {
    getUserDetails(userName)
      .then((responseData) => {
        // Update state with the fetched data
        setFormData(responseData);
      })
      .catch((error) => {
        console.log("user details fetched error");
        // Update state with the error
        //setError(error.message);
      });
  }, [userName]);

  // // Log the formData after it has been updated
  // useEffect(() => {
  //   console.log("formData", formData);
  // }, [formData]);

  //============================================================================

  const [exceedCapacityDialogOpen, setExceedCapacityDialogOpen] =
    useState(false);
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const [pastCommencingDateError, setPastCommencingDateError] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      requestedDateAndTime: getCurrentDateTime(),
    }));
  }, []);

  const handleExceedCapacityDialogClose = (confirmed) => {
    setExceedCapacityDialogOpen(false);

    if (confirmed) {
      // Record excessive leaves and submit the form
      // ...

      // Show success message after submission
      showSuccessAlert("Your Leave Request Has Successfully Submitted !");
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      leaveBeginDate: "",
      leaveEndDate: "",
      reason: "",
    });

    setRequiredFieldsError(false);
    setPastCommencingDateError(false);
  };

  //Change the user filled data
  const handleLeaveBeginDateChange = (e) => {
    setFormData({
      ...formData,
      leaveBeginDate: e.target.value,
    });
  };

  const handleLeaveEndDateChange = (e) => {
    setFormData({
      ...formData,
      leaveEndDate: e.target.value,
    });
  };

  const handleReasonChange = (e) => {
    setFormData({
      ...formData,
      reason: e.target.value,
    });
  };

  //Handle functionality when user press the submit button
  const handleSubmit = () => {
    const commencingDate = new Date(formData.leaveBeginDate);
    const endingLeavesDate = new Date(formData.leaveEndDate);
    const currentDate = new Date();
    const requestedLeaves = calculateLeaveCount(
      commencingDate,
      endingLeavesDate
    );
    const totalLeaves =
      parseInt(formData.numberOfTakenCasualLeaves, 10) +
      parseInt(formData.numberOfTakenVacationLeaves, 10);

    setRequiredFieldsError(false);
    setPastCommencingDateError(false);

    if (
      !formData.reason ||
      isNaN(requestedLeaves) ||
      requestedLeaves <= 0 ||
      commencingDate >= endingLeavesDate ||
      commencingDate < currentDate
    ) {
      setRequiredFieldsError(!formData.reason);

      // Show an error message for past commencing date
      if (commencingDate < currentDate) {
        setPastCommencingDateError(true);
      }

      return;
    }

    // Check if the requested leaves exceed 14 consecutive days
    const diffInDays = calculateLeaveCount(commencingDate, endingLeavesDate);
    if (diffInDays > 14) {
      setExceedCapacityDialogOpen(true);
      return;
    }

    if (requestedLeaves > 14) {
      setExceedCapacityDialogOpen(true);
      return;
    }

    const finalTotalLeaves = totalLeaves + requestedLeaves;

    if (finalTotalLeaves > 42) {
      setExceedCapacityDialogOpen(true);
      return;
    }

    if (saveLeaveRequest(formData)) {
      // If all validations pass, show success alert
      showSuccessAlert("Your Leave Request Has Successfully Submitted !");
      handleReset();
    } else {
      showSuccessAlert("Submision Fail");
      handleReset();
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <div className="PageContent" style={{ width: "100%" }}>
        <Header title="LEAVE REQUEST" />
        <Container
          display="flex"
          flexDirection={{ xs: "column", sm: "column", md: "row" }}
          justifyContent={{
            xs: "flex-start",
            sm: "flex-start",
            md: "flex-start",
          }}
          alignItems="stretch"
          height="100vh"
        >
          {/* Main Content Section - Right Column */}
          <Box
            flex={1}
            margin={0}
            sx={{
              backgroundColor: "#f0f2f5",
              padding: 2,
            }}
          >
            {/* Leave Request Table Section */}
            <Box>
              {/* Leave Request Table */}
              <Grid container spacing={2}>
                {/* Left Column */}
                <Grid item xs={12} sm={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Full Name</Typography>
                      <TextField fullWidth value={formData.fullName} readOnly />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Service ID</Typography>
                      <TextField fullWidth value={formData.nic} readOnly />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Designation</Typography>
                      <TextField fullWidth value={formData.position} readOnly />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Leaves taken in the current year
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">
                            Casual Leaves
                          </Typography>
                          <TextField
                            halfWidth
                            value={formData.numberOfTakenCasualLeaves}
                            readOnly
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">
                            Vacation Leaves
                          </Typography>
                          <TextField
                            halfWidth
                            value={formData.numberOfTakenVacationLeaves}
                            readOnly
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Date and Time</Typography>
                      <TextField
                        type="datetime-local"
                        fullWidth
                        value={formData.requestedDateAndTime}
                        readOnly
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} sm={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Leave No</Typography>
                      <TextField fullWidth value={formData.leaveNum} readOnly />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Date of Commencing Leave
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        value={formData.leaveBeginDate}
                        onChange={handleLeaveBeginDateChange}
                        error={requiredFieldsError || pastCommencingDateError}
                        required
                        helperText={
                          requiredFieldsError
                            ? "*Required"
                            : pastCommencingDateError
                            ? "*Commencing date must be in the future"
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Date of ending leave
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        value={formData.leaveEndDate}
                        onChange={handleLeaveEndDateChange}
                        error={requiredFieldsError}
                        required
                        helperText={requiredFieldsError ? "*Required" : ""}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Reasons for leave
                      </Typography>
                      <TextField
                        multiline
                        rows={4}
                        fullWidth
                        value={formData.reason}
                        onChange={handleReasonChange}
                        error={requiredFieldsError}
                        required
                        helperText={requiredFieldsError ? "*Required" : ""}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Buttons Section */}
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "column", md: "row" }}
                justifyContent={{
                  xs: "flex-start",
                  sm: "flex-start",
                  md: "flex-end",
                }}
                alignItems={{ xs: "stretch", sm: "stretch", md: "flex-end" }}
                marginTop={{ xs: "10px", sm: "10px", md: "0px" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "200px" },
                    height: "40px",
                    backgroundColor: "#243E4F",
                    color: "White",
                    "&:hover": {
                      backgroundColor: "#31757E",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  <Typography variant="h6">Submit</Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: { xs: "10px", sm: "10px", md: "0px" },
                    marginLeft: { xs: "0px", sm: "0px", md: "10px" },
                    width: { xs: "100%", sm: "100%", md: "200px" },
                    height: "40px",
                    backgroundColor: "#757575",
                    color: "White",
                    "&:hover": {
                      backgroundColor: "#616161",
                    },
                  }}
                  onClick={handleReset}
                >
                  <Typography variant="h6">Reset</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Exceed Capacity Dialog */}
        <Dialog
          open={exceedCapacityDialogOpen}
          onClose={() => handleExceedCapacityDialogClose(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Leave Capacity Exceeded</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              You have exceeded the leave capacity that you can take for the
              year. This will be recorded as excessive leaves. Are you sure
              about this?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleExceedCapacityDialogClose(true)}
              color="primary"
            >
              Yes
            </Button>
            <Button
              onClick={() => handleExceedCapacityDialogClose(false)}
              color="secondary"
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default RequestLeave;
