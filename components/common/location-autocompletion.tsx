import { useEffect, useRef, useState } from "react";
import { View, FlatList, Pressable, ActivityIndicator } from "react-native";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";

type Prediction = {
    place_id: string;
    description: string;
};

type GooglePlaceResult = {
    formatted_address: string;
    address_components: {
        long_name: string;
        short_name: string;
        types: string[];
    }[];
};

type Props = {
    apiKey: string;
    value: string;
    placeholder?: string;
    onSelect: (place: GooglePlaceResult) => void;
};

/* ================= COMPONENT ================= */

export function AddressAutocompleteInput({
    apiKey,
    value,
    onSelect,
    placeholder = "Search address",
}: Props) {
    const [query, setQuery] = useState("");
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(false);

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const { isGerman } = useLanguageStore();

    const language = isGerman() ? "de" : "it";

    const searchPlaces = (text: string) => {
        setQuery(text);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(async () => {
            if (text.length < 3) {
                setPredictions([]);
                return;
            }

            try {
                setLoading(true);

                const res = await fetch(
                    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                        text,
                    )}&key=${apiKey}&language=${language}&components=country:de|country:it|country:at&types=address`,
                );

                const json = await res.json();
                setPredictions(json.predictions || []);
            } catch (err) {
                console.log("Places error:", err);
            } finally {
                setLoading(false);
            }
        }, 400);
    };

    /* ================= DETAILS ================= */

    const getDetails = async (placeId: string) => {
        try {
            const res = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=${language}`,
            );

            const json = await res.json();
            onSelect(json.result);
            setPredictions([]);
            setQuery("");
        } catch (err) {
            console.log("Details error:", err);
        }
    };

    /* ================= CLEANUP ================= */

    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);

    /* ================= UI ================= */

    return (
        <View>
            <Input
                placeholder={placeholder}
                value={query || value}
                onChangeText={searchPlaces}
            />

            {loading && (
                <View style={{ marginTop: 6 }}>
                    <ActivityIndicator size="small" />
                </View>
            )}

            {predictions.length > 0 && (
                <View
                    style={{
                        backgroundColor: "#1f1f1f",
                        borderRadius: 8,
                        marginTop: 4,
                        maxHeight: 260,
                    }}
                >
                    <FlatList
                        data={predictions}
                        keyboardShouldPersistTaps="handled"
                        nestedScrollEnabled
                        showsVerticalScrollIndicator
                        keyExtractor={(item) => item.place_id}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => getDetails(item.place_id)}
                                style={{
                                    padding: 14,
                                    borderBottomWidth: 1,
                                    borderColor: "#333",
                                }}
                            >
                                <Typography>{item.description}</Typography>
                            </Pressable>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
