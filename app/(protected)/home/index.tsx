import HOME from '@/assets/svgs/home.svg';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { useLanguageStore } from '@/store/language';
import { DrawerActions } from '@react-navigation/native';
import { Link, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { Image, useWindowDimensions, View } from 'react-native';
import Herobg from '@/assets/svgs/hero_bg.svg';
import Herofeet from '@/assets/svgs/hero_feet.svg';
import Herodot from '@/assets/svgs/hero_dot.svg';
import { useHeaderHeight } from '@react-navigation/elements';
import HomeCarausel, { ShoeItem } from '@/components/ui/carousel-home';
import FootSole from '@/assets/svgs/foot_sole2.svg';
// import { SvgUri } from 'react-native-svg';
import SvgComponent from '@/components/svg/svg-component';
import shoeImage from '@/assets/images/shoe_vibram_a5.png';
import BrandLogoSvg from '@/assets/svgs/Vibram_logo.svg';

const shoes: ShoeItem[] = [
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: BrandLogoSvg,
    price: '$350.99',
    image: shoeImage,
  },
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: BrandLogoSvg,
    price: '$289.49',
    image: shoeImage,
  },
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: BrandLogoSvg,
    price: '$410.00',
    image: shoeImage,
  },
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: BrandLogoSvg,
    price: '$199.75',
    image: shoeImage,
  },
  {
    itemName: 'Item A5',
    brandName: 'VIBRAM',
    brandLogo: BrandLogoSvg,
    price: '$479.20',
    image: shoeImage,
  },
];

export default function Screen() {
  const { width } = useWindowDimensions();
  const height = useHeaderHeight();
  const navigation = useNavigation();
  const { isGerman } = useLanguageStore();
  return (
    <Layout className="bg-backgroundDark" scrollable noPadding>
      <View
        className="bg-background px-3 pt-7 pb-7 rounded-b-[30px] mb-7"
        style={{
          paddingTop: height + 20,
        }}
      >
        <View className="mb-3">
          <Typography
            variant="title"
            className="font-medium text-foreground text-[30px]"
          >
            {isGerman() ? 'Willkommen' : 'Benvenuto'}
          </Typography>
          <Typography
            variant="title"
            className="font-medium text-foreground text-[30px]"
          >
            Jhon!
          </Typography>
        </View>

        <View className="w-[68%]">
          <View className="flex flex-row gap-2 w-full mb-3">
            <Button
              variant="outline"
              textClassName="text-white font-normal text-sm"
              className="border-white/15 rounded-full bg-white/10 flex-1 justify-center "
            >
              {isGerman() ? 'Masseinlage' : 'Plantare'}
            </Button>
            <Button
              variant="outline"
              textClassName="text-white font-normal text-sm"
              className="border-white/15 rounded-full bg-white/10 flex-1 justify-center"
            >
              {isGerman() ? 'Fussübungen' : 'Esercizi piedi'}
            </Button>
          </View>
          <View className="">
            <Button
              variant="outline"
              textClassName=" text-base"
              className="border-primary rounded-[12px] bg-primary/20 py-3"
            >
              {isGerman() ? 'Dein perfekter Schuh' : 'Esercizi per i piedi'}
            </Button>
          </View>
        </View>
        <View
          className="absolute"
          style={{
            top: height - 10,
          }}
          pointerEvents="none"
        >
          <View className="absolute left-[211px] -top-[45px]">
            <Herobg height={300} width={300} />
          </View>
          <View className="absolute left-[115px] -top-[145px]">
            <Herofeet height={400} width={300} />
          </View>
          <View className="absolute left-[265px] top-[45px]">
            <Herodot height={135} />
          </View>
        </View>
      </View>
      <View className="px-5 flex-col gap-3 mb-8">
        <View>
          <Typography className="font-semibold text-[12px] ">
            {isGerman()
              ? 'Dein Scan. Deine Passform. Deine Individualisierung.'
              : 'La tua scansione. La tua vestibilità. La tua individualizzazione.'}
          </Typography>
        </View>
        <View>
          <Typography className="text-white font-light text-[12px] leading-[16px]">
            {isGerman()
              ? `Mit FeetF1rst findest du jetzt deine perfekt passenden Schuhe – basierend auf deinem Scan, fortgeschrittenster Beratung und einem Preisvergleich für das beste Angebot.`
              : `Con FootF1rst ora puoi trovare le scarpe che calzano perfettamente, in base alla tua scansione, ai consigli avanzati e al confronto dei prezzi per ottenere l'offerta migliore.`}
          </Typography>
        </View>
        <View>
          <Link href={'/'}>
            <Typography className="underline  text-white font-light text-[12px]">
              {isGerman()
                ? `Jetzt testen und selbst überzeugen.`
                : `
Provalo ora e verifica tu stesso.`}
            </Typography>
          </Link>
        </View>
      </View>
      <View>
        <View className="px-5 pb-7">
          <Typography className="text-[22px] font-medium text-foreground">
            {'Shoe Finder FeetF1rst'}
          </Typography>
        </View>
        <View>
          <HomeCarausel shoes={shoes} />
        </View>
        <View className="w-[60%] mt-5 ml-6">
          <Button
            variant="outline"
            textClassName=" text-base font-medium"
            className="border-primary rounded-[12px] bg-primary/20 py-[6px] font-medium"
          >
            {isGerman()
              ? 'Alle Kategorien entdecken'
              : 'Scopri tutte le categorie'}
          </Button>
        </View>
      </View>
      <View className="w-full" style={{ overflow: 'visible' }}>
        <FootSole width={366} height={192} />
        {/* <SvgUri
          source={require('@/assets/svgs/foot_sole2.svg')}
          width={300}
          height={400}
        /> */}
        <SvgComponent />
      </View>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est illo quos
        veniam culpa excepturi fuga libero, eos praesentium reprehenderit sint
        error temporibus pariatur laborum rerum saepe magnam officiis deserunt
        et similique, quae, distinctio vel! Laudantium eaque fugiat numquam,
        aliquid, amet quos dignissimos ducimus aspernatur quidem veniam
        voluptatem. Aliquam distinctio eaque nisi animi nulla recusandae
        consequuntur impedit, ipsa voluptas provident numquam officia assumenda
        consectetur fuga officiis dicta facilis fugit quia ratione cupiditate
        dolore quos rem. Neque ut rerum soluta. Quaerat autem dolorum
        accusantium cupiditate, ipsa nobis? Debitis modi, eos enim aliquam
        corporis ex. Sed quaerat exercitationem, perspiciatis cupiditate
        dignissimos maxime perferendis.
      </Typography>
    </Layout>
  );
}
