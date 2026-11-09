
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateTaskStatus,
  createLeave,
  checkIn,
  checkOut,
  updateMyProfile,
} from "../api/apiServices";

import type { Task } from "../types";

import {
  queryKeys,
} from "./queryHooks";

import type {
  LeaveInput,
  ProfileInput,
} from "../api/apiServices";

export function useTaskStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: Task["status"];
    }) => updateTaskStatus(id, status),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.tasks,
      });
    },
  });
}

export function useCreateLeaveMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LeaveInput) => createLeave(input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.leaves,
      });
    },
  });
}

export function useCheckInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkIn,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.attendance,
      });
    },
  });
}

export function useCheckOutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkOut,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.attendance,
      });
    },
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ProfileInput) =>
      updateMyProfile(input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile,
      });

      await queryClient.invalidateQueries({
        queryKey: ["auth-me"],
      });
    },
  });
}
