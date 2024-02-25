import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, MenuItem, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NursesTable from "./table";
import AddIcon from "@mui/icons-material/Add";
import {
  fetchWardData,
  fetchAllWards,
  fetchWardData_matron as fetchSelectedWardData,
  fetchPosition,
} from "../../Data/wardDetails/wardService";
import AddStaffMemberForm from "../Forms/addNurses";
import StaffDetailsForm from "../Forms/showSisterDetails";
import AddWardDetailsForm from "../Forms/editBasicWardDetails";
import AddNewWardForm from "../Forms/newWard";
import { addNurseService } from "../../Data/wardDetails/nursesService";

export default function Matron() {
  const [wardName, setWardName] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [sisterName, setSisterName] = useState("");
  const [numberOfNurses, setNumberOfNurses] = useState("");
  const [position, setPosition] = useState();
  const [wards, setWard] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  {
    /*============================Initial field values fetching====================*/
  }

  useEffect(() => {
    //fetchData is a asynchronous function. That means operations are those that don't block the execution of code.
    //Instead of waiting for one operation to complete before moving on to the next.
    const fetchData = async () => {
      try {
        const allWards = await fetchAllWards(); //This line calls a function fetchAllWards() and waits for it to complete before moving on to the next line
        const positionData = await fetchPosition();
        const data = await fetchWardData();
        setWard(allWards);
        setPosition(positionData);

        if (positionData === "matron") {
          setWardName("");
          setWardNumber("");
          setSisterName("");
          setNumberOfNurses("");
        } else {
          setWardName(data.wardName);
          setWardNumber(data.wardNumber);
          setSisterName(data.sisterName);
          setNumberOfNurses(data.numberOfNurses);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []); //dependency array empty means useEffeect run only one time

  {
    /*=======================Add a staff member form=============================*/
  }
  const [isAddNurseFormOpen, setAddNurseFormOpen] = useState(false);
  const [isStaffDetailsFormOpen, setStaffDetailsFormOpen] = useState(false);
  // Add this state variable at the beginning of your Matron component
  // const [isNursesTableVisible, setNursesTableVisible] = useState(true);
  const [nursesTableKey, setNursesTableKey] = useState(0);

  const handleAddNurse = (values) => {
    // Handle adding nurse logic here
    addNurseService(values);

    // // Update the state to make NursesTable visible
    // setNursesTableVisible(true);

    // Change the key to trigger a reload of the NursesTable
    setNursesTableKey((prevKey) => prevKey + 1);

    // Close the form
    setAddNurseFormOpen(false);
  };

  {
    /*================================add new ward=======================*/
  }

  const [isNewWardFormOpen, setNewWardFormOpen] = useState(false);

  const handleNewWardForm = () => {
    setNewWardFormOpen(false);
  };

  {
    /*=====================edit Ward details form related========================*/
  }

  const [isEditBasicWardDetailsDialogOpen, setEditBasicWardDetailsDialogOpen] =
    useState(false);

  const handleEditBasicWardDetailsSave = async (editedValues) => {
    console.log("edited values : ", editedValues);
    try {
      setWardName(editedValues.wardName);
      setWardNumber(editedValues.wardNumber);
      setSisterName(editedValues.sisterName);
      setNumberOfNurses(editedValues.numberOfNurses);
    } catch (error) {
      console.error("Error updating state:", error.message);
    } finally {
      setEditBasicWardDetailsDialogOpen(false);
    }
  };

  {
    /*===================selected ward field function=========================*/
  }
  const handleWardChange = async (selectedWard) => {
    try {
      const data = await fetchSelectedWardData(selectedWard);
      setWardName(data.wardName);
      setWardNumber(data.wardNumber);
      setSisterName(data.sisterName);
      setNumberOfNurses(data.numberOfNurses);
    } catch (error) {
      console.error("Error fetching ward data:", error.message);
    }
  };

  {
    /*=======================User interrface==============================*/
  }

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
                    disabled={selectedWard === "" && position === "matron"}
                    onClick={() => {
                      setEditBasicWardDetailsDialogOpen(true);
                    }}
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
                  disabled={selectedWard === "" && true}
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
                  disabled={selectedWard === "" && true}
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
                  disabled={selectedWard === "" && true}
                  InputProps={{
                    endAdornment: (
                      //sister detail form
                      <Button
                        variant="outlined"
                        size="medium"
                        style={{ margin: "20px" }}
                        disabled={selectedWard === "" && position === "matron"}
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
                  disabled={selectedWard === "" && true}
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
                disabled={selectedWard === "" && position === "matron"}
                onClick={() => setAddNurseFormOpen(true)}
              >
                Add staff member
              </Button>
            )}
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 16, marginTop: -20 }}>
          {<NursesTable key={nursesTableKey} />}
        </Paper>
      </Grid>

      {/* Integrate Add nurse/sister form as a popup */}
      <AddStaffMemberForm
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
