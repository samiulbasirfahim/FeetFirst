import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ApiError, BASE_URL } from "@/lib/fetcher";
import { getString } from "@/store/mmkv";
import { useAuthStore } from "@/store/auth";
import { Typography } from "../ui/typography";
import { useLanguageStore } from "@/store/language";

interface ImagePickerAsset {
    uri: string;
    mimeType?: string | null;
    fileName?: string | null;
    type?: string;
}

export function AvatarImage({
    uri = "https://avatar.iran.liara.run/public/34",
    upload_able = false,
}: {
    uri?: string;
    upload_able?: boolean;
}) {
    const [image, setImage] = useState<string | null>(null);
    const { user, setUser } = useAuthStore();
    const { isGerman } = useLanguageStore();

    const uploadImage = async (imageData: ImagePickerAsset) => {
        try {
            const formData = new FormData();

            formData.append("image", {
                uri: imageData.uri,
                type: imageData.mimeType || "image/jpeg",
                name: imageData.fileName || "profile_image.jpg",
            } as any);

            const accessToken = getString("access_token");

            const response = await fetch(`${BASE_URL}/api/users/update/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new ApiError(
                    errorData.message || "Failed to upload image",
                    response.status,
                );
            }

            const result = await response.json();

            if (result.image) {
                setUser({ ...user, image: result.image } as any);
            }
            setImage(null);

            console.log("Image uploaded successfully:", result);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const pickImage = async () => {
        if (!upload_able) return;
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        if (result.assets[0].type !== "image") return;

        setImage(result.assets[0].uri);

        await uploadImage(result.assets[0]);
    };

    return (
        <TouchableOpacity
            onPress={pickImage}
            className="w-1/3 items-center gap-2"
            activeOpacity={upload_able ? 0.9 : 1}
        >
            <Image
                source={{ uri: image === null ? uri : image }}
                className="w-full aspect-square rounded-full"
            />
            {upload_able && (
                <Typography className="text-sm font-pathRegular">
                    {isGerman() ? "Avatar ändern" : "Change Avatar"}
                </Typography>
            )}
        </TouchableOpacity>
    );
}
