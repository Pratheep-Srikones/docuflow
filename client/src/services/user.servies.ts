import { axiosInstance } from "../config/axios.config";

export const get_user_details_by_id = async (user_id: string) => {
  try {
    const response = await axiosInstance.get("users/details/" + user_id);
    return response.data;
  } catch (error) {
    console.error("Error while getting user by id:", error);
    throw error;
  }
};
