import { useState, useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { View } from "react-native";
import { Typography } from "../ui/typography";
// import MapViewDirections from "react-native-maps-directions";

const mapStyle = [
    {
        elementType: "geometry",
        stylers: [{ color: "#0D0D0D" }],
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
        stylers: [{ visibility: "on" }, { color: "#1A1C1B" }, { weight: 2 }],
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
        stylers: [{ color: "#1A1C1B" }],
    },
    {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ visibility: "on" }, { color: "#1A1C1B" }],
    },
    {
        featureType: "road",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ visibility: "on" }, { color: "#404241" }],
    },
    {
        featureType: "transit",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#0D0D0D" }],
    },
];

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
];

export function Map() {
    const mapRef = useRef<any>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setIsLoading(false);
        }

        getCurrentLocation();
    }, []);

    useEffect(() => {
        if (location) {
            mapRef.current?.animateCamera(
                {
                    center: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                    zoom: 10,
                },
                { duration: 800 },
            );
        }
    }, [location]);

    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };

    return (
        <>
            <MapView
                style={{ width: "100%", height: "100%" }}
                region={{
                    latitude: location?.coords.latitude ?? partners[0].lat,
                    longitude: location?.coords.longitude ?? partners[0].lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                mapType="standard"
                scrollEnabled={false}
            >
                <Marker coordinate={origin} />
                <Marker coordinate={destination} />
                {
                    // <MapViewDirections
                    //   apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
                    //   origin={origin}
                    //   destination={destination}
                    //   strokeWidth={10}
                    //   strokeColor="#fff000"
                    // ></MapViewDirections>
                }
            </MapView>
        </>
    );
}
