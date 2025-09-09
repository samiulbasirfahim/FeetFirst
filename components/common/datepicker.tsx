import { Platform } from "react-native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { View } from "react-native";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Modal } from "./modal";

type DatePcikerProps = {
  onChange: (date: Date) => void;
  currentDate: Date;
};

function AndroidDateTimePicker({ onChange, currentDate }: DatePcikerProps) {
  const showDateTimePicker = () => {
    DateTimePickerAndroid.open({
      value: currentDate,
      maximumDate: new Date(),
      onChange: (_, date) => onChange(date || new Date()),
    });
  };

  useEffect(() => showDateTimePicker());

  return <View></View>;
}

function IOSDateTimePicker({ onChange, currentDate }: DatePcikerProps) {
  return (
    <RNDateTimePicker
      onChange={(_, date) => onChange(date || new Date())}
      style={{ alignSelf: "center", backgroundColor: "#1A1C1B" }}
      maximumDate={new Date()}
      mode="date"
      textColor="#62A07B"
      accentColor="#62A07B"
      value={currentDate}
      display="compact"
    />
  );
}

type Props = {
  showDateTimePicker: boolean;
  onClickOutside: (date: Date) => void;
};

export function DatePicker({ onClickOutside, showDateTimePicker }: Props) {
  const [date, setDate] = useState(new Date());
  if (Platform.OS === "ios")
    return (
      <Modal
        isOpen={showDateTimePicker}
        onClickOutside={() => onClickOutside(date)}
      >
        <View className="bg-background p-4 rounded-lg">
          <View className="py-4">
            <IOSDateTimePicker
              onChange={(date) => setDate(date)}
              currentDate={date}
            />
          </View>
          <View className="border-t-2 border-muted-foreground py-4">
            <Typography variant="subtitle" className="text-center text-primary">
              Pick Your Date Of Birth
            </Typography>
          </View>
        </View>
      </Modal>
    );

  return (
    <View>
      {showDateTimePicker && (
        <AndroidDateTimePicker
          onChange={(date) => {
            setDate(date);
            onClickOutside(date);
          }}
          currentDate={date}
        />
      )}
    </View>
  );
}
