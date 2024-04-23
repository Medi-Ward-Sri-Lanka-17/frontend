import { apiClient } from "../../Api/ApiClient"

export const UpdateUserDetails = async (values) => {
    try {
        console.log(values)
      const response = await apiClient.put(`/profile-picture/update-details`,values);
      console.log(response);
      return response;
    } catch (err) {
      throw new Error("Couldn't update User Profile Details");
    }
  };