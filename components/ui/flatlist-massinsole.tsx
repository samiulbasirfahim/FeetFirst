import { View, FlatList, useWindowDimensions } from 'react-native';
import React from 'react';
import { Typography } from '@/components/ui/typography';

type DataType = {
  title: string;
  desc: string;
};

// Create an array of 5 news items
const data: DataType[] = [
  {
    title: 'Scan verbinden',
    desc: 'Verbinde deinen bestehenden 3D-Scan in der App – die Grundlage, um deinen Bestellprozess zu starten.',
  },
  {
    title: 'Einlage bestellen & Vorteile spüren',
    desc: 'Bestelle deine Maß-Einlage, erhalte sie bequem nach Hause und profitiere von mehr Komfort, Leistung und Entlastung.',
  },
  {
    title: 'Bestellprozess starten',
    desc: 'Beantworte speziell mit Orthopäden entwickelte Fragen - für eine perfekte Abstimmung auf deine Ziele und Erwartungen',
  },
];

const MassFlatList = () => {
  const { width } = useWindowDimensions();

  const renderItem = ({ item: value, index }) => {
    return (
      <View
        className="mr-4 border border-primary/20 rounded-2xl bg-background"
        style={{ width: width * 0.8 }}
      >
        <View className="flex-col">
          <View className="flex-row items-center gap-4">
            <View className="border border-primary p-3 rounded-2xl">
              <Typography className="font-bold text-base">
                {' '}
                #{index + 1}{' '}
              </Typography>
            </View>
            <Typography className="text-base font-bold">
              {value.title}
            </Typography>
          </View>

          <View className=" px-4 pt-4 py-7">
            <Typography className="text-[12px]">{value.desc}</Typography>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={data}
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

export default MassFlatList;
