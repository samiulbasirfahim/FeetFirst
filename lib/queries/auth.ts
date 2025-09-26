import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import {
  LoginForm,
  RegisterForm,
  OtpRequest,
  VerifyOtpRequest,
  ResetPassword,
} from "@/type/auth";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginForm) =>
      fetcher("/api/users/login/", { method: "POST", body: data }),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterForm) =>
      fetcher("/api/users/signup/", { method: "POST", body: data }),
  });
}

export function useOTP() {
  return useMutation({
    mutationFn: (data: OtpRequest) =>
      fetcher("/api/users/get-otp/", {
        method: "POST",
        body: data,
      }),
  });
}

export function useVerifyOTP() {
  return useMutation({
    mutationFn: (data: VerifyOtpRequest) =>
      fetcher("/api/users/verify-otp/", {
        method: "POST",
        body: data,
      }),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPassword) =>
      fetcher("/api/users/reset-password/", {
        method: "POST",
        auth: true,
        body: data,
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }),
  });
}
