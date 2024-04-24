import { apiClient } from "../../Api/ApiClient";
import {
  showSuccessAlert,
  showUnsuccessAlert,
} from "../../Component/ShowAlert";

//retrive full ward details for edit when sister log
export const retrieveShiftOfUserOnDay = async (nic, date) => {
  try {
    const response = await apiClient.get(
      `/get-duty-on-day-of-user/${(nic, date)}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      showUnsuccessAlert(error.response.data);
      return null;
    } else if (error.request) {
      console.error("Error Request:", error.request);
      showUnsuccessAlert("No response from server");
      return null;
    } else {
      console.error("Error Message:", error.message);
      showUnsuccessAlert("Error: " + error.message);
      return null;
    }
  }
};
