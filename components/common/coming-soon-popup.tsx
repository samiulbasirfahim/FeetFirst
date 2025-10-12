import { View } from "react-native";
import { Modal } from "./modal";
import { Typography } from "../ui/typography";
import { useLanguageStore } from "@/store/language";

export function ComingSoonPopup({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) {
    const { isGerman } = useLanguageStore();

    return (
        <Modal isOpen={visible} onClickOutside={onClose}>
            <View className="bg-background p-6 rounded-lg items-center">
                <Typography className="text-center">
                    {isGerman()
                        ? "Diese Funktion wird bald verfügbar sein!"
                        : "This feature will be available soon!"}
                </Typography>
            </View>
        </Modal>
    );
}
