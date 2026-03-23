import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MindResults'>;

type ResultKey = 'DETECTIVE' | 'BANDIT' | 'BALANCED';

type ResultsStore = {
  DETECTIVE: number;
  BANDIT: number;
  BALANCED: number;
};

const STORAGE_KEY = 'mind_duel_results_v1';

const GOLD = '#FFD200';
const BG = require('../assets/results_bg.png'); 
const IMG_DETECTIVE = require('../assets/result_detective.png'); 
const IMG_BANDIT = require('../assets/result_bandit.png');      
const IMG_DUO = require('../assets/rg.png');            

const emptyStore: ResultsStore = { DETECTIVE: 0, BANDIT: 0, BALANCED: 0 };

async function readResults(): Promise<ResultsStore> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<ResultsStore>) : {};
    return {
      DETECTIVE: Number(parsed.DETECTIVE ?? 0),
      BANDIT: Number(parsed.BANDIT ?? 0),
      BALANCED: Number(parsed.BALANCED ?? 0),
    };
  } catch {
    return emptyStore;
  }
}

export default function MindResultsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const isSmall = height < 740;
  const isVerySmall = height < 680;

  const headerTop = Math.max(insets.top, 8);
  const bottomPad = Math.max(insets.bottom, 14);

  const [counts, setCounts] = useState<ResultsStore>(emptyStore);
  const [opened, setOpened] = useState<ResultKey | null>(null);

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      fullScreenGestureEnabled: false,
    } as any);
  }, [navigation]);

  useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
      const v = await readResults();
      setCounts(v);
    });
    return unsub;
  }, [navigation]);

  const contentW = Math.min(width * 0.90, 440);

  const headerH = isVerySmall ? 46 : 52;

  const cardH = isVerySmall ? 150 : isSmall ? 162 : 176;
  const imgSize = isVerySmall ? 70 : isSmall ? 76 : 82;

  const learnW = isVerySmall ? 126 : 140;
  const learnH = isVerySmall ? 36 : 40;

  const bigMinH = isVerySmall ? 360 : isSmall ? 420 : 480;

  const data = useMemo(() => {
    return [
      {
        key: 'DETECTIVE' as const,
        title: 'Analytical Mind',
        img: IMG_DETECTIVE,
        count: counts.DETECTIVE,
        body:
          'You approach decisions with clarity and structure. Before acting, you naturally pause to observe patterns, weigh options, and think several steps ahead. You value accuracy over speed and prefer well-reasoned choices to impulsive moves.\n\nPeople with an Analytical Mind often excel at problem-solving, planning, and spotting details others miss. Your strength is consistency — when situations get complex, you stay focused and methodical.\n\nAt times you may overthink, but your careful mindset helps you avoid unnecessary risks and build smart long-term outcomes.',
      },
      {
        key: 'BANDIT' as const,
        title: 'Risk Taker',
        img: IMG_BANDIT,
        count: counts.BANDIT,
        body:
          'You trust your instincts and aren’t afraid to move fast when opportunity appears. Where others hesitate, you act. You enjoy momentum, bold choices, and the thrill of the unknown.\n\nRisk Takers often shine in dynamic situations that reward courage and quick reactions. Your strength is decisiveness — you keep things moving and aren’t easily paralyzed by doubt.\n\nSometimes the path gets unpredictable, but your fearless mindset opens doors that cautious thinkers might never try.',
      },
      {
        key: 'BALANCED' as const,
        title: 'Balanced Thinker',
        img: IMG_DUO,
        count: counts.BALANCED,
        body:
          'You naturally combine logic with intuition. Instead of leaning fully toward caution or risk, you read the situation and adjust your approach. You know when to slow down and analyze — and when it’s time to act.\n\nBalanced Thinkers are adaptable, composed, and strategically flexible. Your strength is judgment: you can stay calm under pressure while still moving forward when it matters.\n\nBecause you see both sides, you’re well equipped to navigate complex decisions and shifting situations with confidence.',
      },
    ];
  }, [counts]);

  const Header = ({ title }: { title: string }) => (
    <View style={[styles.header, { paddingTop: headerTop, height: headerTop + headerH }]}>
      <Pressable
        onPress={() => {
          if (opened) setOpened(null);
          else navigation.goBack();
        }}
        style={({ pressed }) => [
          styles.backBtn,
          pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        ]}
      >
        <Text style={styles.backTxt}>{'‹'}</Text>
      </Pressable>

      <View style={styles.titlePill}>
        <Text style={styles.titlePillText}>{title}</Text>
      </View>

      <View style={{ width: 44 }} />
    </View>
  );

  return (
    <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Header title="Mind Results" />

        {!opened ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: bottomPad + 18 }}
          >
            <View style={{ alignItems: 'center', paddingTop: isSmall ? 14 : 18 }}>
              {data.map((item) => (
                <View
                  key={item.key}
                  style={[
                    styles.smallCard,
                    {
                      width: contentW,
                      height: cardH,
                      marginBottom: isSmall ? 14 : 16,
                      paddingHorizontal: isVerySmall ? 14 : 16,
                      paddingVertical: isVerySmall ? 12 : 14,
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Image
                      source={item.img}
                      style={{ width: imgSize, height: imgSize }}
                      resizeMode="contain"
                    />

                    <View style={{ flex: 1 }}>
                      <Text style={[styles.cardTitle, { fontSize: isVerySmall ? 16 : 18 }]}>
                        {item.title}
                      </Text>

                      <View style={styles.resultsPill}>
                        <Text style={styles.resultsText}>{`Results: ${item.count}`}</Text>
                      </View>

                      <Pressable
                        onPress={() => setOpened(item.key)}
                        style={({ pressed }) => [
                          styles.learnBtn,
                          {
                            width: learnW,
                            height: learnH,
                            marginTop: isVerySmall ? 10 : 12,
                            opacity: pressed ? 0.92 : 1,
                            transform: [{ scale: pressed ? 0.99 : 1 }],
                          },
                        ]}
                      >
                        <Text style={styles.learnTxt}>LEARN MORE</Text>
                        <Text style={styles.learnArrow}>{'›'}</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', paddingTop: isSmall ? 14 : 18 }}>
            {(() => {
              const item = data.find((d) => d.key === opened);
              if (!item) return null;

              return (
                <View
                  style={[
                    styles.bigCard,
                    {
                      width: contentW,
                      minHeight: bigMinH,
                      paddingVertical: isVerySmall ? 16 : 18,
                      paddingHorizontal: isVerySmall ? 14 : 16,
                      marginBottom: bottomPad + 10,
                    },
                  ]}
                >
                  <Text style={[styles.bigTitle, { fontSize: isVerySmall ? 18 : 20 }]}>
                    {item.title}
                  </Text>

                  <Text
                    style={[
                      styles.bigBody,
                      { fontSize: isVerySmall ? 12.5 : 13.5, lineHeight: isVerySmall ? 18 : 20 },
                    ]}
                  >
                    {item.body}
                  </Text>
                </View>
              );
            })()}
          </View>
        )}
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

  smallCard: {
    backgroundColor: '#0B2A4A',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,210,0,0.65)',
  },

  cardTitle: {
    color: GOLD,
    fontWeight: '900',
    marginBottom: 8,
  },

  resultsPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  resultsText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },

  learnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GOLD,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  learnTxt: {
    color: '#121212',
    fontWeight: '900',
    fontSize: 13,
    marginRight: 10,
  },
  learnArrow: {
    color: '#121212',
    fontWeight: '900',
    fontSize: 18,
    marginTop: -1,
  },

  bigCard: {
    backgroundColor: '#0B2A4A',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255,210,0,0.65)',
  },
  bigTitle: {
    color: GOLD,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  bigBody: {
    color: '#EAF2FF',
    fontWeight: '700',
    textAlign: 'center',
  },
});