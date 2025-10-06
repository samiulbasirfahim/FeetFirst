import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import MultiSelectComponent from "@/components/ui/drop-down";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { ApiError } from "@/lib/fetcher";
import {
    useCreateAddress,
    useGetAddress,
    useUpdateAddress,
} from "@/lib/queries/address";
import { useUpdateUser } from "@/lib/queries/user";
import { useAuthStore } from "@/store/auth";
import { useLanguageStore } from "@/store/language";
import { CreateAddress } from "@/type/user";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Screen() {
    const { isGerman, setLanguage } = useLanguageStore();
    const { setUser, user } = useAuthStore();
    const { mutate: trigger_address, isPending: isPending_address } =
        useCreateAddress();
    const { mutate: trigger_update, isPending: isPending_update } =
        useUpdateAddress();
    const { mutate: trigger_user, isPending: isPending_user } = useUpdateUser();

    const { data: address, isPending } = useGetAddress();

    const [error, setError] = useState<Record<string, string>>({});

    const [form, setForm] = useState({
        name: "",
        surname: "",
        streetAddress: "",
        additionalAddress: "",
        postalCode: "",
        city: "",
        phoneNumber: "",
        country: "",
        comments: "",
    });

    useEffect(() => {
        if (address) {
            setForm({
                name: (address as any).first_name ?? "",
                surname: (address as any).last_name ?? "",
                streetAddress: (address as any).street_address ?? "",
                additionalAddress: (address as any).address_line2 ?? "",
                postalCode: (address as any).postal_code ?? "",
                city: (address as any).city ?? "",
                phoneNumber: (address as any).phone_number ?? "",
                country: (address as any).country ?? "",
                comments: (address as any).comments ?? "",
            });
        }
    }, [address]);

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setError((prev) => ({ ...prev, [field]: "" }));
    };

    const validateForm = (formData: typeof form) => {
        const newErrors: Record<string, string> = {};
        const requiredFields = [
            "name",
            "surname",
            "streetAddress",
            "additionalAddress",
            "postalCode",
            "city",
            "phoneNumber",
            "country",
            "comments",
        ];

        requiredFields.forEach((field) => {
            if (!formData[field]?.trim()) {
                newErrors[field] = "This field is required.";
            }
        });

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const translations = {
        german: {
            name: "Name",
            surname: "Nachname",
            streetAddress: "Straße und Hausnummer",
            additionalAddress: "Zusätzliche Adresse",
            postalCode: "PLZ",
            city: "Stadt",
            phoneNumber: "Telefonnummer",
            country: "Land",
            comments: "Kommentare",
            updateButton: "AKTUALISIEREN",
        },
        italian: {
            name: "Nome",
            surname: "Cognome",
            streetAddress: "Indirizzo",
            additionalAddress: "Indirizzo aggiuntivo",
            postalCode: "CAP",
            city: "Città",
            phoneNumber: "Numero di telefono",
            country: "Paese",
            comments: "Commenti",
            updateButton: "AGGIORNA",
        },
    };

    const t = isGerman() ? translations.german : translations.italian;

    const handleSubmit = () => {
        if (!validateForm(form)) return;

        const payload: CreateAddress = {
            first_name: form.name,
            last_name: form.surname,
            street_address: form.streetAddress,
            address_line2: form.additionalAddress,
            postal_code: form.postalCode,
            city: form.city,
            phone_number: form.phoneNumber,
            country: form.country,
            comments: form.comments,
        };

        let language: string | null = null;
        if (form.country.toLowerCase() === "germany") language = "german";
        if (form.country.toLowerCase() === "italy") language = "italian";

        const userPayload: any = {
            name: `${form.name} ${form.surname}`.trim(),
            phone: payload.phone_number,
        };
        if (language) userPayload.language = language;

        const afterAddressSuccess = () => {
            trigger_user(userPayload, {
                onSuccess: (udata) => {
                    const language = (udata as any).language;
                    setUser({
                        ...(user as any),
                        name: (udata as any).name,
                        phone: userPayload.phone,
                    });
                    setLanguage(language);
                    router.canGoBack() && router.back();
                },
                onError: (uerr) => {
                    if (uerr instanceof ApiError)
                        console.log("User update error:", uerr.data);
                },
            });
        };

        if (address) {
            trigger_update(
                { ...payload },
                {
                    onSuccess: () => afterAddressSuccess(),
                    onError: (err) => {
                        if (err instanceof ApiError) console.log("Error: ", err.data);
                    },
                },
            );
        } else {
            trigger_address(payload, {
                onSuccess: () => afterAddressSuccess(),
                onError: (err) => {
                    if (err instanceof ApiError)
                        console.log("Error - create: ", err.data);
                },
            });
        }
    };

    const isFormValid = Object.values(form).every((val) => val.trim() !== "");

    if (isPending)
        return (
            <Layout className="bg-backgroundDark">
                <LoadingSpinner />
            </Layout>
        );

    return (
        <Layout className="bg-backgroundDark" avoidKeyboard scrollable avoidTabbar>
            <View className="flex-1 gap-3">
                <View className="flex-row gap-3">
                    <View className="flex-1">
                        <Input
                            placeholder={t.name}
                            value={form.name}
                            onChangeText={(val) => handleChange("name", val)}
                        />
                        {error.name && (
                            <Typography variant="error">{error.name}</Typography>
                        )}
                    </View>
                    <View className="flex-1">
                        <Input
                            placeholder={t.surname}
                            value={form.surname}
                            onChangeText={(val) => handleChange("surname", val)}
                        />
                        {error.surname && (
                            <Typography variant="error">{error.surname}</Typography>
                        )}
                    </View>
                </View>

                <Input
                    placeholder={t.streetAddress}
                    value={form.streetAddress}
                    onChangeText={(val) => handleChange("streetAddress", val)}
                />
                {error.streetAddress && (
                    <Typography variant="error">{error.streetAddress}</Typography>
                )}

                <Input
                    placeholder={t.additionalAddress}
                    value={form.additionalAddress}
                    onChangeText={(val) => handleChange("additionalAddress", val)}
                />
                {error.additionalAddress && (
                    <Typography variant="error">{error.additionalAddress}</Typography>
                )}

                <View className="bg-muted-background rounded-lg overflow-hidden p-4 flex-row items-start gap-2">
                    <TextInput
                        multiline
                        value={form.comments}
                        onChangeText={(val) => handleChange("comments", val)}
                        className="text-foreground bg-muted-background flex-1 h-20 placeholder:text-muted-foreground"
                        style={{ lineHeight: 22, paddingTop: 0, textAlignVertical: "top" }}
                        placeholder={
                            isGerman()
                                ? "Geben Sie zusätzliche Kommentare ein"
                                : "Inserisci ulteriori commenti"
                        }
                    />
                    {error.comments && (
                        <Typography variant="error">{error.comments}</Typography>
                    )}
                </View>

                <View className="flex-row gap-3">
                    <View className="w-24">
                        <Input
                            placeholder={t.postalCode}
                            value={form.postalCode}
                            onChangeText={(val) => handleChange("postalCode", val)}
                        />
                        {error.postalCode && (
                            <Typography variant="error">{error.postalCode}</Typography>
                        )}
                    </View>
                    <View className="flex-1">
                        <Input
                            placeholder={t.city}
                            value={form.city}
                            onChangeText={(val) => handleChange("city", val)}
                        />
                        {error.city && (
                            <Typography variant="error">{error.city}</Typography>
                        )}
                    </View>
                </View>

                <Input
                    placeholder={t.phoneNumber}
                    value={form.phoneNumber}
                    keyboardType="phone-pad"
                    onChangeText={(val) => handleChange("phoneNumber", val)}
                />
                {error.phoneNumber && (
                    <Typography variant="error">{error.phoneNumber}</Typography>
                )}

                <MultiSelectComponent
                    list={["Italy", "Germany"]}
                    value={form.country}
                    onChange={(val) => handleChange("country", val)}
                />
                {error.country && (
                    <Typography variant="error">{error.country}</Typography>
                )}
            </View>

            <Button
                variant="big"
                onPress={handleSubmit}
                isLoading={isPending_user || isPending_update || isPending_address}
                disabled={!isFormValid}
            >
                {t.updateButton}
            </Button>
        </Layout>
    );
}
