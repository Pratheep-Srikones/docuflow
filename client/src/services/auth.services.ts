import { axiosInstance } from "../config/axios.config";
import { Staff, User } from "../types/types";

export const user_login = async (nic: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/user/login", {
      nic,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user_name",
      response.data.user.first_name + " " + response.data.user.last_name
    );
    localStorage.setItem("user_id", response.data.user.user_id);
    localStorage.setItem("nic", response.data.user.nic);
    localStorage.setItem("phone", response.data.user.phone);
    localStorage.setItem("email", response.data.user.email);
    return response.data;
  } catch (error) {
    console.error("Error while logging in user:", error);
    throw error;
  }
};

export const user_register = async (user: User) => {
  try {
    const response = await axiosInstance.post("/auth/user/register", user);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error while registering user:", error);
    throw error;
  }
};
export const staff_login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/staff/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "staff_name",
      response.data.staff.first_name + " " + response.data.staff.last_name
    );
    localStorage.setItem("staff_id", response.data.staff.staff_id);
    localStorage.setItem("staff_role", response.data.staff.role);
    localStorage.setItem("staff_email", response.data.staff.email);
    localStorage.setItem("staff_phone", response.data.staff.phone);
    localStorage.setItem("staff_nic", response.data.staff.nic);
    localStorage.setItem("staff_job_title", response.data.staff.job_title);
    localStorage.setItem(
      "staff_assigned_applications",
      response.data.staff.assigned_applications
    );
    return response.data;
  } catch (error) {
    console.error("Error while logging in staff:", error);
    throw error;
  }
};
export const staff_register = async (staff: Staff) => {
  try {
    const response = await axiosInstance.post("/auth/staff/register", staff);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error while registering staff:", error);
    throw error;
  }
};
