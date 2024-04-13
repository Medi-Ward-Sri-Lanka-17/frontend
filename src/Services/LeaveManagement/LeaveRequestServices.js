import { apiClient } from "../../Api/ApiClient";

export const getUserDetails = async (username) => {
  try {
    const response = await apiClient.get(`/get-user/${username}`);
    console.log("service result", response);

    const userData = {
      ...response.data,
      leaveNum: response.data.leaveNum || "5", // Set a default value if 'leaveNum' is not present
    };

    return userData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const saveLeaveRequest = async (values) => {
  try {
    const response = await apiClient.post("/request-leave", values);
    console.log(response);
    return response;
  } catch {
    console.log("error sending data");
  }
};
