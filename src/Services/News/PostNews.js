import { apiClient } from "../../Api/ApiClient";

export const postNews = async (values,nic) => {
  try {
    const formData = new FormData();
   
    formData.append('newsHeader', values.newsHeader);
    formData.append('newsDescription', values.newsDescription);
    formData.append('newsAdderId',nic)
    formData.append('comment',"This is comment")
    formData.append('image', values.imgUrl);
    console.log(values)
    console.log(nic)
    console.log(formData)
    const response = await apiClient.post(`/news/add`, formData,{
        headers: {
            "Content-Type": "multipart/form-data", // Set Content-Type header explicitly
          },
    });
    console.log(response)
    return response; // Assuming the response contains data, adjust as needed
  } catch (err) {
    throw new Error("Couldn't update User Profile Details: " + err.message);
  }
};