import {
  View,
  FlatList,
  ImageSourcePropType,
  useWindowDimensions,
  Image,
} from 'react-native';
import React from 'react';
import { Typography } from '@/components/ui/typography';

type NewsItem = {
  title: string;
  desc: string;
  img: ImageSourcePropType;
};

// Create an array of 5 news items
const newsItems: NewsItem[] = [
  {
    title: 'FeetF1rst Offizieller Launch',
    desc: 'Nach Jahren intensiver Entwicklung und wertvoller Kooperationen ist es endlich soweit: FeetF1rst geht an den Start – bereit, die Schuhwelt zu verändern.',
    img: require('@/assets/images/news_img.jpg'),
  },
  {
    title: 'FeetF1rst Offizieller Launch',
    desc: 'Nach Jahren intensiver Entwicklung und wertvoller Kooperationen ist es endlich soweit: FeetF1rst geht an den Start – bereit, die Schuhwelt zu verändern.',
    img: require('@/assets/images/news_img.jpg'),
  },
  {
    title: 'FeetF1rst Offizieller Launch',
    desc: 'Nach Jahren intensiver Entwicklung und wertvoller Kooperationen ist es endlich soweit: FeetF1rst geht an den Start – bereit, die Schuhwelt zu verändern.',
    img: require('@/assets/images/news_img.jpg'),
  },
  {
    title: 'FeetF1rst Offizieller Launch',
    desc: 'Nach Jahren intensiver Entwicklung und wertvoller Kooperationen ist es endlich soweit: FeetF1rst geht an den Start – bereit, die Schuhwelt zu verändern.',
    img: require('@/assets/images/news_img.jpg'),
  },
  {
    title: 'FeetF1rst Offizieller Launch',
    desc: 'Nach Jahren intensiver Entwicklung und wertvoller Kooperationen ist es endlich soweit: FeetF1rst geht an den Start – bereit, die Schuhwelt zu verändern.',
    img: require('@/assets/images/news_img.jpg'),
  },
];

const NewsFlatlist = () => {
  const { width } = useWindowDimensions();

  const renderItem = ({ item: value }) => {
    return (
      <View
        className="mr-4 border border-primary/20 rounded-2xl bg-background"
        style={{ width: width * 0.85 }}
      >
        <View className="flex-row p-3 gap-3 justify-between items-center">
          <Image
            source={value.img}
            style={{ width: 90, height: 90 }}
            className="border border-primary rounded-2xl"
          />
          <View className="flex-1">
            <Typography className="text-sm font-medium mb-1.5">
              {value.title}
            </Typography>
            <Typography className="text-[10px]">{value.desc}</Typography>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View className="w-[90%] mx-auto mb-3">
        <Typography className="text-2xl font-semibold text-[#C3C3C3]">
          FeetF1rst News
        </Typography>
      </View>
      <FlatList
        data={newsItems}
        renderItem={renderItem}
        style={{
          width: '100%',
          paddingHorizontal: (width * 0.1) / 2,
        }}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default NewsFlatlist;
