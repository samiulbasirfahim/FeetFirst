import { News } from "@/type/news";
import { Modal } from "./modal";
import { useMemo, useState } from "react";
import {
    Image,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { Typography } from "../ui/typography";
import { useLanguageStore } from "@/store/language";

type Props = {
    item: News;
};

export function NewsCard({ item }: Props) {
    const { width } = useWindowDimensions();
    const [showModal, setShowModal] = useState<boolean>(false);
    const { isGerman, language } = useLanguageStore();

    const itemFinal = useMemo(() => {
        return {
            title: isGerman() ? item.title_de : item.title_it,
            content: isGerman() ? item.content_de : item.content_it,
        };
    }, [language]);

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowModal(true)}
                className="mr-4 border border-primary/20 rounded-2xl bg-background"
                style={{ width: width * 0.85 }}
            >
                <View className="flex-row p-3 gap-3 justify-between items-center">
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 90, height: 90 }}
                        className="border border-primary rounded-2xl"
                    />
                    <View className="flex-1">
                        <Typography
                            className="text-sm font-medium mb-1.5"
                            numberOfLines={2}
                        >
                            {itemFinal.title}
                        </Typography>
                        <Typography className="text-[10px]" numberOfLines={3}>
                            {itemFinal.content}
                        </Typography>
                    </View>
                </View>
            </TouchableOpacity>

            <Modal isOpen={showModal} onClickOutside={() => setShowModal(false)}>
                <View className="p-3 gap-4 items-center">
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 150, height: 150 }}
                        className="border border-primary rounded-2xl"
                    />
                    <Typography variant="titleSecondary" className="text-center">
                        {item.title_de}
                    </Typography>
                    <Typography
                        variant="body"
                        className="text-justify text-muted-foreground"
                    >
                        {item.content_de}
                    </Typography>
                </View>
            </Modal>
        </View>
    );
}
