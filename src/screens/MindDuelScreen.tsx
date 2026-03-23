import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  useWindowDimensions,
  Share,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

import { MIND_DUEL_LEVELS } from '../data/mindDuelQuestions';
import type { Choice } from '../data/mindDuelQuestions';

type Props = NativeStackScreenProps<RootStackParamList, 'MindDuel'>;

type Phase = 'intro' | 'quiz' | 'result';
type ResultKey = 'DETECTIVE' | 'BANDIT' | 'BALANCED';

const STORAGE_KEY = 'mind_duel_results_v1';

const BG_INTRO = require('../assets/mind_duel_intro_bg.png');
const BG_GAME = require('../assets/mind_duel_game_bg.png');
const BG_RESULT = require('../assets/onboarding_bg.png');

const INTRO_ART = require('../assets/mind_duel_intro_art.png');
const INTRO_BTN = require('../assets/mind_duel_start_btn.png');

const TOP_ART = require('../assets/onboard_1.png');
const PANEL = require('../assets/onboard_panel.png');

const IMG_DETECTIVE = require('../assets/result_detective.png');
const IMG_BANDIT = require('../assets/result_bandit.png');
const IMG_DUO = require('../assets/result_duo.png');

const ICON_HOME = require('../assets/icon_home.png');
const ICON_SHARE = require('../assets/icon_share.png');

const GOLD = '#FFD200';
const GREEN = '#22C55E';
const RED = '#EF4444';

type ResultsStore = {
  DETECTIVE: number;
  BANDIT: number;
  BALANCED: number;
};

const emptyStore: ResultsStore = { DETECTIVE: 0, BANDIT: 0, BALANCED: 0 };

async function bumpResult(key: ResultKey) {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed: ResultsStore = raw ? JSON.parse(raw) : emptyStore;
    const safe: ResultsStore = {
      DETECTIVE: Number(parsed?.DETECTIVE ?? 0),
      BANDIT: Number(parsed?.BANDIT ?? 0),
      BALANCED: Number(parsed?.BALANCED ?? 0),
    };
    safe[key] = (safe[key] ?? 0) + 1;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  } catch {}
}

