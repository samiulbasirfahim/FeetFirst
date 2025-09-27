import { VersionInfo } from "@/components/common/version";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useFaq } from "@/lib/queries/faq";
import { useLanguageStore } from "@/store/language";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Collapsible from "react-native-collapsible";

const FAQ_DATA = [
    {
        id: "1",
        question_de: "Wie funktioniert die FeetF1rst App?",
        answer_de:
            "Die App funktioniert auf Basis deines 3D-Scans. Nach dem Scan erhältst du einen Link per E-Mail mit allen weiteren Schritten und Empfehlungen.",
        question_it: "Come funziona l'app FeetF1rst?",
        answer_it:
            "L'app funziona sulla base della tua scansione 3D. Dopo la scansione riceverai un link via e-mail con tutti i passaggi successivi e i consigli personalizzati.",
    },
    {
        id: "2",
        question_de: "Wo kann ich den 3D-Scan machen?",
        answer_de:
            "Alle Scan-Standorte findest du direkt in der App im Menüpunkt 'FeetF1rst Points'. Dort kannst du einen passenden Standort in deiner Nähe auswählen.",
        question_it: "Dove posso fare la scansione 3D?",
        answer_it:
            "Tutti i punti di scansione si trovano direttamente nell'app nella sezione 'FeetF1rst Points'. Lì puoi scegliere una sede vicino a te.",
    },
    {
        id: "3",
        question_de: "Muss ich meinen 3D-Scan regelmäßig erneuern?",
        answer_de:
            "Nein, dein Scan bleibt gespeichert und kann jederzeit genutzt werden, solange sich deine Fußmaße nicht wesentlich verändern.",
        question_it: "Devo ripetere regolarmente la mia scansione 3D?",
        answer_it:
            "No, la tua scansione rimane salvata e può essere utilizzata in qualsiasi momento, a meno che le tue misure del piede non cambino in modo significativo.",
    },
];

// const supportAreas = [
//   'ALLGEMEINES',
//   'SHOE FINDER',
//   'MASSEINLAGEN',
//   'MASSSCHUHE',
//   'FUSSÜBUNGEN',
//   'SUPPORT',
// ];
//
// const supportText = {
//   de: [
//     'Sie haben nicht gefunden, was Sie suchen?',
//     'Unser Support-Team steht Ihnen jederzeit zur Verfügung.',
//     'Jetzt kontaktieren!',
//   ],
//   it: [
//     'Non hai trovato quello che cerchi?',
//     'Il nostro team di supporto è a tua disposizione in qualsiasi momento.',
//     'Contattaci ora!',
//   ],
// };

export default function Screen() {
    const { isGerman, language } = useLanguageStore();

    const { data = [], isPending } = useFaq();
    const [supportAreas, setSupportAreas] = useState<string[]>([]);
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        setSupportAreas([]);
        setLines([]);
        (data as []).forEach((each: any) => {
            const new_area = isGerman() ? each.question_de : each.question_it;
            const new_line = isGerman() ? each.answer_de : each.answer_it;
            setSupportAreas((prev) => [...prev, new_area]);
            setLines((prev) => [...prev, new_line]);
        });
    }, [data, isPending, language]);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const FAQItem = ({
        question,
        answer,
    }: {
        question: string;
        answer: string;
    }) => {
        const [expanded, setExpanded] = useState<boolean>(false);
        const preview = answer.slice(0, 88) + (answer.length > 80 ? " ..." : "");

        return (
            <View className="mb-4 px-4">
                <Text className="text-white font-bold">{question}</Text>
                <Text className="text-white">
                    {expanded ? answer : preview}
                    {answer.length > 80 && !expanded && (
                        <Text onPress={() => setExpanded(true)}>
                            {isGerman() ? "[mehr]" : "[Di più]"}
                        </Text>
                    )}
                </Text>
                {expanded && (
                    <TouchableOpacity onPress={() => setExpanded(false)}>
                        <Text className="text-white">
                            {isGerman() ? "[weniger]" : "[meno]"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const renderSupportItem = ({
        area,
        line,
    }: {
        area: string;
        line: string;
    }) => {
        const isActive = activeSection === area;
        return (
            <View className="border-b border-gray-600">
                <TouchableOpacity
                    className="flex-row justify-between py-3 pr-2"
                    onPress={() => setActiveSection(isActive ? null : area)}
                >
                    <Text className="text-white text-xl">{area}</Text>
                    <Text className="text-white text-3xl">{isActive ? "–" : "+"}</Text>
                </TouchableOpacity>
                <Collapsible collapsed={!isActive}>
                    <Text className="text-gray-400 mb-3">{line}</Text>
                </Collapsible>
            </View>
        );
    };
    // Combine all data into sections for a single FlatList
    const allSections = [
        { type: "header", id: "header" },
        { type: "faq-title", id: "faq-title" },
        ...FAQ_DATA.map((item) => ({ type: "faq", ...item })),
        { type: "support-title", id: "support-title" },
        ...supportAreas.map((area, index) => ({
            type: "support",
            id: `support-${index}`,
            area,
            line: lines[index],
        })),
        { type: "footer", id: "footer" },
    ];

    const renderItem = ({ item }: any) => {
        switch (item.type) {
            case "header":
                return (
                    <View className="flex justify-center items-center">
                        <TextInput
                            placeholder={
                                isGerman()
                                    ? "Wie können wir Ihnen helfen?"
                                    : "Come possiamo aiutarla?"
                            }
                            className="text-white py-3"
                            placeholderTextColor="#9CA3AF"
                        />
                        <View className="h-0.5 w-full bg-white"></View>
                    </View>
                );

            case "faq-title":
                return (
                    <View className="my-8">
                        <Text className="text-white font-bold text-2xl">
                            {isGerman() ? "IHRE HÄUFIGSTEN FRAGEN" : "DOMANDE PIÙ FREQUENTI"}
                        </Text>
                    </View>
                );

            case "faq":
                return isGerman() ? (
                    <FAQItem question={item.question_de} answer={item.answer_de} />
                ) : (
                    <FAQItem question={item.question_it} answer={item.answer_it} />
                );

            case "support-title":
                return (
                    <View className="my-12">
                        <Text className="text-white font-bold text-2xl">
                            {isGerman()
                                ? "ALLE SUPPORT BEREICHE"
                                : "TUTTE LE AREE DI SUPPORTO"}
                        </Text>
                    </View>
                );

            case "support":
                return renderSupportItem({ area: item.area, line: item.line });

            case "footer":
                return (
                    <View>
                        <View className="flex-row gap-6 px-4 items-center my-12">
                            {/* Chat bubble icon */}

                            <FontAwesome6 name="message" size={46} color="#62A07B" />

                            <View className="flex-1">
                                <Typography>
                                    {isGerman()
                                        ? `Haben Sie nicht gefunden, was Sie suchen? Unser Support-Team steht Ihnen jederzeit zur Verfügung. Kontaktieren Sie uns jetzt!`
                                        : `Non hai trovato quello che stavi cercando? Il nostro team di supporto è sempre a tua disposizione. Contattaci subito!`}
                                </Typography>
                            </View>
                        </View>
                        <VersionInfo />
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <Layout className="bg-backgroundDark">
            <FlatList
                data={allSections}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
            />
        </Layout>
    );
}
