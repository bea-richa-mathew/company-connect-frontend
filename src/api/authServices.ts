
import axiosInstance from "./axiosInstance";

export type RegistrationRole = "user" | "employee";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: RegistrationRole;
}

export async function loginUser(input: LoginInput) {
  const response = await axiosInstance.post(
    "/auth/login",
    input
  );

  return response.data;
}

export async function registerUser(input: RegisterInput) {
  const response = await axiosInstance.post(
    "/auth/register",
    input
  );

  return response.data;
}

export async function fetchCurrentUser() {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
}
