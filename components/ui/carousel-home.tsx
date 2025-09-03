import * as React from 'react';
import { Image, View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Typography } from './typography';
import { useSharedValue } from 'react-native-reanimated';
import BrandLogoSvg from '@/assets/svgs/Vibram_logo.svg';
import Arrow from '@/assets/svgs/arrow-exercise.svg';

type ShoeItem = {
  itemName: string;
  brandLogo: string;
  price: string;
  image: string;
  brandName: string;
};

const shoes: ShoeItem[] = [
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: 'Vibram_logo.png',
    price: '$350.99',
    image: 'shoe_vibram_a5.png',
  },
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: 'Vibram_logo.png',
    price: '$289.49',
    image: 'shoe_vibram_a5.png',
  },
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: 'Vibram_logo.png',
    price: '$410.00',
    image: 'shoe_vibram_a5.png',
  },
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: 'Vibram_logo.png',
    price: '$199.75',
    image: 'shoe_vibram_a5.png',
  },
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: 'Vibram_logo.png',
    price: '$479.20',
    image: 'shoe_vibram_a5.png',
  },
];

function HomeCarausel() {
  const { width } = Dimensions.get('window');
  const progress = useSharedValue<number>(0);

  const renderItem = ({ item }: { item: ShoeItem }) => (
    <View
      className="relative  border rounded-2xl  bg-background"
      style={{
        width: width * 0.72,
        marginHorizontal: 10,
        height: 230,
      }}
    >
      <View className="absolute z-50">
        <Image
          source={require(`@/assets/images/shoe_vibram_a5.png`)}
          style={{ width: 240, height: 240 }}
        />
      </View>
      <View className="absolute right-5 top-2">
        <Typography className="font-medium text-foreground text-2xl leading-[24px]">
          {item.brandName}
        </Typography>
        <Typography className="font-medium text-foreground text-2xl leading-[24px]">
          {item.itemName}
        </Typography>
        <Typography className="font-medium text-primary text-2xl mt-1">
          {item.price}
        </Typography>
      </View>
      <View>
        <View className="absolute top-[160px] left-1">
          {/* <Image source={require(`@/assets/images/Vibram_logo.png`)} /> */}
          <BrandLogoSvg height={50} width={100} className="" />
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
      className="ml-3"
    >
      <Carousel
        autoPlayInterval={2000}
        data={shoes}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={width}
        style={{
          width: width,
          borderColor: '#ffffff',
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 80,
        }}
        onProgressChange={progress}
        renderItem={renderItem}
      />
    </View>
  );
}

export default HomeCarausel;
