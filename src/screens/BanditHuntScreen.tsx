import React, { useMemo, useRef, useState } from 'react';
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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

import { BANDIT_HUNT_LEVELS, type OptionKey, type BanditQuestion } from '../data/banditHuntQuestions';

type Props = NativeStackScreenProps<RootStackParamList, 'BanditHunt'>;

type Phase = 'intro' | 'quiz' | 'result';

const GOLD = '#FFD200';

const BG_INTRO = require('../assets/mind_duel_intro_bg.png');
const BG_GAME = require('../assets/mind_duel_game_bg.png');
const BG_RESULT = require('../assets/onboarding_bg.png');

const PANEL = require('../assets/onboard_panel.png');

const INTRO_ART = require('../assets/bandit_intro_art.png');
const INTRO_BTN = require('../assets/bandit_intro_start_btn.png');
const QUIZ_TOP = require('../assets/bandit_quiz_top.png');

const RESULT_BADGE = require('../assets/bandit_result_badge.png');
const RESULT_DETECTIVE = require('../assets/bandit_result_detective.png');

const ICON_HOME = require('../assets/icon_home.png');
const ICON_SHARE = require('../assets/icon_share.png');

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BanditHuntScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isSmall = height < 740;
  const isVerySmall = height < 680;

  const headerTop = Math.max(insets.top, 8);
  const bottomPad = Math.max(insets.bottom, 14);

  const [phase, setPhase] = useState<Phase>('intro');

  const [levelIdx, setLevelIdx] = useState(0);
  const levelPack = BANDIT_HUNT_LEVELS[levelIdx] ?? BANDIT_HUNT_LEVELS[0];
  const levelNumber = levelPack.level;
  const questions = levelPack.questions; 

  const [qIndex, setQIndex] = useState(0);

  const [picked, setPicked] = useState<OptionKey | null>(null);
  const [revealed, setRevealed] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);

  const fade = useRef(new Animated.Value(1)).current;

  const resetRound = () => {
    setQIndex(0);
    setPicked(null);
    setRevealed(false);
    setCorrectCount(0);
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

  const animateSwap = (next: () => void) => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 170, useNativeDriver: true }),
    ]).start(() => next());
  };

  const q: BanditQuestion | undefined = questions[qIndex];

  const shuffledOptions = useMemo(() => {
    if (!q) return [];
    const items = (Object.keys(q.options) as OptionKey[]).map((k) => ({
      key: k,
      text: q.options[k],
    }));
    return shuffle(items);
  }, [levelIdx, qIndex]);

  const onPick = (k: OptionKey) => {
    if (revealed) return;
    setPicked(k);
  };

  const onMainButton = () => {
    if (!q) return;

    if (!revealed) {
      if (!picked) return;
      setRevealed(true);
      if (picked === q.correct) setCorrectCount((v) => v + 1);
      return;
    }

    const last = qIndex >= questions.length - 1;
    if (last) {
      setPhase('result');
      return;
    }

    animateSwap(() => {
      setQIndex((v) => v + 1);
      setPicked(null);
      setRevealed(false);
    });
  };

  const isCaught = correctCount >= 4;

  const resultTitle = isCaught ? 'BANDIT CAUGHT' : 'BANDIT ESCAPED';
  const resultText = isCaught
    ? 'Nice work, detective.'
    : 'Too slow — the bandit slipped away.\nTry again and stay sharp.';
  const resultArt = isCaught ? RESULT_BADGE : RESULT_DETECTIVE;

  const shareResult = async () => {
    try {
      await Share.share({
        message: `${resultTitle}\nLevel ${levelNumber}\nScore: ${correctCount}/${questions.length}`,
      });
    } catch {}
  };

  const goHomeOnlyByButton = () => {
    navigation.replace('Menu');
  };

  const nextLevelOrRetry = () => {
    if (isCaught) {
      const next = levelIdx + 1;
      const safe = next >= BANDIT_HUNT_LEVELS.length ? 0 : next;
      setLevelIdx(safe);
      resetRound();
      setPhase('quiz');
    } else {
      resetRound();
      setPhase('quiz');
    }
  };

  const headerH = isVerySmall ? 46 : 52;

  const contentW = useMemo(() => {
    const base = Math.min(width * 0.88, 420);
    if (isVerySmall) return Math.min(width * 0.92, base);
    return base;
  }, [width, isVerySmall]);

  const introArtH = height * (isVerySmall ? 0.44 : isSmall ? 0.50 : 0.56);
  const introBtnW = Math.min(width * (isVerySmall ? 0.86 : 0.82), 420);
  const introBtnH = isVerySmall ? 68 : 84;

  const quizTopH = height * (isVerySmall ? 0.12 : isSmall ? 0.15 : 0.18);

  const questionCardH = isVerySmall ? 56 : 64;
  const optionH = isVerySmall ? 34 : 40;
  const optionFont = isVerySmall ? 11 : 12;

  const mainBtnH = isVerySmall ? 36 : 42;
  const mainBtnW = contentW * (isVerySmall ? 0.78 : 0.72);

  const panelW = contentW;
  const panelH = (isVerySmall ? 98 : 112) + 6;

  const iconBtn = isVerySmall ? 42 : 48;

  const resultTitleFont = isVerySmall ? 24 : isSmall ? 28 : 30;
  const panelFont = isVerySmall ? 12.5 : 14;

  const resultArtH = height * (isVerySmall ? 0.30 : isSmall ? 0.36 : 0.40);

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
          <Header title="Bandit Hunt" />

          <View style={styles.introBody}>
            <Image
              source={INTRO_ART}
              style={{ width, height: introArtH, alignSelf: 'stretch' }}
              resizeMode="cover"
            />

            <Pressable
              onPress={startQuiz}
              style={({ pressed }) => [
                styles.introBtnWrap,
                {
                  marginBottom: bottomPad + (isVerySmall ? 42 : 56), 
                  opacity: pressed ? 0.92 : 1,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                },
              ]}
            >
              <Image
                source={INTRO_BTN}
                style={{ width: introBtnW, height: introBtnH }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (phase === 'quiz') {
    if (!q) return null;

    const buttonLabel = !picked
      ? 'Choose the answer'
      : !revealed
        ? 'Check'
        : qIndex === questions.length - 1
          ? 'Finish'
          : 'Next question';

    return (
      <ImageBackground source={BG_GAME} style={styles.bg} resizeMode="cover">
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <Header title="Bandit Hunt" />

          <View style={styles.quizRoot}>
            <Text style={[styles.levelLabel, { marginTop: isSmall ? 6 : 10 }]}>{`Level ${levelNumber}`}</Text>

            <Image
              source={QUIZ_TOP}
              style={{
                width: Math.min(contentW * 0.72, 320),
                height: quizTopH,
                marginTop: isSmall ? 10 : 14,
              }}
              resizeMode="contain"
            />

            <Animated.View style={{ opacity: fade }}>
              <View style={[styles.questionCard, { width: contentW, height: questionCardH }]}>
                <Text style={styles.questionText} numberOfLines={2}>
                  {q.text}
                </Text>
              </View>

              <View style={{ marginTop: isSmall ? 12 : 18, gap: isVerySmall ? 8 : 10 }}>
                {shuffledOptions.map((opt) => {
                  const isPicked = picked === opt.key;
                  const isCorrect = opt.key === q.correct;

                  const showYellowPick = isPicked && !revealed;
                  const showGreen = revealed && isCorrect;
                  const showRed = revealed && isPicked && !isCorrect;

                  return (
                    <Pressable
                      key={opt.key}
                      onPress={() => onPick(opt.key)}
                      style={({ pressed }) => [
                        styles.option,
                        { width: contentW, height: optionH },
                        showYellowPick && styles.pickYellow,
                        showGreen && styles.pickGreen,
                        showRed && styles.pickRed,
                        pressed && !revealed && { opacity: 0.9 },
                      ]}
                    >
                      <Text style={[styles.optionText, { fontSize: optionFont }]} numberOfLines={1}>
                        {`${opt.key}. ${opt.text}`}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Animated.View>

            <Pressable
              onPress={onMainButton}
              disabled={!picked}
              style={({ pressed }) => [
                styles.greenBtn,
                {
                  width: mainBtnW,
                  height: mainBtnH,
                  marginTop: isSmall ? 16 : 22,
                  opacity: !picked ? 0.45 : pressed ? 0.92 : 1,
                  transform: [{ scale: pressed && picked ? 0.99 : 1 }],
                },
              ]}
            >
              <Text style={styles.greenBtnText}>{buttonLabel}</Text>
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
        <Header title="Bandit Hunt" />

        <View style={styles.resultRoot}>
          <Text style={[styles.levelLabel, { marginTop: isSmall ? 6 : 10 }]}>{`Level ${levelNumber}`}</Text>

          <Text style={[styles.resultTitle, { fontSize: resultTitleFont }]}>
            {resultTitle}
          </Text>

          <View style={{ width: panelW, height: panelH, marginTop: isVerySmall ? 10 : 12 }}>
            <Image source={PANEL} style={styles.panel} resizeMode="stretch" />
            <View style={styles.panelTextWrap}>
              <Text style={[styles.panelText, { fontSize: panelFont }]}>{resultText}</Text>
            </View>
          </View>

          <View style={[styles.resultButtonsRow, { marginTop: isVerySmall ? 10 : 12 }]}>
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
              onPress={nextLevelOrRetry}
              style={({ pressed }) => [
                styles.midBtn,
                pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              ]}
            >
              <Text style={styles.midBtnTxt}>{isCaught ? 'NEXT LEVEL' : 'TRY AGAIN'}</Text>
            </Pressable>

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
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: bottomPad + (isVerySmall ? 2 : 4) }}>
            <Image
              source={resultArt}
              style={{
                width: Math.min(width * 0.88, 460),
                height: resultArtH,
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

  pickYellow: { borderColor: GOLD },
  pickGreen: { borderColor: '#34C759' },
  pickRed: { borderColor: '#FF3B30' },

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

  midBtn: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255,210,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  midBtnTxt: { color: '#FFFFFF', fontWeight: '900', fontSize: 12, letterSpacing: 0.4 },
});