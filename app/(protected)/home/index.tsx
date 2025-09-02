import HOME from '@/assets/svgs/home.svg';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { useLanguageStore } from '@/store/language';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { View } from 'react-native';

export default function Screen() {
  const navigation = useNavigation();
  const { isGerman } = useLanguageStore();
  return (
    <>
      <Drawer.Screen
        options={{
          drawerLabel({ focused }) {
            return (
              <View className="flex-row gap-2 items-center">
                <HOME />
                <Typography className="text-2xl text-white font-semibold">
                  Home
                </Typography>
              </View>
            );
          },
        }}
      />

      <Layout edges={[]} className="bg-backgroundDark">
        <View>
          <Typography
            variant="title"
            className="font-medium text-white text-[28px]"
          >
            {isGerman() ? 'Willkommen' : 'Benvenuto'}
          </Typography>
          <Typography
            variant="title"
            className="font-medium text-white text-[28px]"
          >
            Jhon!
          </Typography>
        </View>

        <View>
          <View className="flex flex-row w-[60%]">
            <Button variant="outline" textClassName="text-[10px]">
              {isGerman() ? 'Masseinlage' : 'inserto di massa'}
            </Button>
            <Button variant="outline">
              {isGerman() ? 'Fussübungen' : 'Esercizi per i piedi'}
            </Button>
          </View>
          <View></View>
        </View>

        {/* <Typography variant="caption">
          {isGerman() ? 'BugiCHugi' : 'HMLKJFsldkjfsdkl'}
        </Typography>
        <Typography>HELLO</Typography>
        <Button onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Typography>Open drawer</Typography>
        </Button> */}
      </Layout>
    </>
  );
}
