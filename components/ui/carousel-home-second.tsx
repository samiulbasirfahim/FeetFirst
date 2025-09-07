import * as React from 'react';
import { Image, View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Typography } from './typography';
import { useSharedValue } from 'react-native-reanimated';
import Arrow from '@/assets/svgs/arrow-exercise.svg';

import { SvgProps } from 'react-native-svg';

export type ShoeItemSecond = {
    itemName: string;
    brandLogo: React.FC<SvgProps>;
    price: string;
    image: string;
    brandName: string;
};

function HomeCarauselSecond({ shoes }) {
    const { width } = Dimensions.get('window');
    const progress = useSharedValue<number>(0);

    const renderItem = ({ item }: { item: ShoeItemSecond }) => (
        <View
            className="relative  border border-primary/20 rounded-2xl  bg-background py-10"
            style={{
                width: width * 0.75,
                marginHorizontal: 10,
                height: 310,
            }}
        >
            <View className="absolute z-50">
                <Image source={item.image} style={{ width: 340, height: 280 }} />
            </View>
            <View className="pl-8">
                <View className="flex-row gap-3 pb-2">
                    <Typography className="font-medium text-foreground text-[26px] leading-[26px]">
                        {item.brandName}
                    </Typography>
                    <Typography className="font-medium text-foreground text-[26px] leading-[26px]">
                        {item.itemName}
                    </Typography>
                </View>
                <Typography className="font-medium text-primary text-[26px]  mt-1">
                    {item.price}
                </Typography>
            </View>
            <View>
                <View className="absolute top-[103px] left-[16px]">
                    <item.brandLogo height={80} width={180} className="" />
                </View>
            </View>
            <View className="absolute bottom-0 right-0 p-3  border border-primary rounded-2xl">
                <Arrow />
            </View>
        </View>
    );

    return (
        <View
            id="carousel-component"
            dataSet={{ kind: 'basic-layouts', name: 'parallax' }}
            className="pl-1"
        >
            <Carousel
                onConfigurePanGesture={(panGesture) => panGesture.activeOffsetY([-999999, 999999]).activeOffsetX([-20, 20])}
                autoPlayInterval={2000}
                data={shoes}
                loop={true}
                pagingEnabled={true}
                snapEnabled={true}
                width={width}
                height={310}
                style={{
                    width: width,
                    borderColor: '#ffffff',
                }}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 78,
                }}
                onProgressChange={progress}
                renderItem={renderItem}
            />
        </View>
    );
}

export default HomeCarauselSecond;
