import { useState } from "react";
import { Modal } from "./modal";
import { Typography } from "../ui/typography";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  children: string;
  size?: number;
};

export default function InfoModal({ children, size = 18 }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <View>
      <View className="flex-row">
        <TouchableOpacity
          className="bg-primary p-1 rounded-full"
          onPress={() => {
            setShowModal(true);
          }}
        >
          <MaterialIcons name="question-mark" size={size} color="#1A1C1B" />
        </TouchableOpacity>
      </View>
      <Modal isOpen={showModal} onClickOutside={() => setShowModal(false)}>
        <View className="p-3">
          <Typography>{children}</Typography>
        </View>
      </Modal>
    </View>
  );
}
