import React, { useState, useEffect } from "react";
import Header from "../../Component/Header";
import SideBar from "../../Component/SideBar";
import { Box, Button } from "@mui/material";
import Calendar from "react-calendar";
import DailyDutyGrid from "./DailyDutyGrid";
import "react-calendar/dist/Calendar.css";
import "./calenderStyles.css";
import { useAuth } from "../../Security/AuthContext.js";

const ViewSchedule = () => {
  const [date, setDate] = useState(new Date());
  const [scheduleCreatedStatus, setScheduleCreatedStatus] = useState(0);
  const [isViewSelected, setIsViewSelected] = useState(false);
  const [isCasultyDay, setIsCasualtyDay] = useState(false);
  const [hoveredDateInfo, setHoveredDateInfo] = useState(null);
  const [loggedUserPosition, setLoggedUserPosition] = useState();

  const authContext = useAuth();

  useEffect(() => {
    var pos = authContext.position;
    setLoggedUserPosition(pos);
    console.log(loggedUserPosition);
    setIsViewSelected(true);
    setScheduleCreatedStatus(2);
    setIsCasualtyDay(true);
    console.log(isViewSelected);
  }, [isViewSelected, loggedUserPosition]);

  const dummyData = [
    {
      fullName: "John Doe",
      serviceTime: "Morning",
      workingHours: 40,
    },
    {
      fullName: "Jane Smith",
      serviceTime: "Evening",
      workingHours: 36,
    },
    {
      fullName: "Alice Johnson",
      serviceTime: "Night",
      workingHours: 48,
    },
    {
      fullName: "Ali John",
      serviceTime: "Morning",
      workingHours: 50,
    },
    {
      fullName: "Jaden Suith",
      serviceTime: "Evening",
      workingHours: 51,
    },
    {
      fullName: "Nan Smith",
      serviceTime: "Evening",
      workingHours: 36,
    },
    {
      fullName: "Sam Smith",
      serviceTime: "Evening",
      workingHours: 36,
    },
  ];

  useEffect(() => {
    setIsViewSelected(true);
    setScheduleCreatedStatus(2);
    setIsCasualtyDay(true);
    console.log(isViewSelected);
  }, []);

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleDateHover = (date) => {
    // Simulated backend data
    const backendData = [
      { username: "user1", date: "2024-04-24", shift: "Morning" },
      { username: "user2", date: "2024-04-25", shift: "Evening" },
      { username: "user3", date: "2024-04-26", shift: "Night" },
    ];

    // Find the hovered date information from the backend data
    const hoveredDateInfo = backendData.find(
      (item) => item.date === date.toISOString().slice(0, 10)
    );

    setHoveredDateInfo(hoveredDateInfo);
  };

  // Function to determine the tile content based on scheduleCreatedStatus
  const getTileContent = ({ date, view }) => {
    let tileClassName = "";
    let label = null;

    // Check if it's a Casualty day
    if (isCasultyDay) {
      label = "Cas";
    }
    switch (scheduleCreatedStatus) {
      case 0:
        tileClassName = "no";
        break;
      case 1:
        tileClassName = "half";
        break;
      case 2:
        tileClassName = "completed";
        break;
      default:
        tileClassName = "";
    }
    return (
      <div className={tileClassName}>
        {label && <div className="casualty-label">{label}</div>}
      </div>
    );
  };
  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().slice(0, 10);
    return dateString === hoveredDateInfo?.date ? "hovered-date" : null;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box className="PageContent" style={{ width: "100%" }}>
        <Header title="CREATE SCHEDULE" />
        <Box>
          <Box
            style={{
              display: "flex",
              margin: "1%",
              padding: "2%",
              backgroundColor: "#243e4f1c",
            }}
          >
            <Box
              style={{
                marginLeft: "1%", // Correct the property name
                margin: "1%",
                padding: "2%",
                backgroundColor: "white",
                width: "40%",
              }}
            >
              <Calendar
                onChange={onChange}
                value={date}
                className="custom-calendar"
                tileContent={getTileContent}
                onMouseOverDay={handleDateHover} // Handle mouse over date
                onMouseLeave={() => setHoveredDateInfo(null)} // Clear hovered date info when leaving calendar
                tileClassName={tileClassName} // Apply custom classes to date tiles
              />
            </Box>
            <Box
              style={{
                flex: "1",
                display: "flex",
                padding: "2%",
                margin: "1%",
                flexDirection: "column",

                justifyContent: "space-between",
              }}
            >
              <DailyDutyGrid isViewSelected={isViewSelected} data={dummyData} />
              {hoveredDateInfo && (
                <div>
                  Shift: {hoveredDateInfo.shift} {/* Display shift info */}
                </div>
              )}
              {loggedUserPosition === "Matron" && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button variant="outlined" color="primary">
                    Approve
                  </Button>
                  <Button variant="outlined" color="error">
                    Reject
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewSchedule;
