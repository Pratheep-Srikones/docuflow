export interface User {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  nic: string;
  password: string;
}

export const User = (): User => ({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  nic: "",
  password: "",
});

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
export interface Application {
  application_id: string;
  applicant_id: string;
  submitted_date: string;
  status: string;
  reviewed_by: string;
  assigned_to: string;
  title: string;
  description: string;
  signed_by: string;
  signed_date: string;
  remarks: string;
  doc_link: string;
  branch_id: string;
}

export const Application = (): Application => ({
  application_id: "",
  applicant_id: "",
  submitted_date: "",
  status: "",
  reviewed_by: "",
  assigned_to: "",
  title: "",
  description: "",
  signed_by: "",
  signed_date: "",
  remarks: "",
  doc_link: "",
  branch_id: "",
});

export interface Branch {
  name: string;
  brach_id: string;
}
export const Branch = (): Branch => ({
  name: "",
  brach_id: "",
});

export interface StaffDetail {
  staff_id: string;
  first_name: string;
  last_name: string;
  role: string;
  job_title: string;
}
