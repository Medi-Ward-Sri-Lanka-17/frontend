import React, { useState } from "react";
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

  const [formData, setFormData] = useState({
    name: "pushpa silva",
    id: "12345",
    designation: "Nurse",
    numberOfDays: "",
    leaveTakenCurrentYear: "5",
    date: getCurrentDateTime(), // Set default date and time
    // dateOfFirstAppointment: "2020-01-01",
    dateOfCommencingLeave: "",
    dateOfEndingLeaves: "",
    reasonsForLeave: "",
  });

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [exceedCapacityDialogOpen, setExceedCapacityDialogOpen] =
    useState(false);
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  // const [numberOfDaysError, setNumberOfDaysError] = useState(false);

  // useEffect(() => {
  //   // Function to get the current date in the format YYYY-MM-DD
  //   const getCurrentDate = () => {
  //     const today = new Date();
  //     const year = today.getFullYear();
  //     const month = String(today.getMonth() + 1).padStart(2, "0");
  //     const day = String(today.getDate()).padStart(2, "0");
  //     return `${year}-${month}-${day}`;
  //   };

  //   // Set the current date when the component mounts
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     date: getCurrentDateTime(),
  //   }));
  // }, []);

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    // Reset the form after successful submission
    handleReset();
  };

  const handleExceedCapacityDialogClose = (confirmed) => {
    setExceedCapacityDialogOpen(false);

    if (confirmed) {
      // Record excessive leaves and submit the form
      // ...

      // Show success message after submission
      setSuccessDialogOpen(true);
    } else {
      // Reset the form if the user chooses not to proceed with excessive leaves
      handleReset();
    }
  };

  const handleReset = () => {
    // Implement reset logic here (clear form fields)
    setFormData({
      ...formData,
      // numberOfDays: "",
      dateOfCommencingLeave: "",
      dateOfEndingLeaves: "",
      reasonsForLeave: "",
    });

    // Reset error states
    setRequiredFieldsError(false);
    // setNumberOfDaysError(false);
  };

  const handleSubmit = () => {
    // Check for validations before submission
    const requestedLeaves = parseInt(formData.numberOfDays, 10);
    const leaveCapacity = 14; // Updated leave capacity to 14
    const currentDate = new Date();
    const commencingDate = new Date(formData.dateOfCommencingLeave);
    const endingLeavesDate = new Date(formData.dateOfEndingLeaves);

    // Reset error states
    setRequiredFieldsError(false);
    // setNumberOfDaysError(false);

    if (
      !formData.reasonsForLeave ||
      isNaN(requestedLeaves) ||
      requestedLeaves <= 0 ||
      requestedLeaves > leaveCapacity ||
      commencingDate <= currentDate ||
      commencingDate >= endingLeavesDate
    ) {
      // Show error message or handle validation appropriately
      setRequiredFieldsError(!formData.reasonsForLeave);
      // setNumberOfDaysError(
      //   isNaN(requestedLeaves) ||
      //     requestedLeaves <= 0 ||
      //     requestedLeaves > leaveCapacity
      // );
      return;
    }

    // Continue with the normal submission flow
    // ...

    // Check if the number of requested leaves exceeds the capacity
    if (requestedLeaves > leaveCapacity) {
      setExceedCapacityDialogOpen(true);
      // Prevent further actions
      return;
    }

    // Continue with the normal submission flow
    // ...
    setSuccessDialogOpen(true);
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
                      <Typography variant="subtitle1">Name</Typography>
                      <TextField fullWidth value={formData.name} readOnly />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">ID</Typography>
                      <TextField fullWidth value={formData.id} readOnly />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Designation</Typography>
                      <TextField
                        fullWidth
                        value={formData.designation}
                        readOnly
                      />
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
                            value={formData.leaveTakenCurrentYear}
                            readOnly
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">
                            Vacation Leaves
                          </Typography>
                          <TextField
                            halfWidth
                            value={formData.leaveTakenCurrentYear}
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
                        value={formData.date}
                        readOnly
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} sm={12} md={6}>
                  <Grid container spacing={2}>
                    {/* <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Date of First Appointment
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        value={formData.dateOfFirstAppointment}
                        readOnly
                      />
                    </Grid> */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Date of Commencing Leave
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        value={formData.dateOfCommencingLeave}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dateOfCommencingLeave: e.target.value,
                          })
                        }
                        error={requiredFieldsError}
                        required
                        helperText={requiredFieldsError ? "*Required" : ""}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Date of ending leaves
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        value={formData.dateOfEndingLeaves}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dateOfEndingLeaves: e.target.value,
                          })
                        }
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
                        value={formData.reasonsForLeave}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reasonsForLeave: e.target.value,
                          })
                        }
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

        {/* Success Dialog */}
        <Dialog
          open={successDialogOpen}
          onClose={handleSuccessDialogClose}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Leave Request Submitted</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Your leave request has been successfully submitted. Thank You.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSuccessDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

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
