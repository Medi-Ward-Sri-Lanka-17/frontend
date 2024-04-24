import { apiClient } from "../../Api/ApiClient"

export const changePassword = async (values,nic) => {
    try {
        console.log(values)
        console.log(nic)
      const response = await apiClient.put(`/change/password/${nic}`,values);
      console.log(response);
      return response;
    } catch (err) {
      throw new Error("Couldn't change the password");
    }
  };