import { LogoWrapperSub } from "../ui/logo";
import LogOutIcon from "@/assets/svgs/logout-1.svg";
import { Modal } from "./modal";
import { View } from "react-native";
import { Typography } from "../ui/typography";
import { useLanguageStore } from "@/store/language";
import { Button } from "../ui/button";
import { router, useNavigation } from "expo-router";
import { useAuthStore } from "@/store/auth";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};
export function LogOutModal({ isOpen, onClose }: Props) {
    const { isGerman } = useLanguageStore();
    const { logOut } = useAuthStore();
    return (
        <Modal isOpen={isOpen} onClickOutside={onClose}>
            <View className="flex-col items-center justify-center py-10 px-4 gap-6">
                <LogoWrapperSub Logo={LogOutIcon} />
                <Typography variant="title" className="text-white">
                    {isGerman() ? "Gehst du aus?" : "Stai uscendo?"}
                </Typography>

                <Typography variant="subtitle" className="w-4/5 text-center">
                    {isGerman()
                        ? "Möchten Sie sich wirklich von der App abmelden?"
                        : "Sei sicuro di voler Disconnetterti dall'app?"}
                </Typography>

                <View className="flex-row gap-2">
                    <Button
                        onPress={() => {
                            logOut((sucecss) => {
                                if (sucecss) router.replace("/(public)");
                            });
                        }}
                        className="bg-transparent border-primary border-2  w-1/2"
                        textClassName="text-primary"
                        variant="big"
                    >
                        {isGerman() ? "Und" : "si"}
                    </Button>
                    <Button
                        className="bg-transparent border-primary border-2 w-1/2"
                        textClassName="text-primary"
                        variant="big"
                    >
                        {isGerman() ? "NEIN" : "NO"}
                    </Button>
                </View>
            </View>
        </Modal>
    );
}
