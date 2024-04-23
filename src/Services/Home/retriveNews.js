import { apiClient } from "../../Api/ApiClient"



// export const retrieveNews=(nic)=>apiClient.get(`/news/retrieve/${nic}`)

export const retrieveNews = async (nic) => {
    try {
      const response = await apiClient.get(`/news/retrieve/${nic}`);
      return response.data;
    } catch (err) {
      throw new Error("Couldn't retieve news");
    }
  };

