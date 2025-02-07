import { axiosInstance } from "../config/axios.config";
import { decrypt } from "../utils/encrypt";

export const uploadFile = async (file: File) => {
  try {
    const applicant_id = decrypt(localStorage.getItem("user_id")!);
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

export const sign_pdf = async (
  pdf_url: string,
  text: string,
  status: string
) => {
  try {
    const response = await axiosInstance.post("/pdf/sign", {
      pdf_url,
      text,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error while signing pdf:", error);
    throw error;
  }
};
