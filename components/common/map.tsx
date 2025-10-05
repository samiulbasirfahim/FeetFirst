import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { Typography } from "../ui/typography";

type Partner = {
    title: string;
    address: string;
    lat: number;
    lng: number;
};

type Props = {};

const mapStyle = [
    { elementType: "geometry", stylers: [{ color: "#0D0D0D" }] },
    { elementType: "labels", stylers: [{ visibility: "off" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ visibility: "on" }, { color: "#BAC4C6" }],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.stroke",
        stylers: [{ visibility: "on" }, { color: "#1A1C1B" }, { weight: 2 }],
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#1A1C1B" }],
    },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#1A1C1B" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#404241" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#0D0D0D" }],
    },
];

export default function Map({ ...props }: Props) {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null,
    );
    const mapRef = useRef<MapView | null>(null);
    const { height } = useWindowDimensions();

    // Request user location
    useEffect(() => {
        const getCurrentLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        };

        getCurrentLocation();
    }, []);

    useEffect(() => {
        if (location && mapRef.current) {
            const camera: any = {
                center: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                zoom: 10,
            };
            mapRef.current.animateCamera(camera, { duration: 800 });
        }
    }, [location]);

    const handleMarkerPress = async (index: number) => {
        if (!partners[index] || !mapRef.current) return;

        setSelectedMarkerIndex(index);

        const marker = partners[index];

        // Zoom out briefly then zoom in to marker
        await new Promise((resolve) => {
            mapRef.current?.animateCamera({ zoom: 9 }, { duration: 200 });
            setTimeout(resolve, 200);
        });

        mapRef.current.animateCamera(
            { center: { latitude: marker.lat, longitude: marker.lng }, zoom: 10 },
            { duration: 800 },
        );
    };

    return (
        <View
            style={{ width: "100%", height: (height / 100) * 70 }}
            {...props}
            className="relative rounded-b-3xl overflow-hidden"
        >
            <MapView
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                showsUserLocation={false}
                showsMyLocationButton={false}
                showsCompass={false}
                showsScale={false}
                showsBuildings={false}
                showsTraffic={false}
                showsIndoors={false}
                showsPointsOfInterest={false}
                toolbarEnabled={false}
                loadingEnabled={false}
                moveOnMarkerPress={false}
                mapType="standard"
                pitchEnabled={false}
                rotateEnabled={false}
            >
                {partners.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                        onPress={() => handleMarkerPress(index)}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <View className="p-1 border-2 border-primary/40 rounded-full overflow-hidden">
                            <View
                                className={`rounded-full ${index === selectedMarkerIndex
                                        ? "bg-primary w-8 h-8"
                                        : "bg-primary/80 w-5 h-5"
                                    }`}
                            />
                        </View>
                    </Marker>
                ))}
            </MapView>

            <View className="absolute bottom-0 left-0 right-0 bg-backgroundDark/90 backdrop-blur-md border-t border-primary/20">
                <View className="p-4">
                    <Typography className="text-white font-semibold text-lg mb-3">
                        Partners
                    </Typography>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 16 }}
                    >
                        {partners.map((marker, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleMarkerPress(index)}
                                className={`mr-3 p-3 rounded-lg border min-w-32 gap-1 ${selectedMarkerIndex === index
                                        ? "bg-primary/20 border-primary"
                                        : "bg-tab-background/50 border-primary/30"
                                    }`}
                            >
                                <Text
                                    className={`text-base font-medium leading-tight ${selectedMarkerIndex === index
                                            ? "text-white"
                                            : "text-foreground"
                                        }`}
                                >
                                    {marker.title}
                                </Text>
                                <Text
                                    className={`text-sm font-medium leading-tight ${selectedMarkerIndex === index
                                            ? "text-white"
                                            : "text-muted-foreground"
                                        }`}
                                >
                                    {marker.address}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
