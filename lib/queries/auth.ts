import { useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../fetcher";
import {
    LoginForm,
    RegisterForm,
    OtpRequest,
    VerifyOtpRequest,
    ResetPassword,
    ChangePassword,
} from "@/type/auth";
import { setItem } from "@/store/mmkv";
import { User } from "@/type/user";
import { useGetOnboardingQuestion } from "./onboarding-question";
import { router } from "expo-router";
import { useAutoLogin } from "../init";
import { useAuthStore } from "@/store/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

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

export function useChnagePassword() {
    return useMutation({
        mutationFn: (body: ChangePassword) =>
            fetcher("/api/users/change-password/", {
                body: body,
                auth: true,
                method: "PUT",
            }),
    });
}

export function useGoogleSignIn() {
    const { mutate: fetch_onboarding_question } = useGetOnboardingQuestion();
    const { setUser } = useAuthStore();
    return useMutation({
        mutationFn: async () => {
            let token: string | null;
            try {
                await GoogleSignin.hasPlayServices();
                const response = await GoogleSignin.signIn();
                let token_rsponse = await GoogleSignin.getTokens();
                const token = token_rsponse.accessToken;
                return fetcher("/api/users/google/callback/", {
                    method: "POST",
                    body: {
                        access_token: token,
                    },
                });
            } catch (err) {
                console.log(err);
            }
        },
        onSuccess(data: any) {
            console.log("GOT SUCCESS");
            const access_token = data.access;
            const refresh_token = data.access;

            const mappedUser: User = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                date_of_birth: data.user.date_of_birth,
                image: data.user.image ?? "",
                phone: data.user.phone,
            };
            setItem("access_token", access_token);
            setItem("refresh_token", refresh_token);

            fetch_onboarding_question(undefined, {
                onSuccess: (res) => {
                    console.log(res);
                    if ((res as any).id) {
                        setUser({ ...mappedUser, gender: (res as any).gender });
                        router.replace("/(protected)/home");
                    } else {
                        setUser(mappedUser);
                        router.push("/on-boarding");
                    }
                },
                onError: (err) => {
                    setUser(mappedUser);
                    router.replace("/on-boarding");
                    if (err instanceof ApiError) console.log("Question data: ", err.data);
                },
            });
        },
    });
}
