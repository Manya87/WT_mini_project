/**
 * ControlBar.tsx
 * Playback controls: Play, Pause, Step, Reset, Generate
 */

import React from 'react';

interface ControlBarProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onGenerateNew: () => void;
  currentFrameIndex: number;
  totalFrames: number;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onStep,
  onReset,
  onGenerateNew,
  currentFrameIndex,
  totalFrames,
}) => {
  return (
    <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
      {/* Primary Controls */}
      <div className="flex gap-2">
        <button
          onClick={onGenerateNew}
          className="algorithm-button px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200"
          title="Generate new random array"
        >
          🔄 Generate New Array
        </button>

        <div className="w-px bg-gray-700"></div>

        <button
          onClick={onReset}
          className="algorithm-button px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200"
          title="Reset to initial state"
        >
          ↺ Reset
        </button>

        <button
          onClick={() => {
            if (isPlaying) {
              onPause();
            } else {
              onPlay();
            }
          }}
          className={`algorithm-button px-4 py-2 transition-all ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
          title={isPlaying ? 'Pause animation' : 'Start animation'}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>

        <button
          onClick={onStep}
          className="algorithm-button px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200"
          title="Advance one frame"
          disabled={isPlaying}
        >
          → Step
        </button>
      </div>

      {/* Frame counter and progress */}
      <div className="flex-1 ml-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-800 rounded h-2 border border-gray-700 overflow-hidden">
            <div
              className="bg-indigo-500 h-full transition-all"
              style={{
                width: `${totalFrames > 0 ? (currentFrameIndex / (totalFrames - 1)) * 100 : 0}%`,
              }}
            />
          </div>
          <span className="text-sm text-gray-300 font-mono whitespace-nowrap">
            {currentFrameIndex + 1} / {totalFrames}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
