import React, { useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { Typography } from "../ui/typography";

const partners = [
    {
        title: "Brandenburger Tor",
        address: "Pariser Platz, 10117 Berlin, Germany",
        lat: 52.5163,
        lng: 13.3777,
    },
    {
        title: "Kölner Dom",
        address: "Domkloster 4, 50667 Köln, Germany",
        lat: 50.9413,
        lng: 6.9583,
    },
    {
        title: "Neuschwanstein Schloss",
        address: "Neuschwansteinstraße 20, 87645 Schwangau, Germany",
        lat: 47.5576,
        lng: 10.7498,
    },
    {
        title: "Frauenkirche Dresden",
        address: "Neumarkt, 01067 Dresden, Germany",
        lat: 51.0504,
        lng: 13.7373,
    },
    {
        title: "Heidelberger Schloss",
        address: "Schlosshof 1, 69117 Heidelberg, Germany",
        lat: 49.41,
        lng: 8.715,
    },
    {
        title: "Holstentor Lübeck",
        address: "Holstentorplatz, 23552 Lübeck, Germany",
        lat: 53.8689,
        lng: 10.6866,
    },
    {
        title: "Schloss Sanssouci",
        address: "Maulbeerallee, 14469 Potsdam, Germany",
        lat: 52.4036,
        lng: 13.054,
    },
    {
        title: "Olympiastadion Berlin",
        address: "Olympischer Platz 3, 14053 Berlin, Germany",
        lat: 52.5145,
        lng: 13.2394,
    },
    {
        title: "Rathaus Hamburg",
        address: "Rathausmarkt 1, 20095 Hamburg, Germany",
        lat: 53.5503,
        lng: 10.005,
    },
    {
        title: "Zugspitze",
        address: "82491 Grainau, Germany",
        lat: 47.421,
        lng: 10.985,
    },
];

const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            { color: "#0D0D0D" }, // backgroundDark
        ],
    },
    {
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ visibility: "on" }, { color: "#BAC4C6" }],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.stroke",
        stylers: [
            { visibility: "on" },
            { color: "#1A1C1B" }, // background
            { weight: 2 },
        ],
    },
    {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
            { color: "#1A1C1B" }, // background
        ],
    },
    {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
            { visibility: "on" },
            { color: "#1A1C1B" }, // background
        ],
    },
    {
        featureType: "road",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            { visibility: "on" },
            { color: "#404241" }, // accent - more subtle
        ],
    },
    {
        featureType: "transit",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            { color: "#0D0D0D" }, // backgroundDark
        ],
    },
];

export default function Map() {
    const { height } = useWindowDimensions();
    const mapRef = useRef<any>(null);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);

    const handleMarkerPress = async (index: number) => {
        const marker = partners[index];

        await new Promise((resolve) => {
            mapRef.current?.animateCamera(
                {
                    zoom: 9,
                },
                {
                    duration: 200,
                },
            );
            setTimeout(resolve, 200);
        });

        mapRef.current?.animateCamera(
            {
                center: {
                    latitude: marker.lat,
                    longitude: marker.lng,
                },
                zoom: 10,
            },
            { duration: 800 },
        );

        setSelectedMarkerIndex(index);
    };

    return (
        <View
            className="relative rounded-b-3xl overflow-hidden"
            style={{ width: "100%", height: (height / 100) * 70 }}
        >
            <MapView
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                initialRegion={{
                    latitude: partners[0].lat,
                    longitude: partners[0].lng,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.025,
                }}
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
                        onPress={() => setSelectedMarkerIndex(index)}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <View className="p-1 border-2 border-primary/40 rounded-full">
                            <View
                                className={`rounded-full ${index === selectedMarkerIndex
                                        ? "bg-primary w-8 h-8"
                                        : "bg-primary/80 w-5 h-5"
                                    }`}
                            ></View>
                        </View>
                    </Marker>
                ))}
            </MapView>

            {false || (
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
            )}
        </View>
    );
}
