import { apiClient } from "../../Api/ApiClient"

export const retrieveProfilePicture = async (nic) => {
    try {
      const response = await apiClient.get(`/profile-picture/load/${nic}`);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error("Couldn't retieve news");
    }
  };