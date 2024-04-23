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

import { useAuth } from "../../Security/AuthContext.js";
import Theme from "../../Component/Theme.jsx";

export default function DailyDutyGrid({ data, isViewSelected }) {
  const theme = Theme();
  const [tabledata, setData] = useState([data]);
  const [loggedUserPosition, setLoggedUserPosition] = useState();

  const authContext = useAuth();
  useEffect(() => {
    var position = authContext.position;
    setLoggedUserPosition(position);
    console.log(isViewSelected);
  }, []);

  const handleRemove = (index) => {
    // Remove the data at the specified index
    const newData = [...tabledata];
    newData.splice(index, 1);
    setData(newData);
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
            {tabledata.map((data, index) => (
              <TableRow key={data.fullName}>
                <TableCell>
                  {data.fullName}
                  {!isViewSelected && ( // Conditionally render delete icon
                    <IconButton onClick={() => handleRemove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  {data.fullName}
                  {!isViewSelected && ( // Conditionally render delete icon
                    <IconButton onClick={() => handleRemove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  {data.fullName}
                  {!isViewSelected && ( // Conditionally render delete icon
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
