import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useAuth } from "../../Security/AuthContext.js";
import Theme from "../../Component/Theme.jsx";

export default function ShiftGrid(data) {
  const theme = Theme();
  const [dailyGrid, setDailyGrid] = useState([]);

  const authContext = useAuth();

  useEffect(() => {
    setDailyGrid(data);
  }, [data]);

  const handleAssign = () => {
    console.log("Handle assign clicked");
  };

  return (
    <div style={{ width: "100%", overflowY: "auto", maxHeight: "100%" }}>
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
                Name
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                }}
              >
                Service time
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                }}
              >
                Working hours/week
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                }}
              >
                Assign/Not
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((item) => (
              <TableRow key={item.fullName}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.serviceTime}</TableCell>
                <TableCell>{item.workingHours}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: theme.palette.success.main,
                    }}
                    onClick={() => handleAssign()}
                  >
                    Assign
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
