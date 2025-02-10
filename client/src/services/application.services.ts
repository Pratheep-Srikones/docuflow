import { axiosInstance } from "../config/axios.config";
import { Application } from "../types/types";
import { decrypt } from "../utils/encrypt";

export const submit_application = async (application: Application) => {
  try {
    console.log("application: ", application);
    const response = await axiosInstance.post("applications", application);
    return response.data;
  } catch (error) {
    console.error("Error while submitting application:", error);
    throw error;
  }
};

export const get_applications_count = async () => {
  try {
    const response = await axiosInstance.get(
      "users/applications/pending/count/" +
        decrypt(localStorage.getItem("user_id")!)
    );
    return response.data;
  } catch (error) {
    console.error("Error while getting applications count:", error);
    throw error;
  }
};

export const get_applications_by_applicant = async () => {
  try {
    const response = await axiosInstance.get(
      "applications/applicant/" + decrypt(localStorage.getItem("user_id")!)
    );
    return response.data;
  } catch (error) {
    console.error("Error while getting applications by applicant:", error);
    throw error;
  }
};

export const get_application = async (application_id: string) => {
  try {
    const response = await axiosInstance.get("applications/" + application_id);
    return response.data;
  } catch (error) {
    console.error("Error while getting application:", error);
    throw error;
  }
};

export const assign_application = async (
  application_id: string,
  assigned_to: string
) => {
  try {
    const response = await axiosInstance.put(
      "applications/" + application_id + "/assign/" + assigned_to,
      {
        old_assignee_id: decrypt(localStorage.getItem("staff_id")!),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning Staff:", error);
    throw error;
  }
};

export const update_application = async (
  application_id: string,
  application: Application
) => {
  try {
    const response = await axiosInstance.put(
      "applications/" + application_id,
      application
    );
    return response.data;
  } catch (error) {
    console.error("Error updating application:", error);
    throw error;
  }
};
