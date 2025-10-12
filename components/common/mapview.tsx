import { useState, useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Partner } from "@/type/partner";

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
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#1A1C1B" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ visibility: "on" }, { color: "#404241" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#0D0D0D" }],
    },
];

export function Map({ partners }: { partners: Partner[] }) {
    const mapRef = useRef<MapView | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function getCurrentLocation() {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setError("Permission to access location was denied");
                    setIsLoading(false);
                    return;
                }

                const loc = await Location.getCurrentPositionAsync({});
                setLocation(loc);
            } catch {
                setError("Failed to get current location");
            } finally {
                setIsLoading(false);
            }
        }

        getCurrentLocation();
    }, []);

    useEffect(() => {
        if (location && mapRef.current) {
            mapRef.current.animateCamera(
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

    // ✅ Safe defaults (use 0 when partners list is empty)
    const defaultLat = partners.length > 0 ? partners[0].lat : 0;
    const defaultLng = partners.length > 0 ? partners[0].lng : 0;

    const centerLat = location?.coords.latitude ?? defaultLat;
    const centerLng = location?.coords.longitude ?? defaultLng;

    if (isLoading) return null;
    if (error) return null;

    return (
        <MapView
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
            region={{
                latitude: centerLat,
                longitude: centerLng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            customMapStyle={mapStyle}
            provider={PROVIDER_GOOGLE}
            mapType="standard"
        >
            {location && (
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title="You are here"
                />
            )}

            {partners.map((partner) => (
                <Marker
                    key={partner.id}
                    coordinate={{
                        latitude: partner.lat,
                        longitude: partner.lng,
                    }}
                    title={partner.title}
                    description={partner.address}
                />
            ))}
        </MapView>
    );
}
