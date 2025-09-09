import { Platform } from "react-native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { View } from "react-native-animatable";
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
      style={{ alignSelf: "center" }}
      accentColor="#0d0d0d"
      maximumDate={new Date()}
      mode="date"
      value={currentDate}
      display="default"
    />
  );
}

type Props = {
  showDateTimePicker: boolean;
  onClickOutside: (date: Date) => void;
};

export function DatePicker({ onClickOutside, showDateTimePicker }: Props) {
  const date = new Date();
  if (Platform.OS === "ios")
    return (
      <View>
        {showDateTimePicker && (
          <IOSDateTimePicker
            onChange={(date) => onClickOutside(date)}
            currentDate={date}
          />
        )}
      </View>
    );

  return (
    <View>
      {showDateTimePicker && (
        <AndroidDateTimePicker
          onChange={(date) => onClickOutside(date)}
          currentDate={date}
        />
      )}
    </View>
  );
}
