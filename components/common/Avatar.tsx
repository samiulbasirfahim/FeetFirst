import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ApiError, BASE_URL } from "@/lib/fetcher";
import { getString } from "@/store/mmkv";

interface ImagePickerAsset {
    uri: string;
    mimeType?: string | null;
    fileName?: string | null;
    type?: string;
}

export function AvatarImage({
    uri = "https://avatar.iran.liara.run/public/34",
}: {
    uri?: string;
}) {
    const [image, setImage] = useState<string | null>(null);

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
            console.log("Image uploaded successfully:", result);

            setImage(imageData.uri);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const pickImage = async () => {
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

        console.log(result.assets[0]);

        await uploadImage(result.assets[0]);
    };

    return (
        <TouchableOpacity onPress={pickImage} className="w-1/3" activeOpacity={0.9}>
            <Image
                source={{ uri: image ?? uri }}
                className="w-full aspect-square rounded-full"
            />
        </TouchableOpacity>
    );
}
