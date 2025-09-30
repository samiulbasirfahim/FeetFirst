import { useState, useCallback } from "react";
import { getString, setItem } from "@/store/mmkv";
import { fetcher } from "./fetcher";
import { AutoLoginBody } from "@/type/auth";
import { User } from "@/type/user";
import { useGetOnboardingQuestion } from "@/lib/queries/onboarding-question";
import { useLanguageStore } from "@/store/language";

interface AutoLoginResult {
    success: boolean;
    user: User | null;
    action?: "navigate_home" | "navigate_onboarding" | "navigate_otp";
    navigationParams?: any;
}

export function useAutoLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const { mutate: fetchOnboardingQuestion } = useGetOnboardingQuestion();
    const { setLanguage } = useLanguageStore();

    const autoLogin = useCallback(
        async (callback?: (user: User) => void): Promise<AutoLoginResult> => {
            setIsLoading(true);
            setError(null);

            const access = getString("access_token");
            const refresh = getString("refresh_token");

            console.log({ access, refresh });

            if (!access || !refresh) {
                console.log("No Access Token");
                setIsLoading(false);
                return { success: false, user: null };
            }

            try {
                const data: any = await fetcher("/api/users/verify-access/", {
                    body: {
                        access_token: access,
                        refresh_token: refresh,
                    } as AutoLoginBody,
                    method: "POST",
                });

                const language = data.user.language;
                setLanguage(language);
                console.log(language);

                const mappedUser: User = {
                    id: data.user.id,
                    name: data.user.name ?? "",
                    email: data.user.email,
                    date_of_birth: data.user.date_of_birth ?? "",
                    image: data.user.image,
                    phone: data.user.phone,
                };

                console.log("Mapped User is: ", mappedUser);

                if (!data.user.is_active) {
                    console.log("USER ISNT VERIFIED");
                    setIsLoading(false);
                    return {
                        success: false,
                        user: { ...mappedUser },
                        action: "navigate_otp",
                        navigationParams: {
                            pathname: "/(public)/register/otp-authenticattion",
                            params: { email: mappedUser.email },
                        },
                    };
                }

                if (data.access) {
                    setItem("access_token", data.access);
                }

                if (callback) {
                    callback(mappedUser);
                }

                return new Promise((resolve) => {
                    fetchOnboardingQuestion(undefined, {
                        onSuccess: (onboardingData) => {
                            // console.log("Onboarding question: ", onboardingData);
                            setIsLoading(false);

                            if ((onboardingData as any).id) {
                                resolve({
                                    success: true,
                                    user: {
                                        ...mappedUser,
                                        gender: (onboardingData as any).gender,
                                    },
                                    action: "navigate_home",
                                });
                            } else {
                                resolve({
                                    success: true,
                                    user: {
                                        ...mappedUser,
                                        gender: (onboardingData as any).gender,
                                    },
                                    action: "navigate_onboarding",
                                });
                            }
                        },
                        onError: (err) => {
                            // console.log("Onboarding check failed:", err);
                            setIsLoading(false);
                            resolve({
                                success: true,
                                user: mappedUser,
                                action: "navigate_onboarding",
                            });
                        },
                    });
                });
            } catch (err) {
                console.log("AutoLogin failed:", err);
                setError(err);
                setIsLoading(false);
                return { success: false, user: null };
            }
        },
        [fetchOnboardingQuestion],
    );

    return {
        autoLogin,
        isLoading,
        error,
    };
}
