import { apiClient } from "../../Api/ApiClient";

//==============================ADD NEW WARD============================
//add a new ward
export const addWard = async (value) => {
  try {
    const response = await apiClient.post("/ward/add-ward", value);
    return response.status;
  } catch (err) {
    throw new Error("Couldn't add a new ward");
  }
};

//retirve available matrons
export const retrieveMatronNics = async (username) => {
  try {
    const response = await apiClient.get("/ward/get-all-matrons");
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve matron nics");
  }
};

//=======================ADD A STAFF MEMBER==============================

//add a new staff member
export const addStaff = async (value) => {
  try {
    const response = await apiClient.post("/add-staff", value);
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

//=========================BASIC WARD DETAILS===========================

//retieve all ward names relevant to a matron
export const retrieveWardNames = async (username) => {
  try {
    const response = await apiClient.get(`/get-ward-names/${username}`);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve ward names");
  }
};

//retreive selected basic ward data
export const retrieveWardData = async (wardName) => {
  try {
    const response = await apiClient.get(`/show-ward/${wardName}`);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data");
  }
};

//retreive basic ward data of the logged user
export const retrieveWardDataOfLoggedUser = async (username) => {
  try {
    const response = await apiClient.get(`/show-logged-user-ward/${username}`);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data");
  }
};

//retrieve sister details when logged user position not matron
export const retrieveSisterDetailsForOther = async (wardNo) => {
  try {
    const response = await apiClient.get(`/get-sister-details/${wardNo}`);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve sister details");
  }
};

//retrieve sister details when logged user position is matron
export const retrieveSisterDetailsForMatron = async (wardName) => {
  try {
    const response = await apiClient.get(
      `/get-sister-details-matron/${wardName}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve sister details");
  }
};

//send edited sister details values when matron logged
export const sendEditedSisterDetailsForMatron = async (values) => {
  try {
    const response = await apiClient.put(
      "/update-sister-details-matron",
      values
    );
    return response.data;
  } catch (err) {
    throw new Error("Couldn't edit ward details");
  }
};

//=========================EDIT WARD DATA==============================

//retrive full ward details for edit
export const retrieveBasicWardData = async (wardName) => {
  try {
    const response = await apiClient.get(`/show-fullward/${wardName}`);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data");
  }
};

//retrive full ward details for edit when sister log
export const retrieveBasicWardDataSister = async (username) => {
  try {
    const response = await apiClient.get(
      `/show-fullward-By-Sister/${username}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data");
  }
};

//send edited ward details values
export const sendEditedWardDetails = async (values) => {
  try {
    const response = await apiClient.put("/ward-sister-update", values);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error("Couldn't edit ward details");
  }
};

//retirve available sisters
export const retrieveSistersNics = async (username) => {
  try {
    const response = await apiClient.get("/show-available-sisters");
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve sister nics");
  }
};
