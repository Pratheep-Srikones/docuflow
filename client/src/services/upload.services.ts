import { axiosInstance } from "../config/axios.config";

export const uploadFile = async (file: File) => {
  try {
    const applicant_id = localStorage.getItem("user_id");
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post(
      `upload/${applicant_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while uploading file:", error);
    throw error;
  }
};
