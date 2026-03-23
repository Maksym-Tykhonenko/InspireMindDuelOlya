import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, Animated, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const BG = require('../assets/loader_bg.png');
const LOGO = require('../assets/app_logo.png');

export default function LoadingScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();

  const [phase, setPhase] = useState<'web' | 'logo'>('web');

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;

  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSmall = height < 740;
  const isVerySmall = height < 680;

  const overlaySize = Math.min(width, height) * (isVerySmall ? 0.46 : isSmall ? 0.44 : 0.42);
  const logoSize = Math.min(width, height) * (isVerySmall ? 0.30 : isSmall ? 0.29 : 0.28);

  const loaderHtml = useMemo(() => {
    const frame = Math.max(220, Math.min(overlaySize * 0.92, 320));
    const svg = Math.max(240, Math.min(overlaySize * 1.05, 360));

    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        background: transparent;
        overflow: hidden;
        -webkit-user-select: none;
        user-select: none;
      }
      .wrap {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
      }
      .svg-frame {
        position: relative;
        width: ${frame}px;
        height: ${frame}px;
        transform-style: preserve-3d;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .svg-frame svg {
        position: absolute;
        transition: .5s;
        z-index: calc(1 - (0.2 * var(--j)));
        transform-origin: center;
        width: ${svg}px;
        height: ${svg}px;
        fill: none;
      }
      .svg-frame svg #center {
        transition: .5s;
        transform-origin: center;
      }
      #out2 {
        animation: rotate16 7s ease-in-out infinite alternate;
        transform-origin: center;
      }
      #out3 {
        animation: rotate16 3s ease-in-out infinite alternate;
        transform-origin: center;
        stroke: #00ffff;
      }
      #inner3,
      #inner1 {
        animation: rotate16 4s ease-in-out infinite alternate;
        transform-origin: center;
      }
      #center1 {
        fill: #00ffff;
        animation: rotate16 2s ease-in-out infinite alternate;
        transform-origin: center;
      }
      @keyframes rotate16 {
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="svg-frame">
        <svg style="--i:0;--j:0" viewBox="0 0 200 200">
          <g id="out2" stroke="rgba(0,255,255,0.95)" stroke-width="6">
            <circle cx="100" cy="100" r="72" stroke-linecap="round" stroke-dasharray="90 18" />
          </g>
          <g id="inner1" stroke="rgba(0,200,255,0.85)" stroke-width="5">
            <circle cx="100" cy="100" r="48" stroke-linecap="round" stroke-dasharray="52 14" />
          </g>
          <g id="inner3" stroke="rgba(90,255,230,0.9)" stroke-width="4">
            <circle cx="100" cy="100" r="30" stroke-linecap="round" stroke-dasharray="30 10" />
          </g>
          <g id="out3" stroke-width="3">
            <circle cx="100" cy="100" r="86" stroke-linecap="round" stroke-dasharray="10 12" />
          </g>
          <g id="center">
            <circle id="center1" cx="100" cy="100" r="6" />
          </g>
        </svg>
      </div>
    </div>
  </body>
</html>`;
  }, [overlaySize]);

  

  return (
    <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
      <View style={styles.dim} />

      {phase === 'web' ? (
        <View style={styles.fullCenter}>
          <View style={[styles.webContainer, { width: overlaySize, height: overlaySize }]}>
            <WebView
              originWhitelist={['*']}
              source={{ html: loaderHtml }}
              style={styles.web}
              javaScriptEnabled
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              overScrollMode="never"
              bounces={false}
              automaticallyAdjustContentInsets={false}
              opaque={false}
              backgroundColor="transparent"
            />
          </View>
        </View>
      ) : (
        <View style={styles.fullCenter}>
          <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
            <Image
              source={LOGO}
              style={{ width: logoSize, height: logoSize, borderRadius: Math.round(logoSize * 0.22) }}
              resizeMode="cover"
            />
          </Animated.View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.10)',
  },
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webContainer: {
    backgroundColor: 'transparent',
    borderRadius: 22,
    overflow: 'hidden',
  },
  web: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});