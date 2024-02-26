// nurseService.js

//import axios from 'axios';

//const API_URL = 'your_api_url_here';

const rows = [
  {
    id: 1,
    serviceId: "199965500338",
    fullName: "John Doe",
    mobileNo: "0775521604",
    email: "dilki99hansapani@gmail.com",
  },
  {
    id: 2,
    serviceId: "199965852845",
    fullName: "Jane Smith",
    mobileNo: "0766640472",
    email: "dilkihansapani789@gmail.com",
  },
  {
    id: 3,
    serviceId: "199965880047",
    fullName: "Bob Johnson",
    mobileNo: "0774100672",
    email: "bob99john@gmail.com",
  },
];

export const addNurseService = (newNurse) => {
  console.log("addNurseService values", newNurse);
  // Add the new nurse to the existing array

  rows.push({
    id: rows.length + 1,
    serviceId: newNurse.serviceId,
    fullName: newNurse.fullName,
    mobileNo: newNurse.mobileNo,
    email: newNurse.email,
  });
  getNurses();
};

export const getNurses = async () => {
  try {
    //const response = await axios.get(`${API_URL}/nurses`);

    //return response.data;
    console.log("table triggered");
    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Error fetching nurses:", error);
    throw error;
  }
};
