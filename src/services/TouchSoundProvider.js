import React, {useEffect, useRef} from 'react';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {Audio} from 'expo-av';

export default function TouchSoundProvider({children}) {
  const soundRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const {sound} = await Audio.Sound.createAsync(
        require('../assets/tap.mp3'), // som de toque
        {volume: 1.0},
      );
      soundRef.current = sound;
    };
    load();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const tapGesture = Gesture.Tap().onEnd(() => {
    if (soundRef.current) {
      soundRef.current.replayAsync();
    }
  });

  return <GestureDetector gesture={tapGesture}>{children}</GestureDetector>;
}
