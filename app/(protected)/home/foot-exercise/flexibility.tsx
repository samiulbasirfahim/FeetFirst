import { Layout } from '@/components/layout/layout';
import { Typography } from '@/components/ui/typography';
import { useLanguageStore } from '@/store/language';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import woman from '@/assets/images/woman-upside-down.png';
import { Button } from '@/components/ui/button';
import MyCarousel from '@/components/ui/MyCarousel';
import { VersionInfo } from '@/components/common/version';
import ManAboutTORun from '@/assets/images/man-about-to-run.png';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Component, useEffect, useState } from 'react';
import { useDrawerHeader } from '@/components/common/drawer-header';
import LineBg from '@/assets/svgs/flexible_bg.svg';
import Leg from '@/assets/svgs/flexible_leg1.svg';
import { BlurView } from 'expo-blur';
import * as AccordionPrimitive from '@rn-primitives/accordion';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Animated, {
  Layout as ReanimatedLayout,
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';
import ArrowAnimatedDesign from '@/components/ui/animated-arrow';

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
  },
];

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
  {
    title: 'Waden- und Achillessehnen-Dehnung',
    content:
      'Aktiviere gezielt Zehen und Fußgelenke – für mehr Beweglichkeit, Kontrolle und ein stabiles Gangbild.',
    place: 'first',
  },
  {
    title: 'Dynamische Beweglichkeitsübungen',
    content:
      'Aktiviere gezielt Zehen und Fußgelenke – für mehr Beweglichkeit, Kontrolle und ein stabiles Gangbild.',
    place: 'second',
  },
  {
    title: 'Fußsohle & Fußgewölbe dehnen',
    content:
      'Aktiviere gezielt Zehen und Fußgelenke – für mehr Beweglichkeit, Kontrolle und ein stabiles Gangbild.',
    place: 'third',
  },
  {
    title: 'Zehen- und Fußgelenk-Mobilisation',
    content:
      'Aktiviere gezielt Zehen und Fußgelenke – für mehr Beweglichkeit, Kontrolle und ein stabiles Gangbild.',
    place: 'fourth',
  },
];

