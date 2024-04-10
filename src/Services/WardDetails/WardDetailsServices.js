import { apiClient } from "../../Api/ApiClient";

//add a new ward
export const addWard = async (value) => {
  try {
    console.log(value);
    const response = await apiClient.post("/add-ward", value);
    return response.status;
  } catch (err) {
    throw new Error("Couldn't add a new ward");
    console.error(err);
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

export const retrieveWardNumbers = async () => {
  try {
    const response = await apiClient.get("/get-ward-numbers");
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retieve ward numbers");
  }
};
