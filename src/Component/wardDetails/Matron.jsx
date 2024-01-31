import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, MenuItem, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NursesTable from "./table";
import AddIcon from "@mui/icons-material/Add";
import {
  fetchWardData,
  fetchAllWards,
  fetchWardData_matron,
  fetchPosition,
} from "../../Data/wardDetails/wardService";
import AddNurseForm from "./addNurses";
import StaffDetailsForm from "./showSisterDetails";
import AddWardDetailsForm from "./editBasicWardDetails";
import AddNewWardForm from "./newWard";

export default function Matron() {
  const [wardName, setWardName] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [sisterName, setSisterName] = useState("");
  const [numberOfNurses, setNumberOfNurses] = useState("");
  const [position, setPosition] = useState();
  const [wards, setWard] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  {
    /*Form useState*/
  }
  const [isAddNurseFormOpen, setAddNurseFormOpen] = useState(false);
  const [isStaffDetailsFormOpen, setStaffDetailsFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allWards = await fetchAllWards();
        const positionData = await fetchPosition();
        setWard(allWards);
        setPosition(positionData);

        if (positionData === "matron") {
          setWardName("");
          setWardNumber("");
          setSisterName("");
          setNumberOfNurses("");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  {
    /*edit Ward details form related*/
  }

  const [isEditBasicWardDetailsDialogOpen, setEditBasicWardDetailsDialogOpen] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWardData();
        setWardName(data.wardName);
        setWardNumber(data.wardNumber);
        setSisterName(data.sisterName);
        setNumberOfNurses(data.numberOfNurses);
      } catch (error) {
        console.error("Error fetching ward data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleEditBasicWardDetails = () => {
    setEditBasicWardDetailsDialogOpen(true);
  };

  const handleEditBasicWardDetailsSave = () => {
    setEditBasicWardDetailsDialogOpen(false);
  };

  {
    /*add new ward */
  }

  const [isNewWardFormOpen, setNewWardFormOpen] = useState(false);

  const handleNewWardForm = () => {
    setNewWardFormOpen(false);
  };

  {
    /*select ward field function */
  }
  const handleWardChange = async (selectedWard) => {
    try {
      const data = await fetchWardData_matron(selectedWard);
      setWardName(data.wardName);
      setWardNumber(data.wardNumber);
      setSisterName(data.sisterName);
      setNumberOfNurses(data.numberOfNurses);
    } catch (error) {
      console.error("Error fetching ward data:", error.message);
    }
  };

  const handleAddNurse = (values) => {
    // Handle adding nurse logic here
    console.log("Adding nurse:", values);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 16, margin: 30 }}>
          <form>
            {position && position !== "nurse" && wards && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    label="Select the ward"
                    name="ward"
                    select
                    disabled={position === "sister"}
                    onChange={(e) => {
                      setSelectedWard(e.target.value);
                      handleWardChange(e.target.value);
                    }}
                  >
                    {wards.map((ward) => (
                      <MenuItem key={ward} value={ward}>
                        {ward}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  {/*edit ward details form*/}
                  <Button
                    variant="outlined"
                    size="medium"
                    style={{ margin: "20px" }}
                    startIcon={<EditIcon />}
                    onClick={() => setEditBasicWardDetailsDialogOpen(true)}
                  >
                    Edit basic ward details
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  {/*add new ward form*/}
                  <Button
                    variant="outlined"
                    disabled={position === "sister"}
                    size="medium"
                    style={{ margin: "20px" }}
                    startIcon={<AddIcon />}
                    onClick={() => setNewWardFormOpen(true)}
                  >
                    Add new ward
                  </Button>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Ward name"
                  name="wardName"
                  value={wardName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Ward number"
                  name="wardNumber"
                  value={wardNumber}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  label="Sister name"
                  name="sisterName"
                  value={sisterName}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      //sister detail form
                      <Button
                        variant="outlined"
                        size="medium"
                        style={{ margin: "20px" }}
                        onClick={() => setStaffDetailsFormOpen(true)}
                      >
                        More
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  label="Number of nurses in the ward"
                  name="numberOfNurses"
                  value={numberOfNurses}
                  fullWidth
                />
              </Grid>
            </Grid>
            {position !== "nurse" && (
              //add nurse or sister form
              <Button
                variant="outlined"
                size="medium"
                style={{ margin: "20px" }}
                startIcon={<AddIcon />}
                onClick={() => setAddNurseFormOpen(true)}
              >
                Add staff member
              </Button>
            )}
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 16, margin: 10 }}>
          <NursesTable />
        </Paper>
      </Grid>

      {/* Integrate Add nurse/sister form as a popup */}
      <AddNurseForm
        open={isAddNurseFormOpen}
        handleClose={() => setAddNurseFormOpen(false)}
        handleAddNurse={handleAddNurse}
      />

      {/* Integrate edit and show sister details form as a popup */}
      <StaffDetailsForm
        open={isStaffDetailsFormOpen}
        handleClose={() => setStaffDetailsFormOpen(false)}
        initialSisterName={sisterName}
      />

      {/* Integrate AddWardDetailsForm as a popup */}
      <AddWardDetailsForm
        open={isEditBasicWardDetailsDialogOpen}
        handleClose={() => setEditBasicWardDetailsDialogOpen(false)}
        handleWardDetails={handleEditBasicWardDetailsSave}
      />

      {/* Integrate AddNewWardForm as a popup */}
      <AddNewWardForm
        open={isNewWardFormOpen}
        handleClose={() => setNewWardFormOpen(false)}
        handleWardDetails={handleNewWardForm}
      />
    </Grid>
  );
}
