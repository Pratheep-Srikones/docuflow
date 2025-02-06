import { axiosInstance } from "../config/axios.config";
import { decrypt } from "../utils/encrypt";

export const get_pending_applications = async () => {
  try {
    const response = await axiosInstance.get(
      "applications/assigned/" +
        decrypt(localStorage.getItem("staff_id")!) +
        "/pending"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const get_staff_details_by_id = async (staff_id: string) => {
  try {
    const response = await axiosInstance.get("staff/details/" + staff_id);
    return response.data;
  } catch (error) {
    console.error("Error while getting staff by id:", error);
    throw error;
  }
};
