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
    name: "pushpa silva",
    id: "12345",
    designation: "Nurse",
    numberOfDays: "",
    casualLeaves: "20",
    vacationLeaves: "10",
    date: getCurrentDateTime(),
    dateOfCommencingLeave: "",
    dateOfEndingLeaves: "",
    reasonsForLeave: "",
  });

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [exceedCapacityDialogOpen, setExceedCapacityDialogOpen] =
    useState(false);
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const [pastCommencingDateError, setPastCommencingDateError] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      date: getCurrentDateTime(),
    }));
  }, []);

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
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
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      dateOfCommencingLeave: "",
      dateOfEndingLeaves: "",
      reasonsForLeave: "",
    });

    setRequiredFieldsError(false);
    setPastCommencingDateError(false);
  };

  const handleSubmit = () => {
    const commencingDate = new Date(formData.dateOfCommencingLeave);
    const endingLeavesDate = new Date(formData.dateOfEndingLeaves);
    const currentDate = new Date();
    const requestedLeaves = calculateLeaveCount(
      commencingDate,
      endingLeavesDate
    );
    const totalLeaves =
      parseInt(formData.casualLeaves, 10) +
      parseInt(formData.vacationLeaves, 10);

    setRequiredFieldsError(false);
    setPastCommencingDateError(false);

    if (
      !formData.reasonsForLeave ||
      isNaN(requestedLeaves) ||
      requestedLeaves <= 0 ||
      commencingDate >= endingLeavesDate ||
      commencingDate < currentDate
    ) {
      setRequiredFieldsError(!formData.reasonsForLeave);

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
                            value={formData.casualLeaves}
                            readOnly
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">
                            Vacation Leaves
                          </Typography>
                          <TextField
                            halfWidth
                            value={formData.vacationLeaves}
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
