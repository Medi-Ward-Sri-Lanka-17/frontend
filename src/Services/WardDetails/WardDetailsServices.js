import { apiClient } from "../../Api/ApiClient";

export const addWard = async (value) => {
  try {
    const response = await apiClient.post("/add-ward", value);
    console.log(response.status);
    return response.status;
  } catch (err) {
    throw new Error("Couldn't add");
    console.error(err);
  }
};
