// nurseService.js

//import axios from 'axios';

//const API_URL = 'your_api_url_here';

const rows = [
  {
    id: 1,
    serviceId: "199965500338",
    name: "John Doe",
    mobileNo: "0775521604",
    email: "dilki99hansapani@gmail.com",
  },
  {
    id: 2,
    serviceId: "199965852845",
    name: "Jane Smith",
    mobileNo: "0766640472",
    email: "dilkihansapani789@gmail.com",
  },
  {
    id: 3,
    serviceId: "199965880047",
    name: "Bob Johnson",
    mobileNo: "0774100672",
    email: "bob99john@gmail.com",
  },
];

export const getNurses = async () => {
  try {
    //const response = await axios.get(`${API_URL}/nurses`);

    //return response.data;
    return rows;
  } catch (error) {
    console.error("Error fetching nurses:", error);
    throw error;
  }
};
