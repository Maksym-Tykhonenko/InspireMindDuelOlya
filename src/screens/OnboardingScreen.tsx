import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Animated,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const BG = require('../assets/onboarding_bg.png');
const PANEL = require('../assets/onboard_panel.png');

const IMG_1 = require('../assets/onboard_1.png');
const IMG_2 = require('../assets/onboard_2.png');
const IMG_3 = require('../assets/onboard_3.png');
const IMG_4 = require('../assets/onboard_4.png');

type Page = {
  key: string;
  title: string;
  body: string;
  image: any;
  cta: string;
};

export default function OnboardingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const pages: Page[] = useMemo(
    () => [
      {
        key: 'p1',
        title: 'MIND DUEL',
        body:
          'Answer quick A, B, or C questions and see which thinking style shows up today — analytical, bold, or balanced.',
        image: IMG_1,
        cta: 'CONTINUE',
      },
      {
        key: 'p2',
        title: 'BANDIT HUNT',
        body:
          'Make quick decisions during the chase and stay one step ahead of the bandit. Choose fast, think smart.',
        image: IMG_2,
        cta: 'NEXT',
      },
      {
        key: 'p3',
        title: 'DETECTIVE STORIES',
        body: 'Enjoy short atmospheric stories from the detective anytime you like.',
        image: IMG_3,
        cta: 'NEXT',
      },
      {
        key: 'p4',
        title: 'MIND RESULTS',
        body:
          'Track your outcomes and explore detailed descriptions of each thinking style whenever you want.',
        image: IMG_4,
        cta: 'START',
      },
    ],
    []
  );

  const listRef = useRef<FlatList<Page>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const isSmall = height < 740;
  const isVerySmall = height < 680;

  const titleSize = isVerySmall ? 28 : isSmall ? 30 : 32;
  const textSize = isVerySmall ? 14 : 15;

  const containerWidth = width * 0.92;
  const containerHeight = (isVerySmall ? 118 : 120) + 20;

  const buttonWidth = width * 0.75;
  const buttonHeight = isVerySmall ? 54 : 60;

  const imageHBase = height * (isVerySmall ? 0.44 : isSmall ? 0.46 : 0.48);
  const safeTextMaxWidth = Math.min(containerWidth - 40, 360); 

  const goNext = () => {
    if (index < pages.length - 1) {
      const next = index + 1;
      setIndex(next);
      listRef.current?.scrollToOffset({ offset: next * width, animated: true });
    } else {
      navigation.replace('Menu');
    }
  };

  return (
    <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Animated.FlatList
          ref={listRef}
          data={pages}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
          renderItem={({ item, index: pageIndex }) => {
            const isPage2 = pageIndex === 1;
            const isPage3 = pageIndex === 2;

            const imageHeight = isPage3 ? imageHBase * 0.88 : imageHBase;

            return (
              <View style={[styles.page, { width, paddingTop: isSmall ? 22 : 30 }]}>
                <Text style={[styles.title, { fontSize: titleSize }]}>{item.title}</Text>
                <View style={{ width: containerWidth, height: containerHeight }}>
                  <Image source={PANEL} style={styles.panel} resizeMode="stretch" />
                  <View style={styles.textWrap}>
                    <Text style={[styles.text, { fontSize: textSize, maxWidth: safeTextMaxWidth }]}>
                      {item.body}
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <Image
                    source={item.image}
                    resizeMode={isPage2 ? 'cover' : 'contain'}
                    style={[
                      { height: imageHeight },
                      isPage2
                        ? { width: width, alignSelf: 'stretch' } 
                        : { width: width * 0.92, alignSelf: 'center' },
                    ]}
                  />
                </View>

                <Pressable
                  onPress={goNext}
                  style={({ pressed }) => [
                    styles.button,
                    {
                      width: buttonWidth,
                      height: buttonHeight,
                      marginBottom: insets.bottom + 30, 
                      opacity: pressed ? 0.9 : 1,
                      transform: [{ scale: pressed ? 0.99 : 1 }],
                    },
                  ]}
                >
                  <Text style={[styles.buttonText, { fontSize: isVerySmall ? 18 : 20 }]}>
                    {item.cta}
                  </Text>
                </Pressable>
              </View>
            );
          }}
        />

        <View style={[styles.dots, { bottom: 10 }]}>
          {pages.map((_, i) => (
            <View key={i} style={[styles.dot, { opacity: index === i ? 1 : 0.4 }]} />
          ))}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  page: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    color: '#FFD200',
    fontWeight: '900',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.6,
  },

  panel: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  textWrap: {
    flex: 1,
    paddingHorizontal: 20, 
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    fontWeight: '800',
    lineHeight: 20,
    color: '#1A1A1A',
  },

  button: {
    backgroundColor: '#FFD200',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0.4,
  },

  dots: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    pointerEvents: 'none',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});