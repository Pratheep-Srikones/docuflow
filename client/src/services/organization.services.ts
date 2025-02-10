import { axiosInstance } from "../config/axios.config";
export const get_org_details = async () => {
  try {
    const response = await axiosInstance.get("/organization");
    if (response.data.org[0]) {
      localStorage.setItem("org_name", response.data.org[0].name);
      localStorage.setItem("org_address", response.data.org[0].address);
    }
    return response.data;
  } catch (error) {
    console.error("Error while fetching organization details", error);
    throw error;
  }
};
