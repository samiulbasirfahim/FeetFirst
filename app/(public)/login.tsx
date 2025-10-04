import { Input, InputPassword } from "@/components/ui/input";
import GOOGLE from "@/assets/svgs/google.svg";
import SMS from "@/assets/svgs/sms.svg";
import LOCK from "@/assets/svgs/lock.svg";
import { useLanguageStore } from "@/store/language";
import { Logo } from "@/components/ui/logo";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Layout } from "@/components/layout/layout";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useSignIn } from "@/hooks/useGoogleSignIn";
import { Typography } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { LoginForm } from "@/type/auth";
import { useLogin } from "@/lib/queries/auth";
import { useRouter } from "expo-router";
import { setItem } from "@/store/mmkv";
import { User } from "@/type/user";
import { useGetOnboardingQuestion } from "@/lib/queries/onboarding-question";
import { ApiError } from "@/lib/fetcher";

GoogleSignin.configure({
    scopes: [],
    offlineAccess: false,
    iosClientId: process.env.EXPO_PUBLIC_IOS_OAUTH_TOKEN,
    forceCodeForRefreshToken: true,
});

export default function Page() {
    const { signIn, name } = useSignIn();
    const router = useRouter();

    const { isGerman } = useLanguageStore();
    const { setUser } = useAuthStore();

    const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
    const {
        data: userInfo,
        isPending,
        mutate: triggerLogin,
        error,
        isError,
    } = useLogin();

    const { mutate: fetch_onboarding_question, isPending: loading_onboarding } =
        useGetOnboardingQuestion();

    useEffect(() => {
        console.log(error);
    }, [isError, error]);

    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});

    const handleLogin = (e: any) => {
        e.preventDefault();
        setFormErrors({});

        const errors: { [key: string]: string[] } = {};

        if (!form.email.trim()) {
            errors.email = ["This field is required"];
        }

        if (!form.password.trim()) {
            errors.password = ["This field is required"];
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        triggerLogin(form, {
            onError: (err: any) => {
                console.log("GOT ERROR");
                if (err?.data) {
                    setFormErrors(err.data);
                } else {
                    console.log(err);
                }
            },
            onSuccess: async (data: any) => {
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

                if (data.user.is_active) {
                    console.log("USER IS ACTIVE");
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
                            if (err instanceof ApiError)
                                console.log("Question data: ", err.data);
                        },
                    });
                } else {
                    router.push({
                        pathname: "/(public)/register/otp-authenticattion",
                        params: {
                            email: form.email.trim().toLowerCase(),
                        },
                    });
                }
            },
        });
    };

    return (
        <Layout scrollable avoidKeyboard edges={["bottom"]}>
            <Logo className="mb-20" />
            <Input
                Icon={SMS}
                placeholder={isGerman() ? "E-Mail eingeben" : "Inserisci l'email"}
                inputMode="email"
                value={form.email}
                onChangeText={(text) =>
                    setForm((prev) => ({ ...prev, email: text.toLowerCase() }))
                }
                error={formErrors.email?.[0]}
            />

            <InputPassword
                Icon={LOCK}
                placeholder={isGerman() ? "Passwort eingeben" : "Inserisci password"}
                value={form.password}
                onChangeText={(text) =>
                    setForm((prev) => ({ ...prev, password: text }))
                }
                error={formErrors.password?.[0]}
            />
            <View
                className="w-full flex-row"
                style={{
                    justifyContent: "flex-end",
                }}
            >
                <Button variant="ghost" onPress={() => router.push("/forgot-password")}>
                    {isGerman() ? "Passwort vergessen?" : "Password dimenticata?"}
                </Button>
            </View>

            {formErrors.non_field_errors && (
                <Typography className="text-red-500 text-center mb-2">
                    {formErrors.non_field_errors[0]}
                </Typography>
            )}

            <Button
                variant="big"
                className="w-full"
                onPress={handleLogin}
                isLoading={isPending || loading_onboarding}
            >
                {isGerman() ? "Anmelden" : "Accesso"}
            </Button>

            <View className="w-full flex-row items-center">
                <View
                    className="flex-1 bg-muted-background"
                    style={{
                        height: 3,
                    }}
                />
                <View
                    className="bg-muted-background rounded-xl items-center justify-center"
                    style={{
                        height: 40,
                        width: 40,
                    }}
                >
                    <View
                        className="border-2"
                        style={{
                            borderColor: "#5C7768",
                            height: 20,
                            borderRadius: "100%",
                            width: 20,
                        }}
                    />
                </View>
                <View
                    className="flex-1 bg-muted-background"
                    style={{
                        height: 3,
                    }}
                />
            </View>

            {name ? (
                <>
                    <Typography className="text-center">{name}</Typography>
                    <TouchableOpacity
                        className="bg-red-200 px-4 py-3 rounded-xl flex-row w-full items-center justify-center gap-4"
                        onPress={() => signIn("signout")}
                    >
                        <GOOGLE />
                        <Text className="text-whtie font-semibold text-xl text-center">
                            SIGN OUT
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity
                    className="bg-white px-4 py-3 rounded-xl flex-row w-full items-center justify-center gap-4"
                    onPress={() => {
                        if (Platform.OS === "android") {
                            signIn("signin");
                        }
                    }}
                >
                    <GOOGLE />
                    <Text className="text-black font-semibold text-xl text-center">
                        {isGerman() ? "Mit Google fortfahren" : "Continua con Google"}
                    </Text>
                </TouchableOpacity>
            )}
        </Layout>
    );
}
