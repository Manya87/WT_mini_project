/**
 * AlgorithmVisualizer.tsx
 * Main component that wires all visualizers, controls, and logic together
 */

import React, { useEffect } from 'react';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';
import { useAppContext } from '../context/AppContext';
import {
  generateRandomArray,
  getAlgorithmMetadata,
  getAllAlgorithms,
} from '../utils/algorithms';
import SortingVisualizer from './visualizers/SortingVisualizer';
import SearchingVisualizer from './visualizers/SearchingVisualizer';
import ControlBar from './controls/ControlBar';
import SpeedSlider from './controls/SpeedSlider';
import ArraySizeSlider from './controls/ArraySizeSlider';
import AlgorithmSelector, { AlgorithmOption } from './controls/AlgorithmSelector';
import CustomArrayInput from './controls/CustomArrayInput';
import SearchTargetInput from './controls/SearchTargetInput';
import SortOrderSelector from './controls/SortOrderSelector';
import CodePanel from './panels/CodePanel';

export const AlgorithmVisualizer: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const algorithmMeta = getAlgorithmMetadata(state.selectedAlgorithm);

  const {
    currentFrame,
    currentFrameIndex,
    isPlaying,
    play,
    pause,
    step,
    reset,
    totalFrames,
  } = useAlgorithmRunner({
    frames: state.frames,
    speed: state.speed,
    autoPlay: false,
  });

  // Generate frames when algorithm or input changes
  useEffect(() => {
    if (!algorithmMeta) return;

    let arrayToSort = [...state.inputArray];
    let frames = algorithmMeta.fn(
      arrayToSort,
      algorithmMeta.category === 'searching' ? state.targetValue : undefined
    );

    // If descending order and sorting algorithm, reverse the final array in frames
    if (algorithmMeta.category === 'sorting' && state.sortOrder === 'descending') {
      frames = frames.map((frame) => ({
        ...frame,
        array: [...frame.array].reverse(),
        highlight: {
          ...frame.highlight,
          sorted: frame.highlight.sorted.map((idx) => state.inputArray.length - 1 - idx),
          comparing: frame.highlight.comparing.map((idx) => state.inputArray.length - 1 - idx),
          swapping: frame.highlight.swapping.map((idx) => state.inputArray.length - 1 - idx),
        },
      }));
    }

    dispatch({ type: 'SET_FRAMES', payload: frames });
    dispatch({ type: 'SET_CURRENT_FRAME', payload: 0 });
  }, [state.selectedAlgorithm, state.inputArray, algorithmMeta, dispatch, state.targetValue, state.sortOrder]);

  // Sync playing state
  useEffect(() => {
    if (isPlaying) {
      dispatch({ type: 'SET_PLAYING', payload: true });
    }
  }, [isPlaying, dispatch]);

  // Update current frame in context
  useEffect(() => {
    if (currentFrame) {
      dispatch({
        type: 'SET_CURRENT_FRAME',
        payload: currentFrameIndex,
      });
    }
  }, [currentFrameIndex, currentFrame, dispatch]);

  const handleGenerateNewArray = () => {
    const newArray = generateRandomArray(state.arraySize);
    dispatch({ type: 'SET_INPUT_ARRAY', payload: newArray });
    reset();
  };

  const handleArraySizeChange = (size: number) => {
    dispatch({ type: 'SET_ARRAY_SIZE', payload: size });
    const newArray = generateRandomArray(size);
    dispatch({ type: 'SET_INPUT_ARRAY', payload: newArray });
    reset();
  };

  const algorithmOptions: AlgorithmOption[] = getAllAlgorithms().map((algo) => ({
    id: algo.id,
    name: algo.name,
    category: algo.category,
  }));

  const renderVisualizer = () => {
    if (!algorithmMeta || !currentFrame) {
      return (
        <div className="flex items-center justify-center h-96 bg-gray-950 rounded-lg border border-gray-700 text-gray-400">
          Loading visualizer...
        </div>
      );
    }

    switch (algorithmMeta.category) {
      case 'sorting':
        return (
          <SortingVisualizer
            frame={currentFrame}
            width={1000}
            height={400}
            showLabels={state.arraySize <= 30}
          />
        );
      case 'searching':
        return <SearchingVisualizer frame={currentFrame} width={1000} />;
      default:
        return (
          <div className="flex items-center justify-center h-96 bg-gray-950 rounded-lg border border-gray-700 text-gray-400">
            Visualizer not yet implemented
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-gray-950 text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-850 border-b border-gray-700 p-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Algorithm Visualizer
        </h1>
        <p className="text-gray-400 mt-2">
          Interactive step-by-step visualization of classic algorithms
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex gap-6 p-6">
        {/* Left sidebar - Algorithm selector */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto">
          <AlgorithmSelector
            algorithms={algorithmOptions}
            selectedAlgorithmId={state.selectedAlgorithm}
            onSelect={(id) => {
              dispatch({ type: 'SELECT_ALGORITHM', payload: id });
              reset();
            }}
          />

          {/* Controls */}
          <div className="flex flex-col gap-3">
            <ArraySizeSlider
              size={state.arraySize}
              onSizeChange={handleArraySizeChange}
            />
            <SpeedSlider
              speed={state.speed}
              onSpeedChange={(speed) =>
                dispatch({ type: 'SET_SPEED', payload: speed })
              }
            />
            <CustomArrayInput
              currentSize={state.arraySize}
              onArraySubmit={(array) => {
                dispatch({ type: 'SET_INPUT_ARRAY', payload: array });
                dispatch({ type: 'SET_ARRAY_SIZE', payload: array.length });
                reset();
              }}
            />

            {/* Show sort order selector only for sorting algorithms */}
            {algorithmMeta?.category === 'sorting' && (
              <SortOrderSelector
                order={state.sortOrder}
                onOrderChange={(order) => {
                  dispatch({ type: 'SET_SORT_ORDER', payload: order });
                  reset();
                }}
              />
            )}

            {/* Show search target input only for searching algorithms */}
            {algorithmMeta?.category === 'searching' && (
              <SearchTargetInput
                defaultTarget={state.targetValue}
                onTargetChange={(target) => {
                  dispatch({ type: 'SET_TARGET_VALUE', payload: target });
                  reset();
                }}
              />
            )}
          </div>

          {/* Code Panel */}
          {algorithmMeta && (
            <CodePanel
              algorithmName={algorithmMeta.name}
              pseudocode={algorithmMeta.pseudocode}
              currentLine={currentFrame?.codeLine || 0}
              complexity={algorithmMeta.complexity}
            />
          )}
        </div>

        {/* Center/Right - Visualizer */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
          {/* Visualizer */}
          <div className="flex-1">{renderVisualizer()}</div>

          {/* Control Bar */}
          <ControlBar
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            onStep={step}
            onReset={reset}
            onGenerateNew={handleGenerateNewArray}
            currentFrameIndex={currentFrameIndex}
            totalFrames={totalFrames}
          />
        </div>
      </div>

      {/* Progress indicator at bottom */}
      <div className="bg-gray-900 border-t border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            Algorithm: <span className="text-indigo-400 font-semibold">{algorithmMeta?.name}</span>
          </span>
          <span>
            Frame: <span className="text-indigo-400 font-semibold">{currentFrameIndex + 1}/{totalFrames}</span>
          </span>
          <span>
            Array Size: <span className="text-indigo-400 font-semibold">{state.arraySize}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
