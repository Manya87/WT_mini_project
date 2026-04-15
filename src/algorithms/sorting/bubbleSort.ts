/**
 * bubbleSort.ts
 * Bubble sort algorithm with frame-based animation
 */

import { AlgorithmFrame } from '../../types/AlgorithmFrame';

export const BUBBLE_SORT_PSEUDOCODE = [
  'for i = 0 to n-1',
  '  for j = 0 to n-i-1',
  '    if arr[j] > arr[j+1]',
  '      swap(arr[j], arr[j+1])',
  'return arr',
];

export function bubbleSort(array: number[]): AlgorithmFrame[] {
  const frames: AlgorithmFrame[] = [];
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  // Initial state
  frames.push({
    array: [...arr],
    highlight: {
      comparing: [],
      swapping: [],
      sorted: [],
    },
    codeLine: 0,
    stats: {
      comparisons,
      swaps,
      accesses,
    },
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Line 1: update i in outer loop
      frames.push({
        array: [...arr],
        highlight: {
          comparing: [j],
          swapping: [],
          sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
        },
        codeLine: 1,
        stats: {
          comparisons,
          swaps,
          accesses,
        },
      });

      // Line 2: compare
      accesses += 2;
      comparisons++;
      frames.push({
        array: [...arr],
        highlight: {
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
        },
        codeLine: 2,
        stats: {
          comparisons,
          swaps,
          accesses,
        },
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        accesses += 2;

        frames.push({
          array: [...arr],
          highlight: {
            comparing: [],
            swapping: [j, j + 1],
            sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
          },
          codeLine: 3,
          stats: {
            comparisons,
            swaps,
            accesses,
          },
        });
      }
    }
  }

  // Final state - all sorted
  frames.push({
    array: [...arr],
    highlight: {
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, i) => i),
    },
    codeLine: 4,
    stats: {
      comparisons,
      swaps,
      accesses,
    },
  });

  return frames;
}

export const BUBBLE_SORT_INFO = {
  name: 'Bubble Sort',
  description:
    'Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
  complexity: {
    time: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    space: 'O(1)',
  },
  useCases: [
    'Educational purposes - easy to understand',
    'Small datasets',
    'Nearly sorted data (optimized version)',
  ],
};
