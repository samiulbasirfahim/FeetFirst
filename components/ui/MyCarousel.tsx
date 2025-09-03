import React, { useState } from 'react';
import { Dimensions, StyleSheet, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useLanguageStore } from '@/store/language';
import { Button } from '@/components/ui/button';

const { width } = Dimensions.get('window');

export default function ProductCarousel() {
  const { isGerman } = useLanguageStore();
  const [activeIndex, setActiveIndex] = useState(0);

  // Products with individual images
  const data = [
    {
      id: 1,
      title: 'Product 1',
      image: require('@/assets/images/product.png'),
    },
    {
      id: 2,
      title: 'Product 2',
      image: require('@/assets/images/product.png'),
    },
    {
      id: 3,
      title: 'Product 3',
      image: require('@/assets/images/product.png'),
    },
    {
      id: 4,
      title: 'Product 4',
      image: require('@/assets/images/product.png'),
    },
    {
      id: 5,
      title: 'Product 5',
      image: require('@/assets/images/product.png'),
    },
    {
      id: 6,
      title: 'Product 6',
      image: require('@/assets/images/product.png'),
    },
  ];

  // Group products into pairs for each carousel page
  const groupedData: (typeof data)[] = [];
  for (let i = 0; i < data.length; i += 2) {
    groupedData.push(data.slice(i, i + 2));
  }

  // Render individual product card
  const renderCard = (item: { id: number; title: string; image: any }) => (
    <View
      key={item.id}
      className="bg-muted-background/30 rounded-3xl flex-1 gap-12 overflow-hidden mx-1"
      style={styles.cardShadow}
    >
      <View>
        <Text className="text-white p-4">
          {isGerman()
            ? 'TOGU FLEXVIT Mini Fitnessband'
            : 'Mini fascia fitness TOGU FLEXVIT'}
        </Text>
        <Image source={item.image} resizeMode="cover" className="w-full h-20" />
      </View>

      <View className="flex-row justify-end">
        <Button
          textClassName="text-black"
          className="rounded-none rounded-tl-3xl rounded-br-xl"
        >
          Coming Soon
        </Button>
      </View>
    </View>
  );

  // Render one carousel page (2 cards side by side)
  const renderPage = ({
    item,
  }: {
    item: { id: number; title: string; image: any }[];
  }) => (
    <View className="flex-row px-2" style={{ width }}>
      {item.map((product) => renderCard(product))}
      {/* Fill empty space if odd number of items */}
      {item.length === 1 && <View className="flex-1 mx-1" />}
    </View>
  );

  return (
    <View>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={4000}
        width={width}
        height={240}
        data={groupedData}
        scrollAnimationDuration={800}
        pagingEnabled
        snapEnabled
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={renderPage}
      />

      {/* Custom Pagination Dots */}
      <View style={styles.paginationContainer}>
        {groupedData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationActiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4, // Android shadow
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  paginationActiveDot: {
    backgroundColor: '#62A07B',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
