import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Share,
  Animated,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Stories'>;

const GOLD = '#FFD200';
const BG = require('../assets/stories_bg.png'); 
const PANEL = require('../assets/story_panel.png'); 
const ICON_SHARE = require('../assets/icon_share.png');

type Story = {
  id: string;
  title: string;
  body: string;
};

const STORIES: Story[] = [
  {
    id: 's1',
    title: 'The Hat Trick',
    body: `I once caught a bandit who thought changing hats would fool me.
It didn’t.
But I did compliment his style.`,
  },
  {
    id: 's2',
    title: 'Midnight Footsteps',
    body: `Quiet streets talk the loudest.
That night, one pair of footsteps didn’t match the rhythm.
Case closed before sunrise.`,
  },
  {
    id: 's3',
    title: 'The Almost Escape',
    body: `He was fast. I’ll give him that.
But overconfidence makes noise —
and I never miss noise.`,
  },
  {
    id: 's4',
    title: 'Coffee and Clues',
    body: `Best cases start with bad coffee.
This one started with three sugars and a very nervous suspect.`,
  },
  {
    id: 's5',
    title: 'The Bench Incident',
    body: `Bandits love benches.
They think sitting still makes them invisible.
It doesn’t.`,
  },
  {
    id: 's6',
    title: 'Red Beret Problem',
    body: `Rule #27:
If someone wears a bright red beret…
they’re not trying that hard to hide.`,
  },
  {
    id: 's7',
    title: 'One Step Too Late',
    body: `I was one second behind him.
Lucky for me —
he was two steps too loud.`,
  },
  {
    id: 's8',
    title: 'The Window Reflection',
    body: `Mirrors don’t lie.
Store windows either.
That’s how I spotted him… smiling at his own reflection.`,
  },
  {
    id: 's9',
    title: 'Rainy Night Case',
    body: `Rain washes away footprints.
But panic leaves its own trail.
This one was easy.`,
  },
  {
    id: 's10',
    title: 'The Usual Suspect',
    body: `Funny thing about bandits —
they always think this time will be different.
It never is.`,
  },
];

export default function StoriesScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const isSmall = height < 740;
  const isVerySmall = height < 680;

  const headerTop = Math.max(insets.top, 8);
  const bottomPad = Math.max(insets.bottom, 14);

  const [idx, setIdx] = useState(0);

  const fade = useRef(new Animated.Value(1)).current;

  const story = STORIES[idx] ?? STORIES[0];

  const contentW = useMemo(() => {
    const base = Math.min(width * 0.88, 420);
    if (isVerySmall) return Math.min(width * 0.92, base);
    return base;
  }, [width, isVerySmall]);

  const headerH = isVerySmall ? 46 : 52;

  const panelW = contentW;
  const panelH = isVerySmall ? 152 : isSmall ? 170 : 182;

  const titleFont = isVerySmall ? 16 : isSmall ? 17 : 18;
  const bodyFont = isVerySmall ? 12.5 : isSmall ? 13.5 : 14;

  const btnH = isVerySmall ? 40 : 44;
  const btnW = isVerySmall ? 90 : 102;

  const shareBtnW = isVerySmall ? 44 : 46;

  const animateSwap = (next: () => void) => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 170, useNativeDriver: true }),
    ]).start(() => next());
  };

  const onPrev = () => {
    if (idx <= 0) return;
    animateSwap(() => setIdx((v) => Math.max(0, v - 1)));
  };

  const onNext = () => {
    if (idx >= STORIES.length - 1) return;
    animateSwap(() => setIdx((v) => Math.min(STORIES.length - 1, v + 1)));
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `${story.title}\n\n${story.body}`,
      });
    } catch {}
  };

  const Header = () => (
    <View style={[styles.header, { paddingTop: headerTop, height: headerTop + headerH }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          styles.backBtn,
          pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        ]}
      >
        <Text style={styles.backTxt}>{'‹'}</Text>
      </Pressable>

      <View style={styles.titlePill}>
        <Text style={styles.titlePillText}>Stories</Text>
      </View>

      <View style={{ width: 44 }} />
    </View>
  );

  return (
    <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Header />

        <View style={styles.root}>
          <Animated.View style={{ opacity: fade, width: '100%', alignItems: 'center' }}>
            <View style={{ width: panelW, height: panelH }}>
              <Image source={PANEL} style={styles.panel} resizeMode="stretch" />
              <View style={styles.panelInner}>
                <Text style={[styles.storyTitle, { fontSize: titleFont }]} numberOfLines={1}>
                  {story.title}
                </Text>

                <Text
                  style={[styles.storyBody, { fontSize: bodyFont, lineHeight: bodyFont * 1.28 }]}
                  numberOfLines={isVerySmall ? 5 : 6}
                >
                  {story.body}
                </Text>
              </View>
            </View>
          </Animated.View>


          <View style={[styles.bottomRow, { paddingBottom: bottomPad + (isVerySmall ? 6 : 10) }]}>
            {idx > 0 ? (
              <Pressable
                onPress={onPrev}
                style={({ pressed }) => [
                  styles.yellowBtn,
                  { width: btnW, height: btnH },
                  pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
                ]}
              >
                <Text style={styles.yellowBtnText}>PREV</Text>
              </Pressable>
            ) : (
              <View style={{ width: btnW }} />
            )}

            <Pressable
              onPress={onShare}
              style={({ pressed }) => [
                styles.shareBtn,
                { width: shareBtnW, height: btnH },
                pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              ]}
            >
              <Image source={ICON_SHARE} style={styles.shareIcon} resizeMode="contain" />
            </Pressable>

            <Pressable
              onPress={onNext}
              style={({ pressed }) => [
                styles.yellowBtn,
                { width: btnW, height: btnH },
                pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              ]}
            >
              <Text style={styles.yellowBtnText}>NEXT</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  header: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  backBtn: {
    width: 44,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: GOLD,
  },
  backTxt: { color: GOLD, fontWeight: '900', fontSize: 22, marginTop: -2 },

  titlePill: {
    paddingHorizontal: 18,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: GOLD,
  },
  titlePillText: { color: GOLD, fontWeight: '900', fontSize: 14 },

  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },

  panel: { position: 'absolute', width: '100%', height: '100%' },
  panelInner: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  storyTitle: {
    color: '#111111',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  storyBody: {
    color: '#111111',
    fontWeight: Platform.select({ ios: '800', android: '700' }) as any,
    textAlign: 'center',
  },

  bottomRow: {
    width: '100%',
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  yellowBtn: {
    borderRadius: 8,
    backgroundColor: '#FFD200',
    borderWidth: 2,
    borderColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowBtnText: {
    color: '#111111',
    fontWeight: '900',
    fontSize: 14,
  },

  shareBtn: {
    borderRadius: 8,
    backgroundColor: '#FFD200',
    borderWidth: 2,
    borderColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: { width: '58%', height: '58%' },
});