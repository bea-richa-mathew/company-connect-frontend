
import axiosInstance from "./axiosInstance";

import type {
  Task,
  LeaveRequest,
  Attendance,
  Announcement,
} from "../types";

function unwrapResponse<T>(responseData: unknown): T {
  if (
    responseData !== null &&
    typeof responseData === "object" &&
    "data" in responseData
  ) {
    return (responseData as { data: T }).data;
  }

  return responseData as T;
}

// ---------------- TASKS ----------------

export async function fetchTasks(): Promise<Task[]> {
  const response = await axiosInstance.get("/tasks");
  return unwrapResponse<Task[]>(response.data) ?? [];
}

export async function updateTaskStatus(
  id: string,
  status: Task["status"]
): Promise<unknown> {
  const response = await axiosInstance.patch(
    `/tasks/${id}`,
    { status }
  );

  return response.data;
}

// ---------------- LEAVES ----------------

export interface LeaveInput {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export async function fetchLeaves(): Promise<LeaveRequest[]> {
  const response = await axiosInstance.get("/leaves");
  return unwrapResponse<LeaveRequest[]>(response.data) ?? [];
}

export async function createLeave(
  input: LeaveInput
): Promise<unknown> {
  const response = await axiosInstance.post("/leaves", input);
  return response.data;
}

// ---------------- ATTENDANCE ----------------

export async function fetchAttendance(): Promise<Attendance[]> {
  const response = await axiosInstance.get("/attendance");
  return unwrapResponse<Attendance[]>(response.data) ?? [];
}

export async function checkIn(): Promise<unknown> {
  const response = await axiosInstance.post("/attendance/check-in");
  return response.data;
}

export async function checkOut(): Promise<unknown> {
  const response = await axiosInstance.post("/attendance/check-out");
  return response.data;
}

// ---------------- ANNOUNCEMENTS ----------------

export async function fetchAnnouncements(): Promise<Announcement[]> {
  const response = await axiosInstance.get("/announcements");
  return unwrapResponse<Announcement[]>(response.data) ?? [];
}

// ---------------- PROFILE ----------------

export interface ProfileInput {
  name: string;
  phone: string;
  profileImage?: string;
}

export async function fetchMyProfile(): Promise<unknown> {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
}

export async function updateMyProfile(
  input: ProfileInput
): Promise<unknown> {
  const response = await axiosInstance.patch(
    "/employees/me",
    input
  );

  return response.data;
}
