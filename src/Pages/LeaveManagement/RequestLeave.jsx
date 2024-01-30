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
  const [formData, setFormData] = useState({
    name: "Sajad Deen",
    id: "12345",
    designation: "Nurse",
    numberOfDays: "",
    leaveTakenCurrentYear: "5",
    date: "2024-01-31", // Set default date, you can change it as needed
    dateOfFirstAppointment: "2020-01-01", // Set default date, you can change it as needed
    dateOfCommencingLeave: "",
    dateOfResumingDuties: "",
    reasonsForLeave: "",
  });

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [exceedCapacityDialogOpen, setExceedCapacityDialogOpen] =
    useState(false);
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const [numberOfDaysError, setNumberOfDaysError] = useState(false);

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
      numberOfDays: "",
      dateOfCommencingLeave: "",
      dateOfResumingDuties: "",
      reasonsForLeave: "",
    });

    // Reset error states
    setRequiredFieldsError(false);
    setNumberOfDaysError(false);
  };

  const handleSubmit = () => {
    // Check for validations before submission
    const requestedLeaves = parseInt(formData.numberOfDays, 10);
    const leaveCapacity = 14; // Updated leave capacity to 14
    const currentDate = new Date();
    const commencingDate = new Date(formData.dateOfCommencingLeave);
    const resumingDate = new Date(formData.dateOfResumingDuties);

    // Reset error states
    setRequiredFieldsError(false);
    setNumberOfDaysError(false);

    if (
      !formData.reasonsForLeave ||
      isNaN(requestedLeaves) ||
      requestedLeaves <= 0 ||
      requestedLeaves > leaveCapacity ||
      commencingDate <= currentDate ||
      commencingDate >= resumingDate
    ) {
      // Show error message or handle validation appropriately
      setRequiredFieldsError(!formData.reasonsForLeave);
      setNumberOfDaysError(
        isNaN(requestedLeaves) ||
          requestedLeaves <= 0 ||
          requestedLeaves > leaveCapacity
      );
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
                        Number of days leave applied for
                      </Typography>
                      <TextField
                        fullWidth
                        value={formData.numberOfDays}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            numberOfDays: e.target.value,
                          })
                        }
                        error={numberOfDaysError}
                        required
                        type="number"
                        helperText={
                          numberOfDaysError ? "Enter a valid number" : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Leave taken in current year
                      </Typography>
                      <TextField
                        fullWidth
                        value={formData.leaveTakenCurrentYear}
                        readOnly
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Date</Typography>
                      <TextField
                        type="date"
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
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Date of First Appointment
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        value={formData.dateOfFirstAppointment}
                        readOnly
                      />
                    </Grid>
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
                        helperText={requiredFieldsError ? "Required" : ""}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Date of resuming duties
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        value={formData.dateOfResumingDuties}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dateOfResumingDuties: e.target.value,
                          })
                        }
                        error={requiredFieldsError}
                        required
                        helperText={requiredFieldsError ? "Required" : ""}
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
                        helperText={requiredFieldsError ? "Required" : ""}
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
              Your leave request has been submitted successfully.
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
              You have exceeded the leave capacity for the year. This will be
              recorded as excessive leaves. Are you sure about this?
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
