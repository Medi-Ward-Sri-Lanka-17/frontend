import { apiClient } from "../../Api/ApiClient";

//add a new ward
export const addWard = async (value) => {
  try {
    console.log(value);
    const response = await apiClient.post("/add-ward", value);
    return response.status;
  } catch (err) {
    throw new Error("Couldn't add a new ward");
  }
};

//add a new staff member
export const addStaff = async (value) => {
  try {
    console.log(value);
    const response = await apiClient.post("/add-staff", value);
    return response.status;
  } catch (err) {
    throw new Error("Couldn't add a new staff member");
  }
};

//retrieve all ward numbers to add a staff member
export const retrieveWardNumbers = async () => {
  try {
    const response = await apiClient.get("/get-ward-numbers");
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retieve ward numbers");
  }
};

//retieve all ward names relevant to a matron
export const retrieveWardNames = async (username) => {
  try {
    const response = await apiClient.get(`/get-ward-names/${username}`);
    console.log("ward names in service file");
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve ward names");
  }
};

//retreive selected ward data
export const retrieveWardData = async (wardName) => {
  try {
    const response = await apiClient.get(`/show-ward/${wardName}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data");
  }
};
