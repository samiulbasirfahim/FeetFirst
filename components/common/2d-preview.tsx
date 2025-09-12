import LineBg from '@/assets/svgs/flexible_bg.svg';
import Leg from '@/assets/svgs/flexible_leg1.svg';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../ui/typography';
import { useState, useEffect } from 'react';

export default function TwoDPreview() {
  const [activeSections, setActiveSections] = useState<number[]>([]);

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

  return (
    <View className="isolate">
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(0,0,0,1)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: -20,
          top: 0,
          height: 250,
          zIndex: 99,
        }}
        className="z-10"
      />
      <View className="-right-[90px] top-[20px]">
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
            <BlurView intensity={400} experimentalBlurMethod="dimezisBlurView">
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
            <BlurView intensity={400} experimentalBlurMethod="dimezisBlurView">
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
            <BlurView intensity={400} experimentalBlurMethod="dimezisBlurView">
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
          className="z-10"
        >
          {touch.fourth === false ? (
            <BlurView intensity={400} experimentalBlurMethod="dimezisBlurView">
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
  );
}
