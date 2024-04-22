import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Theme from "../Theme";
import EditStaffMemberForm from "../Forms/editStaffMemberDetails.jsx";
import { useAuth } from "../../Security/AuthContext.js";
import { retrieveAllStaffMembers } from "../../Services/WardDetails/WardDetailsServices.js";
import { deleteNurseFromWard } from "../../Services/WardDetails/WardDetailsServices.js";
import { showSuccessAlert } from "../ShowAlert.jsx";

export default function NursesTable({ wardNo, isWardSelect }) {
  const theme = Theme();
  const [nurses, setNurses] = useState([]);
  const [filteredNurses, setFilteredNurses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedUserPosition, setLoggedUserPosition] = useState();
  const [condition, setCondition] = useState(false);

  const authContext = useAuth();

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        if (isWardSelect === true) {
          var fetchedNurses = await retrieveAllStaffMembers(wardNo);

          if (fetchNurses !== null) {
            setCondition(true);
          }
          const position = authContext.position;
          setNurses(fetchedNurses);
          setFilteredNurses(fetchedNurses); // Initially set filteredNurses to all nurses
          setLoggedUserPosition(position);
        } else {
          setFilteredNurses(null);
          console.log("no select ward");
        }
      } catch (error) {
        console.error("Error fetching nurses:", error);
      }
    };

    fetchNurses();
  }, [wardNo]);

  useEffect(() => {
    if (filteredNurses !== null) {
      const filtered = nurses.filter((nurse) => {
        const fullNameMatch =
          nurse.fullName && nurse.fullName.toLowerCase().includes(searchQuery);
        const nicMatch =
          nurse.nic && nurse.nic.toString().toLowerCase().includes(searchQuery);
        return fullNameMatch || nicMatch;
      });
      setFilteredNurses(filtered);
    }
  }, [searchQuery, nurses, wardNo]);

  useEffect(() => {
    setCondition(false);
  }, [wardNo]);

  //Function for delete button
  const handleDelete = (nic) => {
    console.log(`Delete clicked for ID ${nic}`);
    var response = deleteNurseFromWard(nic);
  };

  //Function for edit button
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedNurseId, setSelectedNurseId] = useState(null);

  const handleEdit = (nic) => {
    console.log(`Edit clicked for ID ${nic}`);
    setIsEditFormOpen(true);
    setSelectedNurseId(nic);
  };

  //Function for search button
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Custom Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            style={{
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <TableRow>
              {/* <TableCell
                style={{
                  color: "white",
                }}
              >
                ID
              </TableCell> */}

              <TableCell
                style={{
                  color: "white",
                }}
              >
                Service ID
              </TableCell>

              <TableCell
                style={{
                  color: "white",
                }}
              >
                Name
              </TableCell>

              <TableCell
                style={{
                  color: "white",
                }}
              >
                Mobile No
              </TableCell>

              <TableCell
                style={{
                  color: "white",
                }}
              >
                Email
              </TableCell>

              {loggedUserPosition !== "nurse" && (
                <>
                  <TableCell
                    style={{
                      color: "white",
                    }}
                  >
                    Edit details
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                    }}
                  >
                    Delete
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          {nurses !== null && filteredNurses !== null && (
            <TableBody>
              {filteredNurses.map((nurse) => (
                <TableRow key={nurse.nic}>
                  {/* <TableCell>{nurse.id}</TableCell> */}
                  <TableCell>{nurse.nic}</TableCell>
                  <TableCell>{nurse.fullName}</TableCell>
                  <TableCell>{nurse.mobileNo}</TableCell>
                  <TableCell>{nurse.email}</TableCell>
                  {loggedUserPosition !== "nurse" && (
                    <>
                      <TableCell>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: theme.palette.success.main,
                          }}
                          onClick={() => handleEdit(nurse.nic)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          style={{ color: "red", borderColor: "red" }}
                          onClick={() => handleDelete(nurse.nic)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* EditStaffMemberForm component */}
      <EditStaffMemberForm
        open={isEditFormOpen}
        handleClose={() => setIsEditFormOpen(false)}
        staffId={selectedNurseId}
        nic={selectedNurseId}
        // Add other necessary props
      />
    </div>
  );
}
