import { Image, ImageSourcePropType } from "react-native";

type AutoImageProps = {
    source: ImageSourcePropType;
    height: number;
};

export function AutoImage({ source, height }: AutoImageProps) {
    const { width, height: originalHeight } = Image.resolveAssetSource(source);

    const ratio = width / originalHeight;

    return (
        <Image
            source={source}
            resizeMode="contain"
            style={{
                height,
                width: ratio * height,
            }}
        />
    );
}
