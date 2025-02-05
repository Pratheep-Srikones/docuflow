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
