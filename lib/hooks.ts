import { useRef, useEffect, useCallback, useState } from "react";

// Custom Hooks
export const useAudioContext = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.AudioContext) {
      audioContextRef.current = new AudioContext();
    }
  }, []);

  const playSound = useCallback(
    (frequency = 800, duration = 0.1, volume = 0.1) => {
      if (!audioContextRef.current) return;

      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContextRef.current.currentTime + duration
      );

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration);
    },
    []
  );

  return { playSound };
};

export const useKeyboardInput = (onKeyPress?: (key: string) => void) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key === " " ? "Space" : e.key;
      setPressedKeys((prev) => new Set([...prev, key]));
      onKeyPress?.(key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key === " " ? "Space" : e.key;
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onKeyPress]);

  return pressedKeys;
};
