/**
 * useAlgorithmRunner.ts
 * Core animation engine hook that steps through algorithm frames
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { AlgorithmFrame } from '../types/AlgorithmFrame';

interface UseAlgorithmRunnerProps {
  frames: AlgorithmFrame[];
  speed: number; // 1-10
  autoPlay?: boolean;
}

interface UseAlgorithmRunnerReturn {
  currentFrame: AlgorithmFrame | null;
  currentFrameIndex: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  step: () => void;
  reset: () => void;
  jump: (frameIndex: number) => void;
  totalFrames: number;
}

/**
 * Speed to frame duration mapping (1-10 scale)
 * Speed 1 = 500ms per frame
 * Speed 10 = 50ms per frame
 */
function speedToFrameDuration(speed: number): number {
  return Math.max(50, 500 - (speed - 1) * 50);
}

export function useAlgorithmRunner({
  frames,
  speed,
  autoPlay = false,
}: UseAlgorithmRunnerProps): UseAlgorithmRunnerReturn {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const frameTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFrameTimeRef = useRef<number>(Date.now());

  const currentFrame = frames[currentFrameIndex] || null;
  const totalFrames = frames.length;

  const frameDuration = speedToFrameDuration(speed);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (frameTimerRef.current) {
      clearTimeout(frameTimerRef.current);
      frameTimerRef.current = null;
    }
  }, []);

  const step = useCallback(() => {
    pause();
    setCurrentFrameIndex((prev) => {
      if (prev < totalFrames - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [pause, totalFrames]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const reset = useCallback(() => {
    pause();
    setCurrentFrameIndex(0);
  }, [pause]);

  const jump = useCallback((frameIndex: number) => {
    pause();
    const validIndex = Math.max(0, Math.min(frameIndex, totalFrames - 1));
    setCurrentFrameIndex(validIndex);
  }, [pause, totalFrames]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastFrameTimeRef.current;

      if (elapsed >= frameDuration) {
        setCurrentFrameIndex((prev) => {
          if (prev >= totalFrames - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
        lastFrameTimeRef.current = now;
      }

      if (isPlaying) {
        frameTimerRef.current = setTimeout(animate, 16); // ~60fps
      }
    };

    frameTimerRef.current = setTimeout(animate, 16);

    return () => {
      if (frameTimerRef.current) {
        clearTimeout(frameTimerRef.current);
      }
    };
  }, [isPlaying, frameDuration, totalFrames]);

  return {
    currentFrame,
    currentFrameIndex,
    isPlaying,
    play,
    pause,
    step,
    reset,
    jump,
    totalFrames,
  };
}
