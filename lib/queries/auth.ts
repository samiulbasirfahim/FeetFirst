import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { LoginForm, RegisterForm } from "@/type/auth";

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
