// import { Layout } from "@/components/layout/layout";
// import { Button } from "@/components/ui/button";
// import CheckBox from "@/components/ui/checkbox";
// import { Typography } from "@/components/ui/typography";
// import { useLanguageStore } from "@/store/language";
// import { Link } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import { FlatList, Platform, Pressable, TextInput, View } from "react-native";
//
//
// export default function Screen() {
//   const { isGerman } = useLanguageStore();
//   const input_ref = useRef<TextInput>(null);
//
//   const [checkedValues, setCheckedValues] = useState<string[]>([]);
//   const [customOptions, setCustomOptions] = useState<string[]>([]);
//   const [showOtherInput, setShowOtherInput] = useState(false);
//   const [otherValue, setOtherValue] = useState("");
//
//   function toggleCheck(value: string) {
//     if (checkedValues.includes(value)) {
//       return setCheckedValues(checkedValues.filter((v) => v !== value));
//     }
//     setCheckedValues((prev) => [...prev, value]);
//   }
//
//   useEffect(() => {
//     if (showOtherInput && Platform.OS === "android") {
//       const timer = setTimeout(() => {
//         input_ref.current?.focus();
//       }, 400);
//
//       return () => clearTimeout(timer);
//     } else if (showOtherInput) {
//       input_ref.current?.focus();
//     }
//   }, [showOtherInput]);
//
//   const baseOptions = isGerman() ? optionsDE : optionsIT;
//   const data = [...baseOptions, ...customOptions];
//
//   return (
//     <Layout scrollable avoidKeyboard edges={["bottom"]}>
//       <View style={{ flex: 1, paddingBottom: 24 }}>
//
//         <FlatList
//           style={{ marginTop: 16 }}
//           data={data}
//           keyExtractor={(item, idx) => `${item}-${idx}`}
//           showsVerticalScrollIndicator={true}
//           keyboardDismissMode="on-drag"
//           keyboardShouldPersistTaps={"always"}
//           nestedScrollEnabled={true}
//           ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
//           renderItem={({ item }) => (
//             <Pressable
//               onPress={() => toggleCheck(item)}
//               style={{
//                 backgroundColor: "#2C2C2D",
//                 paddingVertical: 16,
//                 paddingHorizontal: 16,
//                 borderRadius: 8,
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   gap: 4,
//                 }}
//               >
//                 <Typography className="flex-1 text-lg">{item}</Typography>
//                 <CheckBox
//                   onPress={() => toggleCheck(item)}
//                   unFillColor="#303231"
//                   innerIconStyle={{
//                     borderWidth: 1,
//                     borderColor: "#585C5B",
//                     borderRadius: 6,
//                   }}
//                   fillColor="#62A07B"
//                   isChecked={checkedValues.includes(item)}
//                   iconStyle={{
//                     borderRadius: 6,
//                   }}
//                 />
//               </View>
//             </Pressable>
//           )}
//           ListFooterComponent={
//             <View style={{ marginTop: 16, marginBottom: 16 }}>
//               {!showOtherInput ? (
//                 <Pressable
//                   onPress={() => setShowOtherInput(true)}
//                   style={{
//                     backgroundColor: "#2C2C2D",
//                     paddingVertical: 16,
//                     paddingHorizontal: 16,
//                     borderRadius: 8,
//                   }}
//                 >
//                   <Typography className="flex-1 text-lg">
//                     {isGerman() ? "Andere" : "Altro"}
//                   </Typography>
//                 </Pressable>
//               ) : (
//                 <TextInput
//                   ref={input_ref}
//                   autoFocus
//                   placeholder={
//                     isGerman() ? "Bitte angeben..." : "Specifica qui..."
//                   }
//                   style={{
//                     backgroundColor: "#2C2C2D",
//                     paddingVertical: 16,
//                     paddingHorizontal: 16,
//                     borderRadius: 8,
//                     fontSize: 16,
//                     color: "#FFFFFF",
//                   }}
//                   value={otherValue}
//                   onChangeText={setOtherValue}
//                   onSubmitEditing={() => {
//                     const trimmed = otherValue.trim();
//                     if (trimmed.length > 0) {
//                       setCustomOptions((prev) => [...prev, trimmed]);
//                       setCheckedValues((prev) => [...prev, trimmed]);
//                     }
//                     setShowOtherInput(false);
//                     setOtherValue("");
//                   }}
//                 />
//               )}
//             </View>
//           }
//         />
//       </View>
//
//     </Layout>
//   );
// }
//
//

const optionsIT: string[] = [
  "Attraverso i social media (Instagram, Facebook, ecc.)",
  "In un negozio partner",
  "Durante uno scan event",
  "Passaparola (consiglio di un amico o conoscente)",
];

const optionsDE: string[] = [
  "Über soziale Medien (Instagram, Facebook usw.)",
  "In einem Partnergeschäft",
  "Bei einem Scan-Event",
  "Mundpropaganda (Empfehlung eines Freundes oder Bekannten)",
];

import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const list = isGerman() ? optionsDE : optionsIT;
  return (
    <OnBoardingLayout
      HeaderComponent={
        <Typography variant="title" className="text-foreground">
          {isGerman()
            ? "Wie haben Sie FeetF1rst entdeckt?"
            : "Come ha scoperto FeetF1rst?"}
        </Typography>
      }
      options={list}
      multiple={true}
      showOtherInput={true}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      FooterComponent={
        <Link asChild href={"/on-boarding/interests-question"}>
          <Button variant="big">{isGerman() ? "nächste" : "prossima"}</Button>
        </Link>
      }
    />
  );
}
