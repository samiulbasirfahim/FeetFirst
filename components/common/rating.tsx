import { OrderItem } from "@/type/order";
import { Modal } from "./modal";
import { View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Ionicons } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/language";

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
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { isGerman } = useLanguageStore();

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (rating === 0) return;

        setIsSubmitting(true);
        try {
            console.log("Submitting rating:", {
                rating,
                review,
                orderId: orderDetails.id,
            });

            setRating(0);
            setReview("");
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setRating(0);
        setReview("");
        setHoveredRating(0);
        onClose();
    };

    const ratingText =
        rating === 1
            ? isGerman()
                ? "Sehr schlecht"
                : "Very bad"
            : rating === 2
                ? isGerman()
                    ? "Schlecht"
                    : "Bad"
                : rating === 3
                    ? isGerman()
                        ? "Durchschnittlich"
                        : "Average"
                    : rating === 4
                        ? isGerman()
                            ? "Gut"
                            : "Good"
                        : rating === 5
                            ? isGerman()
                                ? "Ausgezeichnet"
                                : "Excellent"
                            : "";

    return (
        <Modal isOpen={isOpen} onClickOutside={handleClose}>
            <View className="p-6 gap-4">
                <Typography variant="titleSecondary" className="text-center">
                    {isGerman() ? "Bewerte deine Bestellung" : "Rate your order"}
                </Typography>

                <View className="items-center gap-2">
                    <Typography
                        variant="body"
                        className="text-center text-muted-foreground"
                    >
                        {orderDetails.product}
                    </Typography>

                    <Typography variant="caption" className="text-center">
                        {isGerman() ? "Bestellung" : "Order"} #{orderDetails.order_id}
                    </Typography>
                </View>

                <View className="flex-row justify-center gap-2 py-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity
                            key={star}
                            onPress={() => setRating(star)}
                            onPressIn={() => setHoveredRating(star)}
                            onPressOut={() => setHoveredRating(0)}
                            activeOpacity={0.7}
                            className="p-1"
                        >
                            <Ionicons
                                name={
                                    star <= (hoveredRating || rating) ? "star" : "star-outline"
                                }
                                size={40}
                                color={star <= (hoveredRating || rating) ? "#FFD700" : "#999"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {rating > 0 && (
                    <Typography variant="body" className="text-center text-primary">
                        {ratingText}
                    </Typography>
                )}

                <View className="gap-2 hidden">
                    <Typography variant="body">
                        {isGerman()
                            ? "Deine Bewertung (optional)"
                            : "Your review (optional)"}
                    </Typography>

                    <TextInput
                        value={review}
                        onChangeText={setReview}
                        placeholder={
                            isGerman()
                                ? "Teile deine Erfahrungen..."
                                : "Share your experience..."
                        }
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        className="border border-muted-foreground/30 rounded-xl p-3 text-foreground min-h-[100px]"
                    />
                </View>

                <Button
                    variant="big"
                    onPress={handleSubmit}
                    disabled={rating === 0 || isSubmitting}
                    isLoading={isSubmitting}
                >
                    {isGerman() ? "Bewerten" : "Submit rating"}
                </Button>
            </View>
        </Modal>
    );
}
