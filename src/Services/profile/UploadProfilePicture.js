import { apiClient } from "../../Api/ApiClient";

export const uploadProfilePicture = async (file, nic) => {
  try {
    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("nic", nic);
    console.log(file)
    console.log(nic)
    console.log(formData)
    const response = await apiClient.post(`/profile-picture/add`, formData,{
        headers: {
            "Content-Type": "multipart/form-data", // Set Content-Type header explicitly
          },
    });
    console.log(response)
    return response.data; // Assuming the response contains data, adjust as needed
  } catch (err) {
    throw new Error("Couldn't update User Profile Details: " + err.message);
  }
};