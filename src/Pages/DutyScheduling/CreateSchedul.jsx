import React, { useState, useEffect } from "react";
import Header from "../../Component/Header";
import SideBar from "../../Component/SideBar";
import { Box, Button } from "@mui/material";
import Calendar from "react-calendar";
import DailyDutyGrid from "./DailyDutyGrid";
import "react-calendar/dist/Calendar.css";
import "./calenderStyleCreate.css";
import ShiftGrid from "./ShiftGrid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useAuth } from "../../Security/AuthContext.js";
import { showInfoAlert } from "../../Component/ShowAlert";
import { retrveCandidateList } from "../../Services/Scheduling/AddSchedulingServices.js";
import { retrieveProfilePicture } from "../../Services/Home/retrieveProfilePicture.js";
import { retriveSchduleOtherStaff } from "../../Services/Scheduling/ViewSchedulingServices.js";

const CreateSchedule = () => {
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


  
//..................................Profile Picture...........................................................

const proImgUrl=authContext.proPicUrl;

//............................................................................................................

  const [date, setDate] = useState(null);
  const [scheduleCreatedStatusForDay, setScheduleCreatedStatusForDay] =
    useState(0);
  const [scheduleCreatedStatusForMonth, setScheduleCreatedStatusForMonth] =
    useState("none");
  const [selectedShift, setSelectedShift] = useState(null);
  const [isCasultyDay, setIsCasualtyDay] = useState(false);
  const [isViewSelected] = useState(false);

  const [loggedUserPosition, setLoggedUserPosition] = useState();
  const [loggedUserNic, setLoggedUserNic] = useState(); //LOGGEd USER NIC
  const [currentMonth, setCurrentMonth] = useState(""); // CURRENT MONTH
  const [candidate, setCandidate] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);

  // const authContext = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      var date1 = formatDate(date);
      var data = await retriveSchduleOtherStaff(nic, date1);
      console.log(data);
      setScheduleData(data);
    };

    var pos = authContext.position;
    var nic = authContext.nic;

    setLoggedUserPosition(pos);
    setLoggedUserNic(nic);

    console.log(loggedUserPosition);
    console.log(loggedUserNic);
    console.log(currentMonth);

    setScheduleCreatedStatusForDay(2);
    setIsCasualtyDay(true);
    fetchData();
  }, [
    scheduleCreatedStatusForMonth,
    scheduleCreatedStatusForDay,
    loggedUserPosition,
    loggedUserNic,
    currentMonth,
    date,
  ]);

  function formatDate(dateObject) {
    if (!dateObject) return ""; // Return an empty string if dateObject is null
    const year = dateObject.getFullYear();
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObject.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  const onActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(
      activeStartDate.toLocaleString("default", { month: "long" })
    );
  };

  const onChange = (selectedDate) => {
    setDate(selectedDate);
    console.log(selectedDate);
  };

  const matronApproval = () => {
    setScheduleCreatedStatusForMonth("pending");
    setScheduleCreatedStatusForDay(1);
    console.log(scheduleCreatedStatusForMonth);
  };

  const handleShiftSelection = async (shift) => {
    console.log(date);
    setSelectedShift(shift);

    if (date === null) {
      console.log("date empty");
      showInfoAlert("Pick a date");
      setCandidate([]);
    } else {
      const response = await retrveCandidateList(
        authContext.user.nic,
        shift,
        formatDate(date)
      );

      console.log(response);

      setCandidate(response);
    }
  };

  // Function to determine the tile content based on scheduleCreatedStatusForDay
  const getTileContent = ({ date, view }) => {
    let tileClassName = "";
    let label = null;

    // Check if it's a Casualty day
    if (isCasultyDay) {
      label = "Cas";
    }
    switch (scheduleCreatedStatusForDay) {
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

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box className="PageContent" style={{ width: "100%" }}>
        {/* <Header title="CREATE SCHEDULE" proImgUrl={proImgUrl} /> */}
        {<Header title="CREATE SCHEDULE" proImgUrl={proImgUrl} />}
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
                flex: "1",
                display: "flex",
                padding: "3%",
                margin: "1%",
                flexDirection: "column",
                backgroundColor: "white",
                justifyContent: "space-between",
                maxHeight: "435px",
              }}
            >
              <Box
                style={{
                  marginBottom: "2%",
                  padding: "2%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ToggleButtonGroup
                  value={selectedShift}
                  exclusive
                  //onChange={handleShiftSelection}
                  aria-label="Platform"
                >
                  <ToggleButton
                    value="Morning"
                    onClick={() => handleShiftSelection("Morning")}
                    style={{
                      backgroundColor:
                        selectedShift === "Morning" ? "#31757e" : "#90b4b9",
                      color: "white",
                    }}
                  >
                    Morning
                  </ToggleButton>
                  <ToggleButton
                    value="Evening"
                    onClick={() => handleShiftSelection("Evening")}
                    style={{
                      backgroundColor:
                        selectedShift === "Evening" ? "#31757e" : "#90b4b9",
                      color: "white",
                    }}
                  >
                    Evening
                  </ToggleButton>
                  <ToggleButton
                    value="Night"
                    onClick={() => handleShiftSelection("Night")}
                    style={{
                      backgroundColor:
                        selectedShift === "Night" ? "#31757e" : "#90b4b9",
                      color: "white",
                    }}
                  >
                    Night
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Box
                style={{
                  width: "100%",
                  padding: "1px",
                  margin: "1%",
                  maxHeight: "78%",
                }}
              >
                <ShiftGrid data={candidate} date={date} shift={selectedShift} />
              </Box>
            </Box>
            <Box
              style={{
                marginleft: "1%",
                margin: "1%",
                padding: "2%",
                backgroundColor: "white",
                width: "40%",
              }}
            >
              <Calendar
                onChange={onChange}
                onActiveStartDateChange={onActiveStartDateChange}
                value={date}
                className="custom-calendar"
                tileContent={getTileContent}
              />
            </Box>
          </Box>
          <DailyDutyGrid
            isViewSelected={isViewSelected}
            schedule={scheduleData}
            selectedDate={date}
            shift={selectedShift}
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => matronApproval()}
            >
              Matron Approval
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateSchedule;
