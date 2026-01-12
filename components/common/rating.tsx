import { OrderItem } from "@/type/order";
import { Modal } from "./modal";
import { View } from "react-native";

export type RatingModalProps = {
    orderDetails: OrderItem;
    isOpen: boolean;
    onClose: () => void;
};

export function RatingModal({
    isOpen,
    onClose,
    orderDetails,
}: RatingModalProps) {
    return (
        <Modal isOpen={isOpen} onClickOutside={onClose}>
            <View></View>
        </Modal>
    );
}
