
import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import {
  fetchPublicProjects,
  fetchPublicProject,
  fetchEmployeeProjects,
  updateEmployeeProject,
  updateEmployeeProjectStatus,
  submitProjectCompletion
} from "../api/projectServices";

import type {
  ProjectEditInput,
  ProjectWorkStatus
} from "../api/projectServices";

export const projectQueryKeys = {
  public: ["public-projects"] as const,
  publicDetail: (slug: string) =>
    ["public-project", slug] as const,
  employee: ["employee-projects"] as const
};

export function usePublicProjectsQuery() {
  return useQuery({
    queryKey: projectQueryKeys.public,
    queryFn: fetchPublicProjects
  });
}

export function usePublicProjectQuery(slug?: string) {
  return useQuery({
    queryKey: projectQueryKeys.publicDetail(slug ?? ""),
    queryFn: () => fetchPublicProject(slug!),
    enabled: Boolean(slug)
  });
}

export function useEmployeeProjectsQuery() {
  return useQuery({
    queryKey: projectQueryKeys.employee,
    queryFn: fetchEmployeeProjects
  });
}

export function useUpdateEmployeeProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      input
    }: {
      projectId: string;
      input: ProjectEditInput;
    }) => updateEmployeeProject(projectId, input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.employee
      });
    }
  });
}

export function useUpdateProjectStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      status
    }: {
      projectId: string;
      status: ProjectWorkStatus;
    }) => updateEmployeeProjectStatus(projectId, status),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.employee
      });
    }
  });
}

export function useSubmitProjectCompletionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) =>
      submitProjectCompletion(projectId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.employee
      });
    }
  });
}
