import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField"; // Import TextField for the search bar
import { getNurses } from "../../Data/wardDetails/nursesService.js";

export default function NursesTable() {
  const [nurses, setNurses] = useState([]);
  const [filteredNurses, setFilteredNurses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const fetchedNurses = await getNurses();
        setNurses(fetchedNurses);
        setFilteredNurses(fetchedNurses); // Initially set filteredNurses to all nurses
      } catch (error) {
        console.error("Error fetching nurses:", error);
      }
    };

    fetchNurses();
  }, []);

  useEffect(() => {
    // Filter nurses based on the search query when it changes
    const filtered = nurses.filter((nurse) =>
      nurse.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNurses(filtered);
  }, [searchQuery, nurses]);

  const handleDelete = (id) => {
    console.log(`Delete clicked for ID ${id}`);
    // Add your delete logic here
  };

  const handleMoreButtonClick = (event, id) => {
    // Handle the "More" button click and show additional actions or a menu
    console.log(`More clicked for ID ${id}`);
    // You can implement logic to display a menu or popover with additional actions here
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "mobileNo", headerName: "Mobile No", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },

    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>

          {/* <Button
            variant="outlined"
            color="default"
            onClick={(event) => handleMoreButtonClick(event, params.row.id)}
            sx={{ marginLeft: 8, height: 36 }}
          >
            More
          </Button> */}
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* DataGrid with filtered nurses */}
      <DataGrid
        rows={filteredNurses}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}
