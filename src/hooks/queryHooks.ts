import { useQuery } from "@tanstack/react-query";

import {
  fetchTasks,
  fetchLeaves,
  fetchAttendance,
  fetchAnnouncements,
  fetchMyProfile,
} from "../api/apiServices";

import type {
  Task,
  LeaveRequest,
  Attendance,
  Announcement,
} from "../types";

export const queryKeys = {
  tasks: ["my-tasks"] as const,
  leaves: ["my-leaves"] as const,
  attendance: ["attendance"] as const,
  announcements: ["announcements"] as const,
  publicAnnouncements: ["public-announcements"] as const,
  profile: ["my-profile"] as const,
};

export function useTasksQuery() {
  return useQuery<Task[]>({
    queryKey: queryKeys.tasks,
    queryFn: fetchTasks,
    refetchInterval: 10000,
  });
}

export function useLeavesQuery() {
  return useQuery<LeaveRequest[]>({
    queryKey: queryKeys.leaves,
    queryFn: fetchLeaves,
  });
}

export function useAttendanceQuery() {
  return useQuery<Attendance[]>({
    queryKey: queryKeys.attendance,
    queryFn: fetchAttendance,
  });
}

export function useAnnouncementsQuery() {
  return useQuery<Announcement[]>({
    queryKey: queryKeys.announcements,
    queryFn: fetchAnnouncements,
  });
}

export function useMyProfileQuery() {
  return useQuery<unknown>({
    queryKey: queryKeys.profile,
    queryFn: fetchMyProfile,
  });
}