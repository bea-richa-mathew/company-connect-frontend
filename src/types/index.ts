export type UserRole = "employee" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: UserRole;
  joinDate: string;
  location: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full Time" | "Part Time" | "Internship";
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

export interface LeaveRequest {
  id: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent" | "Late" | "Leave";
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}