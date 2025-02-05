import { axiosInstance } from "../config/axios.config";

export const getBranches = async () => {
  try {
    const response = await axiosInstance.get("/branches");
    return response.data;
  } catch (error) {
    console.error("Error while fetching branches:", error);
    throw error;
  }
};