export default function Screen() {
  const [activeSections, setActiveSections] = React.useState<number[]>([]);

  const [touch, setTouch] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  const handleTouch = (position) => {
    setTouch((prev) => {
      const reset = {
        first: false,
        second: false,
        third: false,
        fourth: false,
      };

      return { ...reset, [position]: !prev[position] };
    });
  };

  useEffect(() => {
    const active: number[] = [];
    if (touch.first) active.push(0);
    if (touch.second) active.push(1);
    if (touch.third) active.push(2);
    if (touch.fourth) active.push(3);
    setActiveSections(active);
  }, [touch]);

  const { height: heightOfWindow } = useWindowDimensions();
  const { isGerman } = useLanguageStore();
  const [womanDiv, setWomanDiv] = useState(0);

  const { onScroll, HeaderComponent, height } = useDrawerHeader({
    threeshold: 100,
  });
  return (
    <Layout
      scrollable
      className="bg-[#000000]"
      onScroll={onScroll}
      stickyIndex={[0]}
      noPadding
      avoidTabbar
    >
      {HeaderComponent}
      <View className="relative  overflow-hidden">
        <Typography className="absolute z-[99] text-3xl font-bold text-white text-center my-4 leading-tight px-3">
          {isGerman()
            ? 'Übungen zur Flexibilitätserhöhung'
            : 'Esercizi per aumentare la flessibilità'}
        </Typography>
        <View
          className="w-full"
          style={{
            height: heightOfWindow * 0.5,
          }}
          onLayout={(e) => {
            setWomanDiv(e.nativeEvent.layout.width);
          }}
        >
          <LinearGradient
            colors={['rgba(13,13,13,0.5)', 'rgba(13,13,13,1)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="absolute inset-0 z-[10]"
          />

          <LinearGradient
            colors={['transparent', 'rgba(98, 160, 123, 0.3)']}
            className="absolute inset-0 z-[10]"
          />

          <View className="h-full flex-1 overflow-hidden relative bg-primary items-center justify-end">
            <Image
              source={woman}
              style={{
                height: womanDiv * 1.5,
                width: '100%',
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View className="mt-12 px-3">
        <Typography className="font-bold text-3xl ">
          {isGerman()
            ? 'FeetFirst - Ihr Partner für Fußgesundheit, bietet jetzt die perfekten Fußübungen.'
            : 'FeetFirst, il tuo partner per la salute dei piedi, ora ti offre gli esercizi perfetti per i piedi.'}
        </Typography>
        <Text className="text-white mt-4">
          {isGerman()
            ? 'Wählen Sie einfach aus, was Sie erreichen. möchten, sehen Sie sich die Anleitung an und legen Sie los!'
            : "Scegli semplicemente cosa vuoi ottenere. vuoi, dai un'occhiata alle istruzioni e inizia!"}
        </Text>
      </View>

      <View className="mt-8">
        <Typography className="text-3xl font-bold mb-4 px-3">
          {isGerman() ? 'Produkte' : 'Prodotti'}
        </Typography>

        <MyCarousel />
      </View>
      {/* Accordian */}
      <View className="isolate overflow-hidden">
        <LinearGradient
          colors={['rgba(0,0,0,1)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: -20,
            top: 0,
            height: 250,
          }}
          className="z-10"
        />
        <View className="-right-[90px] top-[20px] ">
          <LineBg />
        </View>
        <View className="absolute  left-10">
          <Leg />
        </View>

        <View>
          <TouchableOpacity
            onPressOut={() => {
              handleTouch('first');
            }}
            className="z-10"
          >
            {touch.first === false ? (
              <BlurView
                intensity={400}
                experimentalBlurMethod="dimezisBlurView"
              >
                <View className=" absolute bottom-[123px] left-[180px] border border-white/20 py-1 px-3 rounded-full z-10 bg-[#040705]/20">
                  <Typography className="font-bold text-base">1</Typography>
                </View>
              </BlurView>
            ) : (
              <View className=" absolute bottom-[123px] left-[180px] border border-white py-1 px-3 rounded-full z-10 bg-[#ffffff]">
                <Typography className="font-bold text-base text-primary">
                  1
                </Typography>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              handleTouch('second');
            }}
            className="z-10"
          >
            {touch.second === false ? (
              <BlurView
                intensity={400}
                experimentalBlurMethod="dimezisBlurView"
              >
                <View className=" absolute bottom-[58px] left-[160px] border border-white/20 py-1 px-3 rounded-full z-10 bg-[#040705]/20">
                  <Typography className="font-bold text-base">2</Typography>
                </View>
              </BlurView>
            ) : (
              <View className=" absolute bottom-[58px] left-[160px] border border-white py-1 px-3 rounded-full z-10 bg-[#ffffff]">
                <Typography className="font-bold text-base text-primary">
                  2
                </Typography>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              handleTouch('third');
            }}
            className="z-10"
          >
            {touch.third === false ? (
              <BlurView
                intensity={400}
                experimentalBlurMethod="dimezisBlurView"
              >
                <View className=" absolute bottom-[5px] left-[245px] border border-white/20 py-1 px-3 rounded-full z-10 bg-[#040705]/20">
                  <Typography className="font-bold text-base">3</Typography>
                </View>
              </BlurView>
            ) : (
              <View className=" absolute bottom-[5px] left-[245px] border border-white py-1 px-3 rounded-full z-10 bg-[#ffffff]">
                <Typography className="font-bold text-base text-primary">
                  3
                </Typography>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              handleTouch('fourth');
            }}
            className="z-10   "
          >
            {touch.fourth === false ? (
              <BlurView
                intensity={400}
                experimentalBlurMethod="dimezisBlurView"
              >
                <View className=" absolute -bottom-[13px] left-[67px] border border-white/20 py-1 px-3 rounded-full z-10 bg-[#040705]/20">
                  <Typography className="font-bold text-base">4</Typography>
                </View>
              </BlurView>
            ) : (
              <View className=" absolute -bottom-[13px] left-[67px] border border-white py-1 px-3 rounded-full z-10 bg-[#ffffff]">
                <Typography className="font-bold text-base text-primary">
                  4
                </Typography>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-10 w-[90%] mx-auto isolate overflow-hidden">
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableWithoutFeedback}
          renderHeader={(section, index, isActive) => (
            <View>
              <View
                className={`mt-3 bg-background flex-row items-center justify-between p-4  ${isActive ? 'rounded-t-3xl' : 'rounded-3xl'} transition-all `}
              >
                <View className="flex-row items-center gap-4">
                  <View className="px-2 py-[2px] rounded-lg border border-primary bg-primary/15">
                    <Typography> {index + 1} </Typography>
                  </View>
                  <Typography
                    className={`text-sm text-boldText ${isActive ? 'font-bold' : 'font-normal'} transition-all`}
                  >
                    {section.title}
                  </Typography>
                </View>
                <ArrowAnimatedDesign isActive={isActive} />
              </View>
              {isActive && (
                <View className="h-[0.7px] bg-white/30 w-[90%] mx-auto" />
              )}
            </View>
          )}
          renderContent={(section, _, isActive) => (
            <Animated.View
              layout={ReanimatedLayout.duration(400)}
              entering={FadeInDown.duration(220)}
              exiting={FadeOutUp.duration(200)}
              className={`p-5 bg-background overflow-hidden flex-col gap-3 ${isActive ? 'rounded-b-3xl' : 'rounded-3xl'}`}
            >
              <Typography className="text-white text-sm font-normal ">
                {section.content}
              </Typography>
              <Typography className="text-sm font-medium text-primary">
                Zehenwellen: Fördert Zehenbeweglichkeit
              </Typography>
              <Typography className="text-sm font-medium text-primary">
                Kreisende Fußbewegungen: Mobilisiert Sprunggelenk
              </Typography>
              <Typography className="text-sm font-medium text-primary">
                Zehenstrecken & -spreizen: Dehnt und aktiviert Zehenmuskeln
              </Typography>
              <Typography className="text-sm font-medium text-primary">
                Übung vier lorem ipsum dolor sit
              </Typography>
            </Animated.View>
          )}
          duration={400}
          onChange={(sections) => {
            setActiveSections(sections);

            // 🔑 sync accordion state back into `touch`
            setTouch({
              first: sections.includes(0),
              second: sections.includes(1),
              third: sections.includes(2),
              fourth: sections.includes(3),
            });
          }}
          renderAsFlatList={false}
        />
      </View>
      <View className="pt-8 px-3">
        <Typography className="text-3xl font-bold w-1/2">
          {isGerman()
            ? 'Ihr Individueller Übungsplan'
            : 'Il tuo piano di esercizi individuale'}
        </Typography>
        <Text className="text-white my-6">
          {isGerman()
            ? 'Sie können sich jetzt auch Ihren individuellen Übungsplan erstellen lassen – basierend auf Ihrem 3D-Scan, Ihren Fußproblemen und Ihren Zielen.'
            : 'Ora puoi anche creare il tuo piano di esercizi personalizzato in base alla scansione 3D, ai problemi del tuo piede e ai tuoi obiettivi.'}
        </Text>

        <View className="flex-row mb-6">
          <Button variant="outline" className="bg-primary/10 py-4 rounded-2xl">
            {isGerman() ? 'Jetzt erstellen!' : 'Crea ora!'}
          </Button>
        </View>

        <View className="h-96 w-full my-8 px-3">
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'black']}
            className="absolute inset-0 z-[99] mt-36"
          />
          <Image
            source={ManAboutTORun}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </View>
      <VersionInfo />
    </Layout>
  );
}