export default function MindDuelScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      fullScreenGestureEnabled: false,
    } as any);
  }, [navigation]);

  const isSmall = height < 740;
  const isVerySmall = height < 680;

  const [phase, setPhase] = useState<Phase>('intro');

  const [levelIdx, setLevelIdx] = useState(0);
  const levelPack = MIND_DUEL_LEVELS[levelIdx] ?? MIND_DUEL_LEVELS[0];
  const levelNumber = levelPack.level;
  const questions = levelPack.questions;

  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<Choice | null>(null);

  const [revealed, setRevealed] = useState(false);

  const [correctMap, setCorrectMap] = useState<Choice[]>([]);
  const correct: Choice | undefined = correctMap[qIndex];

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [scoreC, setScoreC] = useState(0);

  const fade = useRef(new Animated.Value(1)).current;
  const recordedRef = useRef(false);

  const headerTop = Math.max(insets.top, 8);
  const bottomPad = Math.max(insets.bottom, 14);
  const contentW = Math.min(width * 0.88, 420);

  const animateSwap = (next: () => void) => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 170, useNativeDriver: true }),
    ]).start(() => next());
  };

  const generateCorrectMap = () => {
    const arr: Choice[] = questions.map(() => {
      const r = Math.floor(Math.random() * 3);
      return r === 0 ? 'A' : r === 1 ? 'B' : 'C';
    });
    setCorrectMap(arr);
  };

  const resetRound = () => {
    recordedRef.current = false;
    setQIndex(0);
    setPicked(null);
    setRevealed(false);
    setScoreA(0);
    setScoreB(0);
    setScoreC(0);
    generateCorrectMap();
  };

  const goBackArrow = () => {
    if (phase === 'intro') {
      navigation.goBack();
      return;
    }
    if (phase === 'quiz') {
      setPicked(null);
      setRevealed(false);
      setPhase('intro');
      return;
    }
    if (phase === 'result') {
      resetRound();
      setPhase('quiz');
      return;
    }
  };

  const startQuiz = () => {
    resetRound();
    setPhase('quiz');
  };

  const onPick = (c: Choice) => {
    if (picked) return;
    setPicked(c);
  };

  const nextQuestion = () => {
    if (!picked) return;

    if (!revealed) {
      setRevealed(true);

      if (picked === 'A') setScoreA((v) => v + 1);
      if (picked === 'B') setScoreB((v) => v + 1);
      if (picked === 'C') setScoreC((v) => v + 1);

      return;
    }

    const last = qIndex >= questions.length - 1;

    if (last) {
      setPicked(null);
      setRevealed(false);
      setPhase('result');
      return;
    }

    animateSwap(() => {
      setQIndex((v) => v + 1);
      setPicked(null);
      setRevealed(false);
    });
  };

  const getOptionStyle = (c: Choice) => {
    if (!revealed) {
      if (picked === c) return styles.optionPicked;
      return null;
    }

    if (correct && c === correct) return styles.optionCorrect;
    if (picked === c && correct && picked !== correct) return styles.optionWrong;

    return null;
  };

  const resultKey: ResultKey = useMemo(() => {
    const max = Math.max(scoreA, scoreB, scoreC);
    const winners: ResultKey[] = [];
    if (scoreA === max) winners.push('DETECTIVE');
    if (scoreB === max) winners.push('BANDIT');
    if (scoreC === max) winners.push('BALANCED');
    return winners.includes('BALANCED') ? 'BALANCED' : winners[0] ?? 'BALANCED';
  }, [scoreA, scoreB, scoreC]);

  useEffect(() => {
    if (phase !== 'result') return;
    if (recordedRef.current) return;
    recordedRef.current = true;
    bumpResult(resultKey);
  }, [phase, resultKey]);

  const resultTitle = useMemo(() => {
    if (resultKey === 'DETECTIVE') return 'DETECTIVE VIBE';
    if (resultKey === 'BANDIT') return 'BANDIT VIBE';
    return 'BALANCED VIBE';
  }, [resultKey]);

  const resultBody = useMemo(() => {
    if (resultKey === 'DETECTIVE')
      return 'You tend to think things through and spot the details. Today your play style leans calm, sharp, and calculated.';
    if (resultKey === 'BANDIT')
      return "You move fast, trust your instincts, and aren’t afraid to take bold chances. Today your play style is all about momentum.";
    return 'You mix sharp thinking with bold moves. Flexible, unpredictable, and ready for anything.';
  }, [resultKey]);

  const resultImage = useMemo(() => {
    if (resultKey === 'DETECTIVE') return IMG_DETECTIVE;
    if (resultKey === 'BANDIT') return IMG_BANDIT;
    return IMG_DUO;
  }, [resultKey]);

  const shareResult = async () => {
    try {
      await Share.share({ message: `${resultTitle}\n(Level ${levelNumber})` });
    } catch {}
  };

  const nextRound = () => {
    const next = levelIdx + 1;
    const safe = next >= MIND_DUEL_LEVELS.length ? 0 : next;
    setLevelIdx(safe);
    resetRound();
    setPhase('quiz');
  };

  const goHomeOnlyByButton = () => {
    navigation.replace('Menu');
  };

  const headerH = isVerySmall ? 46 : 52;

  const introArtH = height * (isVerySmall ? 0.46 : isSmall ? 0.50 : 0.55);

  const introBtnW = Math.min(width * 0.78, 380);
  const introBtnH = isVerySmall ? 70 : 80;

  const quizTopArtH = height * (isVerySmall ? 0.14 : isSmall ? 0.16 : 0.18);

  const cardW = contentW;
  const cardH = isVerySmall ? 54 : 60;

  const optionW = contentW;
  const optionH = isVerySmall ? 36 : 40;
  const optionFont = isVerySmall ? 11 : 12;

  const greenBtnW = contentW * 0.72;
  const greenBtnH = isVerySmall ? 36 : 40;

  const panelW = contentW;
  const panelH = (isVerySmall ? 112 : 118) + 10;

  const charH = height * (isVerySmall ? 0.26 : isSmall ? 0.29 : 0.32);

  const iconBtn = isVerySmall ? 44 : 48;

  const Header = ({ title }: { title: string }) => (
    <View style={[styles.header, { paddingTop: headerTop, height: headerTop + headerH }]}>
      <Pressable
        onPress={goBackArrow}
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

  if (phase === 'intro') {
    return (
      <ImageBackground source={BG_INTRO} style={styles.bg} resizeMode="cover">
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <Header title="Mind Duel" />

          <View style={styles.introBody}>
            <Image
              source={INTRO_ART}
              style={{ width: width, height: introArtH, alignSelf: 'stretch' }}
              resizeMode="cover"
            />

            <Pressable
              onPress={startQuiz}
              style={({ pressed }) => [
                styles.introBtnWrap,
                {
                  marginBottom: bottomPad + 56,
                  opacity: pressed ? 0.92 : 1,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                },
              ]}
            >
              <Image source={INTRO_BTN} style={{ width: introBtnW, height: introBtnH }} resizeMode="contain" />
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (phase === 'quiz') {
    const q = questions[qIndex];

    return (
      <ImageBackground source={BG_GAME} style={styles.bg} resizeMode="cover">
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <Header title="Mind Duel" />

          <View style={styles.quizRoot}>
            <Text style={[styles.levelLabel, { marginTop: isSmall ? 6 : 10 }]}>{`Level ${levelNumber}`}</Text>

            <Image
              source={TOP_ART}
              style={{
                width: Math.min(contentW * 0.72, 320),
                height: quizTopArtH,
                marginTop: isSmall ? 10 : 14,
              }}
              resizeMode="contain"
            />

            <Animated.View style={{ opacity: fade }}>
              <View style={[styles.questionCard, { width: cardW, height: cardH }]}>
                <Text style={styles.questionText} numberOfLines={2}>
                  {q.text}
                </Text>
              </View>

              <View style={{ marginTop: isSmall ? 14 : 18, gap: 10 }}>
                <Pressable
                  onPress={() => onPick('A')}
                  style={({ pressed }) => [
                    styles.option,
                    { width: optionW, height: optionH },
                    getOptionStyle('A'),
                    pressed && !picked && { opacity: 0.9 },
                  ]}
                >
                  <Text style={[styles.optionText, { fontSize: optionFont }]} numberOfLines={1}>
                    {'A. ' + q.a}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => onPick('B')}
                  style={({ pressed }) => [
                    styles.option,
                    { width: optionW, height: optionH },
                    getOptionStyle('B'),
                    pressed && !picked && { opacity: 0.9 },
                  ]}
                >
                  <Text style={[styles.optionText, { fontSize: optionFont }]} numberOfLines={1}>
                    {'B. ' + q.b}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => onPick('C')}
                  style={({ pressed }) => [
                    styles.option,
                    { width: optionW, height: optionH },
                    getOptionStyle('C'),
                    pressed && !picked && { opacity: 0.9 },
                  ]}
                >
                  <Text style={[styles.optionText, { fontSize: optionFont }]} numberOfLines={1}>
                    {'C. ' + q.c}
                  </Text>
                </Pressable>
              </View>
            </Animated.View>

            <Pressable
              onPress={nextQuestion}
              disabled={!picked}
              style={({ pressed }) => [
                styles.greenBtn,
                {
                  width: greenBtnW,
                  height: greenBtnH,
                  marginTop: isSmall ? 18 : 22,
                  opacity: !picked ? 0.45 : pressed ? 0.92 : 1,
                  transform: [{ scale: pressed && picked ? 0.99 : 1 }],
                },
              ]}
            >
              <Text style={styles.greenBtnText}>
                {!picked ? 'Choose the answer' : !revealed ? 'Check' : qIndex === questions.length - 1 ? 'Finish' : 'Next question'}
              </Text>
            </Pressable>

            <View style={{ height: bottomPad }} />
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={BG_RESULT} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Header title="Mind Duel" />

        <View style={styles.resultRoot}>
          <Text style={[styles.levelLabel, { marginTop: isSmall ? 6 : 10 }]}>{`Level ${levelNumber}`}</Text>

          <Text style={[styles.resultTitle, { fontSize: isVerySmall ? 26 : isSmall ? 28 : 30 }]}>
            {resultTitle}
          </Text>

          <View style={{ width: panelW, height: panelH, marginTop: 12 }}>
            <Image source={PANEL} style={styles.panel} resizeMode="stretch" />
            <View style={styles.panelTextWrap}>
              <Text style={[styles.panelText, { fontSize: isVerySmall ? 13 : 14 }]}>{resultBody}</Text>
            </View>
          </View>

          <View style={[styles.resultButtonsRow, { marginTop: 12 }]}>
            <Pressable
              onPress={goHomeOnlyByButton}
              style={({ pressed }) => [
                styles.iconBtn,
                { width: iconBtn, height: iconBtn },
                pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              ]}
            >
              <Image source={ICON_HOME} style={styles.iconImg} resizeMode="contain" />
            </Pressable>

            <Pressable
              onPress={shareResult}
              style={({ pressed }) => [
                styles.iconBtn,
                { width: iconBtn, height: iconBtn },
                pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              ]}
            >
              <Image source={ICON_SHARE} style={styles.iconImg} resizeMode="contain" />
            </Pressable>

            <Pressable
              onPress={nextRound}
              style={({ pressed }) => [
                styles.nextRoundBtn,
                pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              ]}
            >
              <Text style={styles.nextRoundTxt}>NEXT ROUND</Text>
            </Pressable>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: bottomPad + 4 }}>
            <Image
              source={resultImage}
              style={{
                width: Math.min(width * 0.88, 460),
                height: charH,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
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
  backTxt: {
    color: GOLD,
    fontWeight: '900',
    fontSize: 22,
    marginTop: -2,
  },

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

  introBody: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  introBtnWrap: { marginTop: 10 },

  quizRoot: { flex: 1, alignItems: 'center' },
  levelLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.4,
  },

  questionCard: {
    backgroundColor: '#FFF4D8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginTop: 14,
  },
  questionText: {
    color: '#1B1B1B',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },

  option: {
    borderRadius: 18,
    backgroundColor: '#5A2BD6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionText: { color: '#FFFFFF', fontWeight: '800', textAlign: 'center' },

  optionPicked: { borderColor: GOLD },
  optionCorrect: { borderColor: GREEN },
  optionWrong: { borderColor: RED },

  greenBtn: {
    borderRadius: 18,
    backgroundColor: '#0C7E5A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenBtnText: { color: '#FFFFFF', fontWeight: '900', fontSize: 12, letterSpacing: 0.2 },

  resultRoot: { flex: 1, alignItems: 'center', paddingHorizontal: 16, paddingTop: 8 },
  resultTitle: {
    color: GOLD,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.6,
    marginTop: 10,
  },

  panel: { position: 'absolute', width: '100%', height: '100%' },
  panelTextWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelText: {
    textAlign: 'center',
    fontWeight: '800',
    lineHeight: 18,
    color: '#1A1A1A',
    maxWidth: 360,
  },

  resultButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconBtn: {
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255,210,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImg: { width: '62%', height: '62%' },

  nextRoundBtn: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255,210,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextRoundTxt: { color: '#FFFFFF', fontWeight: '900', fontSize: 12, letterSpacing: 0.4 },
});