import { apiClient } from "../../Api/ApiClient";
import {
  showSuccessAlert,
  showUnsuccessAlert,
} from "../../Component/ShowAlert";

export const retriveSchduleOtherStaff = async (nic, date) => {
  try {
    const response = await apiClient.get(`/scheduling//view/${nic}`, {
      params: { date: date },
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

export const retriveSchduleMatron = async (wardNo, date) => {
  try {
    const response = await apiClient.get(`/scheduling/view/${wardNo}`, {
      params: { date: date },
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
