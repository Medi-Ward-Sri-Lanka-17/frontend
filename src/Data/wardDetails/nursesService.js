// nurseService.js

//import axios from 'axios';

//const API_URL = 'your_api_url_here';

const rows = [
    { id: 1, name: 'John Doe', serviceId: 'S123' },
    { id: 2, name: 'Jane Smith', serviceId: 'S456' },
    { id: 3, name: 'Bob Johnson', serviceId: 'S789' },
  ];

export const getNurses = async () => {
  try {
    //const response = await axios.get(`${API_URL}/nurses`);
  
    //return response.data;
    return rows;
  } catch (error) {
    console.error('Error fetching nurses:', error);
    throw error;
  }
};
