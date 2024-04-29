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

export default function DailyDutyGrid({ isViewSelected, wardNo, schedule }) {
  const theme = Theme();
  const [tableData, setTableData] = useState([]);
  const [loggedUserPosition, setLoggedUserPosition] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setTableData(schedule);
      console.log("Schedule data:", schedule); // Log the schedule data here
    };

    fetchData();
    // Simulated authentication context
    const position = "Matron";
    setLoggedUserPosition(position);
  }, [loggedUserPosition, schedule]);

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
            {schedule &&
              schedule.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {data.morning}
                    {!isViewSelected ||
                      (!data.morning === null && (
                        <IconButton onClick={() => handleRemove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      ))}
                  </TableCell>
                  <TableCell>
                    {data.evening}
                    {!isViewSelected ||
                      (!data.evening === "" && (
                        // Conditionally render delete icon
                        <IconButton onClick={() => handleRemove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      ))}
                  </TableCell>
                  <TableCell>
                    {data.night}
                    {!isViewSelected ||
                      (!data.night === "" && (
                        // Conditionally render delete icon
                        <IconButton onClick={() => handleRemove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
