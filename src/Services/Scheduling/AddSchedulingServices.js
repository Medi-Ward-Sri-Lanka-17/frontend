import { apiClient } from "../../Api/ApiClient";
import {
  showSuccessAlert,
  showUnsuccessAlert,
} from "../../Component/ShowAlert";

export const retrveCandidateList = async (nic, shift, date) => {
  try {
    const response = await apiClient.get(`/scheduling/candidates/${nic}`, {
      params: { shift: shift, date: date },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      showUnsuccessAlert(error.response.data);
    } else if (error.request) {
      console.error("Error Request:", error.request);
      showUnsuccessAlert("No response from server");
    } else {
      console.error("Error Message:", error.message);
      showUnsuccessAlert("Error: " + error.message);
    }
  }
};

export const addDuty = async (nic, value) => {
  console.log(nic);
  console.log(value);
  try {
    const response = await apiClient.get(`/scheduling/add/${nic}`, value);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      showUnsuccessAlert(error.response.data);
    } else if (error.request) {
      console.error("Error Request:", error.request);
      showUnsuccessAlert("No response from server");
    } else {
      console.error("Error Message:", error.message);
      showUnsuccessAlert("Error: " + error.message);
    }
  }
};
