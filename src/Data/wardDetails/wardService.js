// const API_URL = 'https://api.example.com/wardData';

//retrieve datafrom database according to the nurse or sister (their relevent ward details)
const response = {
  wardName: "Test Ward",
  wardNumber: "13",
  sisterName: "Sister Jane",
  numberOfNurses: "5",
  //position:....
};

const wards = ["Accident ward", "surgical ward-men", "surgical ward-women"]; // retrieve wards from database

export const fetchPosition = async () => {
  try {
    const response = {
      position: "nurse", // Replace 'matron' with the actual position data
    };

    return response.position.toLowerCase(); // Directly return the lowercase position
  } catch (error) {
    console.error("Error fetching position data:", error.message);
    throw error;
  }
};

export const fetchWardData = async () => {
  try {
    // const data = await response.json();
    return response; // Directly return the response object
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const shiftData = { morningShift: 7, eveningShift: 5, nightShift: 6 };

export const fetchShiftData = async () => {
  try {
    // const data = await response.json();
    return shiftData; // Directly return the response object
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const fetchAllWards = async () => {
  try {
    // const data = await response.json();
    return wards; // Directly return the response object
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export async function fetchWardData_matron(wardname) {
  try {
    //const response = await fetch(`/api/wardData/${wardName}`);

    const response = {
      wardName: wardname,
      wardNumber: "10",
      sisterName: "W G Indrani",
      numberOfNurses: "15",
    };
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch ward data. Status: ${response.status}`);
    // }
    //const data = await response.json();
    return response; // Assuming data has properties wardName, wardNumber, sisterName, numberOfNurses, position
  } catch (error) {
    throw new Error(`Error fetching ward data: ${error.message}`);
  }
}
