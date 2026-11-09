
export type Role = "employee";

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  designation?: string;
  employeeId?: string;
  phone?: string;
  address?: string;
  joiningDate?: string;
  active?: boolean;
  profileImage?: string;
}

export interface Job {
  id?: string;
  _id?: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship";
  experience: string;
  description: string;
  skills: string[];
  deadline?: string;
  active?: boolean;
}

export interface Application {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  job?: Job | string;
  jobId?: string;
  status:
    | "Applied"
    | "Shortlisted"
    | "Interview"
    | "Selected"
    | "Rejected";
  createdAt?: string;
}

export interface LeaveRequest {
  id?: string;
  _id?: string;
  employee?: string | User;
  employeeId?: string;
  leaveType?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  from?: string;
  to?: string;
  reason: string;
  status:
    | "Pending"
    | "Approved"
    | "Rejected";
  adminComment?: string;
}

export interface Attendance {
  id?: string;
  _id?: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status?: string;
}

export interface Task {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  dueDate?: string;
  priority: "Low" | "Medium" | "High";
  status:
    | "Pending"
    | "In Progress"
    | "Completed";

  // Added: assigning admin, populated by backend.
  assignedBy?:
    | string
    | {
        _id?: string;
        name: string;
        email: string;
      };

  reviewStatus?:
    | "Not Submitted"
    | "Pending Review"
    | "Approved"
    | "Changes Requested";
  reviewComment?: string;
}

export interface Announcement {
  id?: string;
  _id?: string;
  title: string;
  message: string;
  date?: string;
  active?: boolean;
  createdAt?: string;
}
