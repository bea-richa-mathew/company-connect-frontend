
import api from "../services/api";

import type {
  Project,
  ApiResponse
} from "../types/project";

export interface ProjectEditInput {
  title: string;
  category: string;
  description: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
}

export type ProjectWorkStatus =
  | "In Progress"
  | "On Hold";

export async function fetchPublicProjects(): Promise<Project[]> {
  const response = await api.get<ApiResponse<Project[]>>(
    "/projects"
  );

  return response.data.data;
}

export async function fetchPublicProject(
  slug: string
): Promise<Project> {
  const response = await api.get<ApiResponse<Project>>(
    `/projects/public/${encodeURIComponent(slug)}`
  );

  return response.data.data;
}

export async function fetchEmployeeProjects(): Promise<Project[]> {
  const response = await api.get<ApiResponse<Project[]>>(
    "/projects/employee"
  );

  return response.data.data;
}

export async function updateEmployeeProject(
  projectId: string,
  input: ProjectEditInput
): Promise<void> {
  await api.patch(
    `/projects/employee/${projectId}`,
    input
  );
}

export async function updateEmployeeProjectStatus(
  projectId: string,
  status: ProjectWorkStatus
): Promise<void> {
  await api.patch(
    `/projects/employee/${projectId}/status`,
    { status }
  );
}

export async function submitProjectCompletion(
  projectId: string
): Promise<void> {
  await api.patch(
    `/projects/employee/${projectId}/complete`
  );
}
