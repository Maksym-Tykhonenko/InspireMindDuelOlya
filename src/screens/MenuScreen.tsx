import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;
const BG = require('../assets/menu_bg.png');
const LOGO = require('../assets/menu_logo.png');

const BTN_MIND_DUEL = require('../assets/btn_mind_duel.png');
const BTN_BANDIT_HUNT = require('../assets/btn_bandit_hunt.png');
const BTN_STORIES = require('../assets/btn_stories.png');
const BTN_MIND_RESULTS = require('../assets/btn_mind_results.png');

function ImageButton({
  source,
  label,
  onPress,
  width,
  height,
  safeLeft,
  safeRight,
  textShiftX = 0,
  fontSize,
}: {
  source: any;
  label: string;
  onPress: () => void;
  width: number;
  height: number;
  safeLeft: number;
  safeRight: number;
  textShiftX?: number;
  fontSize: number;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btnWrap,
        {
          width,
          height,
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
    >
      <Image source={source} style={styles.btnImg} resizeMode="stretch" />
      <View
        style={[
          styles.btnTextZone,
          {
            left: safeLeft,
            right: safeRight,
            transform: [{ translateX: textShiftX }],
          },
        ]}
      >

        <Text
          style={[styles.btnText, { fontSize }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export default function MenuScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const isSmall = height < 740;
  const isVerySmall = height < 680;

  const topPad = Math.max(insets.top, isSmall ? 10 : 18);
  const contentW = Math.min(width * 0.78, 380);
  const logoW = Math.min(width * 0.70, 320);
  const logoH = logoW * 0.38;
  const btnW = contentW;
  const btnH = isVerySmall ? 60 : isSmall ? 64 : 72;
  const gap = isVerySmall ? 12 : isSmall ? 14 : 16;
  const fontSize = isVerySmall ? 16 : isSmall ? 18 : 20;
  const scale = isVerySmall ? 0.82 : isSmall ? 0.90 : 1;

  return (
    <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={[styles.root, { paddingTop: topPad }]}>
          <Image source={LOGO} style={{ width: logoW, height: logoH }} resizeMode="contain" />
          <View style={[styles.list, { marginTop: isSmall ? 22 : 28, gap }]}>
            <ImageButton
              source={BTN_MIND_DUEL}
              label="Mind Duel"
              width={btnW}
              height={btnH}
              safeLeft={110 * scale}
              safeRight={52 * scale}
              fontSize={fontSize}
              onPress={() => navigation.navigate('MindDuel')}
            />

            <ImageButton
              source={BTN_BANDIT_HUNT}
              label="Bandit Hunt"
              width={btnW}
              height={btnH}
              safeLeft={98 * scale}
              safeRight={84 * scale}
              textShiftX={18}
              fontSize={fontSize}
              onPress={() => navigation.navigate('BanditHunt')}
            />

            <ImageButton
              source={BTN_STORIES}
              label="Stories"
              width={btnW}
              height={btnH}
              safeLeft={98 * scale}
              safeRight={52 * scale}
              fontSize={fontSize}
              onPress={() => navigation.navigate('Stories')}
            />

            <ImageButton
              source={BTN_MIND_RESULTS}
              label="Mind Results"
              width={btnW}
              height={btnH}
              safeLeft={112 * scale}
              safeRight={92 * scale}
              textShiftX={18}
              fontSize={fontSize}
              onPress={() => navigation.navigate('MindResults')}
            />
          </View>

          <View style={{ height: Math.max(insets.bottom, 16) }} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },
  root: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  list: {
    width: '100%',
    alignItems: 'center',
  },

  btnWrap: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  btnImg: {
    width: '100%',
    height: '100%',
  },
  btnTextZone: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#3C2B1E',
    fontWeight: '900',
  },
});