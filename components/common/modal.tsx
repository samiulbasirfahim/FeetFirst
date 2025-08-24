import { Portal } from "react-native-portalize";
import { BlurView } from "expo-blur";
import { Pressable } from "react-native";
import { ReactNode } from "react";

type Props = {
    onClickOutside: () => void;
    isOpen: boolean;
    children: ReactNode;
};

export function Modal({ onClickOutside, isOpen, children }: Props) {
    if (!isOpen) return;
    return (
        <Portal>
            <BlurView intensity={80} className="flex-1" tint="dark">
                <Pressable

                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                    className="z-[9999] p-6 items-center justify-center flex-1"
                    onPress={onClickOutside}
                >
                    <Pressable
                        className="w-full rounded-xl bg-muted-background"
                        onPress={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        {children}
                    </Pressable>
                </Pressable>
            </BlurView>
        </Portal>
    );
}
