import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, MenuItem, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NursesTable from "./table";
import AddIcon from "@mui/icons-material/Add";
import AddStaffMemberForm from "../Forms/addNurses";
import StaffDetailsForm from "../Forms/showSisterDetails";
import AddWardDetailsForm from "../Forms/editBasicWardDetails";
import AddNewWardForm from "../Forms/newWard";
import { addNurseService } from "../../Data/wardDetails/nursesService";
import { useAuth } from "../../Security/AuthContext";
import { retrieveWardNames } from "../../Services/WardDetails/WardDetailsServices";
import { retrieveWardData } from "../../Services/WardDetails/WardDetailsServices";
import { retrieveWardDataOfLoggedUser } from "../../Services/WardDetails/WardDetailsServices";

export default function WardManagement() {
  const [wardName, setWardName] = useState("");
  const [wardNo, setwardNo] = useState("");
  const [sisterName, setSisterName] = useState("");
  const [numberOfNurses, setNumberOfNurses] = useState("");
  const [position, setPosition] = useState();
  const [wards, setWard] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  /*Re render the use effect after the new ward form*/
  const [isAddNewSubmitted, setIsAddNewSubmitted] = useState(false);
  const [isWardDataEdited, setIsWardDataEdited] = useState(false);
  const [isWardSelect, setIsWardSelect] = useState(false);
  const [isPressMore, setIsPressMore] = useState(false);

  {
    /*============================Initial field values fetching====================*/
  }
  const authContext = useAuth();

  useEffect(() => {
    //fetchData is a asynchronous function. That means operations are those that don't block the execution of code.
    //Instead of waiting for one operation to complete before moving on to the next.
    const fetchData = async () => {
      try {
        const loggedUsername = authContext.username;
        const positionData = authContext.position;

        setPosition(positionData);

        if (positionData === "Matron") {
          const response = await retrieveWardNames(loggedUsername);
          const allWards = response.wardName;
          setWard(allWards);
          if (isWardSelect === true) {
            const response = await retrieveWardData(selectedWard);
            console.log("hhhhhhhhhhhhhhhhhh", response);
            setWardName(response.wardName);
            setwardNo(response.wardNo);
            setSisterName(response.sisterName);
            setNumberOfNurses(response.numberOfNurses);
          }
        } else {
          const data = await retrieveWardDataOfLoggedUser(authContext.username);
          setWardName(data.wardName);
          setwardNo(data.wardNo);
          setSisterName(data.sisterName);
          setNumberOfNurses(data.numberOfNurses);
          setIsWardSelect(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [position, isAddNewSubmitted, isWardDataEdited, selectedWard]); //dependency array empty means useEffeect

  {
    /*=======================Add a staff member form=============================*/
  }
  const [isAddNurseFormOpen, setAddNurseFormOpen] = useState(false);
  const [isStaffDetailsFormOpen, setStaffDetailsFormOpen] = useState(false);
  const [nursesTableKey, setNursesTableKey] = useState(0);

  const handleAddNurse = (values) => {
    // Handle adding nurse logic here
    addNurseService(values);

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
    setIsAddNewSubmitted(true);
  };

  {
    /*=====================edit Ward details form related========================*/
  }

  const [isEditBasicWardDetailsDialogOpen, setEditBasicWardDetailsDialogOpen] =
    useState(false);

  const handleEditBasicWardDetailsSave = async (editedValues) => {
    try {
      setWardName(editedValues.wardName);
      setwardNo(editedValues.wardNo);
      setSisterName(editedValues.sisterName);
      setNumberOfNurses(editedValues.numberOfNurses);
      setIsWardDataEdited((prev) => !prev);
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
      setIsWardSelect(true);
      const data = await retrieveWardData(selectedWard);
      setWardName(data.wardName);
      setwardNo(data.wardNo);
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
        <Paper elevation={3} style={{ padding: 15, margin: 30 }}>
          <form>
            {position && position !== "Nurse" && wards && (
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
                    disabled={position === "Sister"}
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
                    disabled={selectedWard === "" && position === "Matron"}
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
                    disabled={position === "Sister"}
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
                  name="wardNo"
                  value={wardNo}
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
                        disabled={selectedWard === "" && position === "Matron"}
                        onClick={() => {
                          setStaffDetailsFormOpen(true);
                          setIsPressMore(true);
                        }}
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
            {position !== "Nurse" && (
              //add nurse or sister form
              <Button
                variant="outlined"
                size="medium"
                style={{ margin: "20px" }}
                startIcon={<AddIcon />}
                disabled={selectedWard === "" && position === "Matron"}
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
          {
            <NursesTable
              key={nursesTableKey}
              wardNo={wardNo}
              isWardSelect={isWardSelect}
            />
          }
        </Paper>
      </Grid>

      {/* Integrate Add nurse/sister form as a popup */}
      <AddStaffMemberForm
        open={isAddNurseFormOpen}
        handleClose={() => setAddNurseFormOpen(false)}
        handleAddNurse={handleAddNurse}
        wardNoOfSisterOrMatron={wardNo}
      />

      {/* Integrate edit and show sister details form as a popup */}
      <StaffDetailsForm
        open={isStaffDetailsFormOpen}
        handleClose={() => setStaffDetailsFormOpen(false)}
        sisterWardNo={wardNo}
        isPressMore={isPressMore}
        isWardSelect={isWardSelect}
        onUpdateSisterName={(newSisterName) => setSisterName(newSisterName)}
      />

      {/* Integrate AddWardDetailsForm as a popup */}
      <AddWardDetailsForm
        open={isEditBasicWardDetailsDialogOpen}
        handleClose={() => setEditBasicWardDetailsDialogOpen(false)}
        handleWardDetails={handleEditBasicWardDetailsSave}
        isWardSelect={isWardSelect}
        selectedWard={selectedWard}
        onClose={() => handleWardChange(selectedWard)}
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
