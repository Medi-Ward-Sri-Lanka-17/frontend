import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Theme from "../../Component/Theme.jsx";

export default function DailyDutyGrid({ isViewSelected, wardNo }) {
  const theme = Theme();
  const [tableData, setTableData] = useState([]);
  const [loggedUserPosition, setLoggedUserPosition] = useState();

  useEffect(() => {
    // Simulated backend data
    const rawStaffData = [
      {
        fullName: "John Doe",
        shift: "Morning",
      },
      {
        fullName: "Jane Smith",
        shift: "Morning",
      },
      {
        fullName: "Alice Johnson",
        shift: "Morning",
      },
      {
        fullName: "Ali John",
        shift: "Evening",
      },
      {
        fullName: "Jadne kenet",
        shift: "Evening",
      },
      {
        fullName: "sam henry",
        shift: "Evening",
      },
      {
        fullName: "harry Smith",
        shift: "Night",
      },
      {
        fullName: "Ray beiber",
        shift: "Night",
      },
      {
        fullName: "shreak park",
        shift: "Night",
      },
      {
        fullName: "kate villiam",
        shift: "Morning",
      },
      {
        fullName: "rose haper",
        shift: "Evening",
      },
      {
        fullName: "soya lander",
        shift: "Night",
      },
    ];

    setTableData(rawStaffData);

    // Simulated authentication context
    const position = "Matron";
    setLoggedUserPosition(position);
  }, []);

  const handleRemove = (index) => {
    // Remove the data at the specified index
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  return (
    <div style={{ width: "100%", margin: "1%", maxHeight: "50%" }}>
      {/* Custom Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            style={{
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <TableRow>
              <TableCell
                style={{
                  color: "white",
                }}
              >
                Morning Shift
              </TableCell>

              <TableCell
                style={{
                  color: "white",
                }}
              >
                Evening Shift
              </TableCell>

              <TableCell
                style={{
                  color: "white",
                }}
              >
                Night Shift
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>
                  {data.shift === "Morning" && data.fullName}
                  {!isViewSelected && data.shift === "Morning" && (
                    // Conditionally render delete icon
                    <IconButton onClick={() => handleRemove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  {data.shift === "Evening" && data.fullName}
                  {!isViewSelected && data.shift === "Evening" && (
                    // Conditionally render delete icon
                    <IconButton onClick={() => handleRemove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  {data.shift === "Night" && data.fullName}
                  {!isViewSelected && data.shift === "Night" && (
                    // Conditionally render delete icon
                    <IconButton onClick={() => handleRemove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
