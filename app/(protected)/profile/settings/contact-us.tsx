import SUBJECT from "@/assets/svgs/discover.svg";
import MESSAGE from "@/assets/svgs/message.svg";
import MAN from "@/assets/svgs/profile.svg";
import EMAIL from "@/assets/svgs/sms.svg";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguageStore } from "@/store/language";
import { useState } from "react";
import { TextInput, View } from "react-native";

export default function Screen() {
  const [text, setText] = useState("");
  const { isGerman } = useLanguageStore();
  const [show_modal, set_show_modal] = useState<boolean>(false);
  return (
    <Layout scrollable avoidTabbar avoidKeyboard>
      {/* name */}
      <Input
        Icon={MAN}
        placeholder={isGerman() ? "Namen eingeben" : "Inserisci nome"}
      />

      {/* email */}
      <Input
        Icon={EMAIL}
        placeholder={
          isGerman() ? "Geben Sie die E-Mail-Adresse ein" : "Inserisci email"
        }
      />

      {/* subject */}
      <Input
        Icon={SUBJECT}
        placeholder={
          isGerman() ? "Geben Sie den Betreff ein" : "Inserisci l'oggetto"
        }
      />

      {/* comments */}
      <View className="bg-muted-background rounded-lg overflow-hidden p-4 flex-row items-start gap-2">
        <View className="pr-2 border-r-2 border-muted-foreground py-0">
          <MESSAGE width={22} height={22} />
        </View>
        <TextInput
          multiline
          value={text}
          onChangeText={setText}
          className="text-foreground bg-muted-background flex-1 h-40 placeholder:text-muted-foreground"
          style={{
            lineHeight: 22,
            paddingTop: 0,
            textAlignVertical: "top",
          }}
          placeholder={
            isGerman()
              ? "Geben Sie zusätzliche Kommentare ein"
              : "Inserisci Ulteriori commenti"
          }
        />
      </View>

      {/* send */}
      <Button
        onPress={() => set_show_modal(true)}
        variant="big"
        className={`items-center justify-center`}
        textClassName="text-center"
      >
        {isGerman() ? "SCHICKEN" : "Invia"}
      </Button>
    </Layout>
  );
}
