export interface User {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  nic: string;
  password: string;
}

export interface Staff {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  nic: string;
  password: string;
  security_key: string;
  role: string;
  job_title: string;
  assigned_applications: number;
  branch_id: string;
}
export const Staff = (): Staff => ({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  nic: "",
  password: "",
  security_key: "",
  role: "",
  job_title: "",
  assigned_applications: 0,
  branch_id: "",
});
