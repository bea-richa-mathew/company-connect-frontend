import type {
  Announcement,
  AttendanceRecord,
  Job,
  LeaveRequest,
  Task,
  User,
} from "../types";

export const mockUsers: User[] = [
  {
    id: "EMP001",
    name: "Bea Richa Mathew",
    email: "employee@company.com",
    phone: "+91 9876543210",
    department: "Technology",
    designation: "Web and App Developer",
    role: "employee",
    joinDate: "2025-06-10",
    location: "Kochi, Kerala",
  },
];

export const mockJobs: Job[] = [
  {
    id: "JOB001",
    title: "Frontend Developer",
    department: "Technology",
    location: "Kochi, Kerala",
    type: "Full Time",
    experience: "0-2 Years",
    description:
      "We are looking for a passionate frontend developer to build modern and user-friendly web applications.",
    responsibilities: [
      "Develop responsive web applications",
      "Work with React and TypeScript",
      "Build reusable UI components",
      "Collaborate with backend developers",
      "Optimize application performance",
    ],
    requirements: [
      "Knowledge of React",
      "Knowledge of TypeScript",
      "Understanding of HTML and CSS",
      "Knowledge of REST APIs",
      "Good problem-solving skills",
    ],
    postedDate: "2026-09-15",
  },
  {
    id: "JOB002",
    title: "Backend Developer",
    department: "Technology",
    location: "Trivandrum, Kerala",
    type: "Full Time",
    experience: "1-3 Years",
    description:
      "Join our backend engineering team and build secure and scalable APIs.",
    responsibilities: [
      "Develop REST APIs",
      "Work with Node.js and Express",
      "Design database models",
      "Implement authentication",
      "Maintain API documentation",
    ],
    requirements: [
      "Knowledge of Node.js",
      "Knowledge of Express",
      "MongoDB experience",
      "REST API knowledge",
      "Understanding of authentication",
    ],
    postedDate: "2026-09-12",
  },
  {
    id: "JOB003",
    title: "UI/UX Designer",
    department: "Design",
    location: "Kochi, Kerala",
    type: "Full Time",
    experience: "0-2 Years",
    description:
      "Create meaningful and engaging experiences for our digital products.",
    responsibilities: [
      "Create wireframes",
      "Design application interfaces",
      "Create prototypes",
      "Work with developers",
      "Improve user experience",
    ],
    requirements: [
      "Figma knowledge",
      "UI design fundamentals",
      "UX principles",
      "Good communication",
      "Creative thinking",
    ],
    postedDate: "2026-09-10",
  },
  {
    id: "JOB004",
    title: "Software Developer Intern",
    department: "Technology",
    location: "Kollam, Kerala",
    type: "Internship",
    experience: "Fresher",
    description:
      "A learning-focused internship for students and recent graduates interested in software development.",
    responsibilities: [
      "Assist development teams",
      "Learn company development practices",
      "Fix simple bugs",
      "Write basic documentation",
      "Participate in team meetings",
    ],
    requirements: [
      "Basic programming knowledge",
      "Interest in web development",
      "Willingness to learn",
      "Basic Git knowledge",
    ],
    postedDate: "2026-09-08",
  },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "LV001",
    type: "Casual Leave",
    from: "2026-09-25",
    to: "2026-09-26",
    days: 2,
    reason: "Personal work",
    status: "Pending",
  },
  {
    id: "LV002",
    type: "Sick Leave",
    from: "2026-08-12",
    to: "2026-08-12",
    days: 1,
    reason: "Not feeling well",
    status: "Approved",
  },
];

export const mockTasks: Task[] = [
  {
    id: "TASK001",
    title: "Complete Employee Dashboard",
    description: "Finish the dashboard UI and responsive layout.",
    dueDate: "2026-09-25",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "TASK002",
    title: "API Documentation",
    description: "Prepare documentation for employee APIs.",
    dueDate: "2026-09-27",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: "TASK003",
    title: "Testing",
    description: "Test the latest application changes.",
    dueDate: "2026-09-20",
    priority: "Low",
    status: "Completed",
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "ANN001",
    title: "Annual Company Meeting",
    content:
      "The annual company meeting will be held next month. Further details will be shared shortly.",
    date: "2026-09-20",
    category: "Company",
  },
  {
    id: "ANN002",
    title: "New Leave Policy",
    content:
      "Please review the updated employee leave policy available from the HR department.",
    date: "2026-09-18",
    category: "HR",
  },
  {
    id: "ANN003",
    title: "Office Maintenance",
    content:
      "The office will undergo scheduled maintenance this weekend.",
    date: "2026-09-15",
    category: "General",
  },
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: "AT001",
    date: "2026-09-23",
    checkIn: "09:12 AM",
    checkOut: "--",
    status: "Present",
  },
  {
    id: "AT002",
    date: "2026-09-22",
    checkIn: "09:05 AM",
    checkOut: "06:03 PM",
    status: "Present",
  },
  {
    id: "AT003",
    date: "2026-09-21",
    checkIn: "09:35 AM",
    checkOut: "06:15 PM",
    status: "Late",
  },
  {
    id: "AT004",
    date: "2026-09-18",
    checkIn: "--",
    checkOut: "--",
    status: "Leave",
  },
];