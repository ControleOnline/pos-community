import React, {useEffect, useRef} from 'react';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';

export default function TouchSoundProvider({children}) {
  const soundRef = useRef(null);

  useEffect(() => {
    Sound.setCategory('Playback');

    const sound = new Sound(require('../assets/tap.mp3'), error => {
      if (error) {
        console.log('Erro ao carregar som', error);
        return;
      }
      soundRef.current = sound;
    });

    return () => {
      soundRef.current?.release();
    };
  }, []);

  const tapGesture = Gesture.Tap().onEnd(() => {
    if (soundRef.current) {
      setTimeout(() => {
        soundRef.current.stop(() => {
          soundRef.current.play();
        });
      }, 0);
    }
  });

  return <GestureDetector gesture={tapGesture}>{children}</GestureDetector>;
}
