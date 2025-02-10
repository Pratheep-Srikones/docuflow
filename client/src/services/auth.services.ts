import { axiosInstance } from "../config/axios.config";
import { Staff, User } from "../types/types";
import { decrypt, encrypt } from "../utils/encrypt";

export const user_login = async (nic: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/user/login", {
      nic,
      password,
    });
    localStorage.setItem("token", encrypt(response.data.token));
    localStorage.setItem(
      "user_name",
      encrypt(
        response.data.user.first_name + " " + response.data.user.last_name
      )
    );
    localStorage.setItem("user_id", encrypt(response.data.user.user_id));
    localStorage.setItem("nic", encrypt(response.data.user.nic));
    localStorage.setItem("phone", encrypt(response.data.user.phone));
    localStorage.setItem("email", encrypt(response.data.user.email));
    localStorage.setItem("login_status", true.toString());
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
    localStorage.setItem("token", encrypt(response.data.token));
    localStorage.setItem(
      "staff_name",
      encrypt(
        response.data.staff.first_name + " " + response.data.staff.last_name
      )
    );
    localStorage.setItem("staff_id", encrypt(response.data.staff.staff_id));
    localStorage.setItem("staff_role", encrypt(response.data.staff.role));
    localStorage.setItem("staff_email", encrypt(response.data.staff.email));
    localStorage.setItem("staff_phone", encrypt(response.data.staff.phone));
    localStorage.setItem("staff_nic", encrypt(response.data.staff.nic));
    localStorage.setItem(
      "staff_job_title",
      encrypt(response.data.staff.job_title)
    );
    localStorage.setItem("login_status", true.toString());

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

export const user_password_change = async (
  old_password: string,
  new_password: string
) => {
  try {
    const response = await axiosInstance.post(
      "/auth/user/password/change/" + decrypt(localStorage.getItem("user_id")!),
      {
        old_password,
        new_password,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error while changing password:", error);
    throw error;
  }
};

export const staff_password_change = async (
  old_password: string,
  new_password: string
) => {
  try {
    const response = await axiosInstance.post(
      "/auth/staff/password/change/" +
        decrypt(localStorage.getItem("staff_id")!),
      {
        old_password,
        new_password,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error while changing password:", error);
    throw error;
  }
};
