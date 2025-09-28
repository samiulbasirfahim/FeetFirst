import LIKE from "@/assets/svgs/like.svg";
import LOCK from "@/assets/svgs/lock.svg";
import { Modal } from "@/components/common/modal";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input";
import { LogoWrapperSub } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { ApiError } from "@/lib/fetcher";
import { useChnagePassword } from "@/lib/queries/auth";
import { useLanguageStore } from "@/store/language";
import { ChangePassword } from "@/type/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const [show_modal, set_show_modal] = useState<boolean>(false);

    const { mutate: change_password, isPending } = useChnagePassword();

    const [form, setForm] = useState<ChangePassword>({
        new_password: "",
        confirm_password: "",
        old_password: "",
    });

    const [errors, setErrors] = useState<Partial<ChangePassword>>({});

    const validate = (): boolean => {
        const newErrors: Partial<ChangePassword> = {};

        if (!form.old_password.trim()) {
            newErrors.old_password = "Old password is required";
        } else if (form.old_password.length < 8) {
            newErrors.old_password = "Old password must be at least 8 characters";
        }

        if (!form.new_password.trim()) {
            newErrors.new_password = "New password is required";
        } else if (form.new_password.length < 8) {
            newErrors.new_password = "New password must be at least 8 characters";
        }

        if (!form.confirm_password.trim()) {
            newErrors.confirm_password = "Confirm password is required";
        } else if (form.confirm_password !== form.new_password) {
            newErrors.confirm_password = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    useEffect(() => {
        console.log(form);
    }, [form]);

    const handleSubmit = () => {
        if (!validate()) return;

        change_password(form, {
            onSuccess() {
                set_show_modal(true);
            },
            onError(err) {
                if (err instanceof ApiError) {
                    console.log(err.data)
                    setErrors(err.data);
                }
            },
        });
    };

    return (
        <Layout scrollable avoidTabbar avoidKeyboard>
            <InputPassword
                Icon={LOCK}
                onChangeText={(t) => handleChange("old_password", t)}
                placeholder={
                    isGerman()
                        ? "Geben Sie Ihr aktuelles Passwort ein"
                        : "Inserisci la password corrente"
                }
            />

            {errors.old_password && (
                <Typography variant="error">{errors.old_password}</Typography>
            )}

            <InputPassword
                Icon={LOCK}
                onChangeText={(t) => handleChange("new_password", t)}
                placeholder={
                    isGerman()
                        ? "Geben Sie das neue Passwort ein"
                        : "Inserisci la nuova password"
                }
            />

            {errors.new_password && (
                <Typography variant="error">{errors.new_password}</Typography>
            )}

            <InputPassword
                Icon={LOCK}
                onChangeText={(t) => handleChange("confirm_password", t)}
                placeholder={
                    isGerman()
                        ? "Geben Sie das Bestätigungspasswort ein"
                        : "Inserisci conferma password"
                }
            />

            {errors.confirm_password && (
                <Typography variant="error">{errors.confirm_password}</Typography>
            )}

            <Button
                onPress={handleSubmit}
                isLoading={isPending}
                variant="big"
                className={`items-center justify-center`}
                textClassName="text-center"
            >
                {!isGerman() ? "Aggiornamento" : "ELIMINA IL MIO ACCOUNT"}
            </Button>

            <Modal
                isOpen={show_modal}
                onClickOutside={() => {
                    set_show_modal(false);
                }}
            >
                <View className="flex-col items-center justify-center py-10 px-4 gap-6">
                    <LogoWrapperSub Logo={LIKE} />
                    <Typography variant="title" className="text-white">
                        {isGerman() ? "Passwort geändert" : "Tutto pronto"}
                    </Typography>

                    <Typography variant="subtitle" className="w-4/5 text-center">
                        {isGerman()
                            ? "Ihr Passwort wurde erfolgreich geändert"
                            : "La tua password è stata modificata con successo."}
                    </Typography>
                    <Button
                        className="bg-transparent border-primary border-2"
                        textClassName="text-primary"
                        variant="big"
                        onPress={() => {
                            router.canGoBack() && router.back();
                        }}
                    >
                        {isGerman() ? "IN ORDNUNG" : "VA BENE"}
                    </Button>
                </View>
            </Modal>
        </Layout>
    );
}
