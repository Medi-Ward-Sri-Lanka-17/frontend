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
import { addDuty } from "../../Services/Scheduling/AddSchedulingServices.js";
import { showSuccessAlert } from "../../Component/ShowAlert.jsx";

export default function ShiftGrid({ data, date, shift }) {
  const theme = Theme();
  const [dailyGrid, setDailyGrid] = useState([]);

  const authContext = useAuth();

  useEffect(() => {
    setDailyGrid(data);

    console.log(data);
  }, [data]);

  const handleAssign = async (nic) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      const assigningData = {
        nurseNic: nic,
        date: formattedDate,
        dutyTime: shift,
      };
      var respone = await addDuty(authContext.nic, assigningData);

      console.log(respone);
      console.log(assigningData);
    } else {
      console.error("Date is undefined or null");
    }
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
            {data.map((item) => (
              <TableRow key={item.nic}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.serviceStartedDate}</TableCell>
                <TableCell>{item.workingHours}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: theme.palette.success.main,
                    }}
                    onClick={() => handleAssign(item.nic)}
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
