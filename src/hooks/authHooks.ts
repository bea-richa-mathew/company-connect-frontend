
import { useMutation } from "@tanstack/react-query";

import {
  loginUser,
  registerUser,
  type LoginInput,
  type RegisterInput,
} from "../api/authServices";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (input: LoginInput) => loginUser(input),
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (input: RegisterInput) => registerUser(input),
  });
}
