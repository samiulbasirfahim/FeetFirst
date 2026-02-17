import {
    initPaymentSheet,
    presentPaymentSheet,
} from "@stripe/stripe-react-native";

import { ApiError, BASE_URL, fetcher } from "./fetcher";
import { getString } from "@/store/mmkv";
import { router } from "expo-router";
import { notify } from "./notify";
import { queryClient } from "./queryClient";

const fetchPaymentSheetParams = async (isGerman: boolean) => {
    const token = getString("access_token");

    try {
        const res = await fetch(`${BASE_URL}/api/create-order/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": `Bearer ${token}`,
                Authorization: `Bearer ${token}`,
            },
        });

        const response = await res.json();

        if (!res.ok) {
            if (res.status === 400) {
                if ((response.error as string).includes("Your cart is empty")) {
                    notify({
                        message: isGerman
                            ? "Ihr Warenkorb ist leer. Fügen Sie Artikel hinzu, um fortzufahren."
                            : "Il tuo carrello è vuoto. Aggiungi articoli per procedere.",
                        title: isGerman ? "Warenkorb leer" : "Carrello vuoto",
                        type: "error",
                    });

                    setTimeout(() => {
                        router.push("/(protected)/shoe-recommendations/shoes");
                    }, 2000);
                }

                if (
                    (response.error as string).includes("Please complete your address")
                ) {
                    // notify({
                    //     message: isGerman
                    //         ? "Bitte vervollständigen Sie zuerst Ihre Adresse."
                    //         : "Si prega di completare prima il tuo indirizzo.",
                    //     title: isGerman ? "Adresse erforderlich" : "Indirizzo richiesto",
                    //     type: "error",
                    // });

                    // setTimeout(() => {
                    router.push({
                        pathname: "/(protected)/profile/settings/address",
                        params: { redirectTo: "/(protected)/cart" },
                    });
                    // }, 2000);
                }
            }
            throw new ApiError(res.status, response);
        }

        const { payment_intent } = response as {
            payment_intent: {
                paymentIntent: string;
                customerSessionClientSecret: string;
                customer: string;
                publishableKey: string;
            };
        };

        return {
            paymentIntent: payment_intent.paymentIntent,
            customerSessionClientSecret: payment_intent.customerSessionClientSecret,
            customer: payment_intent.customer,
            publishableKey: payment_intent.publishableKey,
        };
    } catch (error) {
        notify({
            message: isGerman
                ? "Beim Einrichten der Zahlung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
                : "Si è verificato un errore durante la configurazione del pagamento. Per favore riprova.",
            title: isGerman ? "Zahlungsfehler" : "Errore di pagamento",
            type: "error",
        });
        console.error("Error fetching payment sheet params:", error);
        throw error;
    }
};

const initializePaymentSheet = async (isGerman: boolean) => {
    const { paymentIntent, customerSessionClientSecret, customer } =
        await fetchPaymentSheetParams(isGerman);

    const { error } = await initPaymentSheet({
        merchantDisplayName: "FeetF1rst Shop",
        customerId: customer,
        customerSessionClientSecret: customerSessionClientSecret,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: false,
        returnURL: "feetf1rst://stripe-redirect",
        appearance: {
            colors: {
                background: "#121212",
                componentBackground: "#1e1e1e",
                componentBorder: "#272727",
                componentDivider: "#272727",
                componentText: "#ffffff",
                placeholderText: "#a1a1aa",
                icon: "#ffffff",
                primaryText: "#ffffff",
                secondaryText: "#a1a1aa",
                primary: "#4ade80",
                error: "#f87171",
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return { success: true, returnUrl: "feetf1rst://stripe-redirect" };
};

const openPaymentSheet = async (isGerman: boolean) => {
    const { error } = await presentPaymentSheet({
        timeout: 10 * 1000 * 60,
    });
    console.log("Payment Sheet Result:", error);
    if (error) {
        notify({
            message: isGerman
                ? "Die Zahlung ist fehlgeschlagen. Bitte versuchen Sie es erneut."
                : "Il pagamento non è riuscito. Per favore riprova.",
            title: isGerman ? "Zahlung fehlgeschlagen" : "Pagamento non riuscito",
            type: "error",
        });
        throw new Error(error.localizedMessage);
    } else {
        notify({
            message: isGerman
                ? "Ihre Zahlung war erfolgreich! Vielen Dank für Ihren Einkauf."
                : "Il tuo pagamento è stato completato con successo! Grazie per il tuo acquisto.",
            title: isGerman ? "Zahlung erfolgreich" : "Pagamento riuscito",
            type: "success",
        });

        // Get cart data to extract product IDs
        const cartData = queryClient.getQueryData<{
            items: Array<{ product_id: number }>;
        }>(["cart"]);

        const productIds = cartData?.items?.map((item) => item.product_id) || [];

        fetcher("/api/cart/clear/", {
            method: "POST",
            auth: true,
        }).then(() => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["order-list"] });

            // Invalidate individual product queries
            productIds.forEach((productId) => {
                queryClient.invalidateQueries({ queryKey: ["product", productId] });
            });
        });
    }
};

export { initializePaymentSheet, openPaymentSheet };
