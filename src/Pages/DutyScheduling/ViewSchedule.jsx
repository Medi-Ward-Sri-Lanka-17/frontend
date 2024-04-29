import React, { useState, useEffect } from "react";
import Header from "../../Component/Header";
import SideBar from "../../Component/SideBar";
import { Box, Button } from "@mui/material";
import Calendar from "react-calendar";
import DailyDutyGrid from "./DailyDutyGrid";
import "react-calendar/dist/Calendar.css";
import "./calenderStyleView.css";
import { useAuth } from "../../Security/AuthContext.js";
import FadeMenu from "../../Component/FadeMenu.jsx";
import TextField from "@mui/material/TextField";
import { retrieveShiftOfUserOnDay } from "../../Services/Scheduling/ViewSchedulingServices.js";
import { showInfoAlert } from "../../Component/ShowAlert.jsx";
import { Height } from "@mui/icons-material";
import { retrieveProfilePicture } from "../../Services/Home/retrieveProfilePicture.js";
import { retriveSchduleOtherStaff } from "../../Services/Scheduling/ViewSchedulingServices.js";
import { retriveSchduleMatron } from "../../Services/Scheduling/ViewSchedulingServices.js";
import { retrieveWardNames } from "../../Services/WardDetails/WardDetailsServices.js";

const ViewSchedule = () => {
  //.............................................Load Profile Picture........................................................

  const authContext = useAuth();
  const nic = authContext.nic;

  const [proImgUrl, setProImgUrl] = useState(null);

  useEffect(() => {
    refreshPropilePicture(nic);
  }, []);

  useEffect(() => {
    refreshPropilePicture(nic);
  }, []);

  async function refreshPropilePicture(nic) {
    const response = await retrieveProfilePicture(nic);
    setProImgUrl(response);
  }

  //............................................................................................................................

  const [date, setDate] = useState(new Date());
  const [scheduleCreatedStatus, setScheduleCreatedStatus] = useState(0);
  const [isViewSelected, setIsViewSelected] = useState(false);
  const [isCasultyDay, setIsCasualtyDay] = useState(false); //STATUS FOR CHECK THE DATE IS A CASUALTY DAY
  const [loggedUserPosition, setLoggedUserPosition] = useState(); //lOGGED USER NIC (SISTER)
  const [loggedUserNic, setLoggedUserNic] = useState(); //LOGGEd USER NIC
  const [currentMonth, setCurrentMonth] = useState(""); // CURRENT MONTH
  const [scheduleApprove, setScheduleApprove] = useState(false);
  const [nurseData, setNurseData] = useState({});
  const [wardNames, setWardNames] = useState([]); //WARD NUMBER LIST TO PASS TO THEFADEDmENU COMPONENT
  const [selectedWard, setSelectedWard] = useState(); //SELECTED WARD OF THE DROPDOWN
  const [userShiftOnDate, setUserShiftOnDate] = useState(""); // Shift of logged in user on selected date
  const [scheduleData, setScheduleData] = useState([]);

  // const authContext = useAuth();

  useEffect(() => {
    var position = authContext.position;
    setLoggedUserPosition(position);

    const fetchData = async () => {
      var date1 = formatDate(date);
      if (authContext.position === "Matron") {
        var wardNames = await retrieveWardNames(authContext.username);
        console.log(wardNames.wardName);
        setWardNames(wardNames.wardName);
        var data = await retriveSchduleMatron(selectedWard, date1);
        setScheduleData(data);
      } else {
        var data = await retriveSchduleOtherStaff(nic, date1);
        console.log(data);
        setScheduleData(data);
      }
    };
    function formatDate(dateObject) {
      const year = dateObject.getFullYear();
      const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
      const day = ("0" + dateObject.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }

    setIsViewSelected(true);
    setScheduleCreatedStatus(0);
    setIsCasualtyDay(true);
    fetchData();

    console.log(scheduleCreatedStatus);
    setCurrentMonth(new Date().toLocaleString("default", { month: "long" }));
  }, [scheduleCreatedStatus, loggedUserNic, loggedUserPosition, date]);

  //Take current calendar month
  const onActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(
      activeStartDate.toLocaleString("default", { month: "long" })
    );
  };

  const handleSelectedWard = (ward) => {
    setSelectedWard(ward);
  };

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

  const onChange = (selectedDate) => {
    //set the selected date
    setDate(selectedDate);

    // Find the shift of the logged user on the selected date
    // var response = retrieveShiftOfUserOnDay(loggedUserNic, date); // have to set shift to text field

    //check whether schedule created or not
    if (scheduleCreatedStatus === 1) {
      showInfoAlert("Schedule creration is pending");
    } else if (scheduleCreatedStatus === 0) {
      showInfoAlert("No schedule");
    }
  };

  const ApproveSchedule = () => {
    setScheduleApprove(true);
    setScheduleCreatedStatus(2);
  };

  const rejectSchedule = () => {
    setScheduleApprove(false);
    setScheduleCreatedStatus(1);
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

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box className="PageContent" style={{ width: "100%" }}>
        <Header title="VIEW SCHEDULE" proImgUrl={proImgUrl} />
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "2%", // Align items vertically
                }}
              >
                {loggedUserPosition === "Matron" && (
                  <FadeMenu
                    wardNames={wardNames}
                    onSelectWard={handleSelectedWard}
                  />
                )}
                {loggedUserPosition === "Nurse" && (
                  <TextField
                    id="outlined-required"
                    label="Shift/Shifts"
                    defaultValue={userShiftOnDate}
                    style={{ marginLeft: "10px" }} // Add margin to the left
                  />
                )}
              </div>
              <Calendar
                onChange={onChange}
                onActiveStartDateChange={onActiveStartDateChange}
                value={date}
                className="custom-calendar view-schedule"
                tileContent={getTileContent}
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
              <DailyDutyGrid
                isViewSelected={isViewSelected}
                data={scheduleData}
                wardNo={selectedWard}
                date={date}
              />

              {loggedUserPosition === "Matron" &&
                scheduleCreatedStatus === 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      marginTop: "20px",
                      margin: "10px",
                    }}
                  >
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="outlined"
                      color="primary"
                      onClick={() => ApproveSchedule()}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => rejectSchedule()}
                    >
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
