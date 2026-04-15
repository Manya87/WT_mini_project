/**
 * binarySearch.ts
 * Binary search algorithm with frame-based animation
 */

import { AlgorithmFrame } from '../../types/AlgorithmFrame';

export const BINARY_SEARCH_PSEUDOCODE = [
  'function binarySearch(arr, target)',
  '  left = 0, right = n-1',
  '  while left <= right',
  '    mid = (left + right) / 2',
  '    if arr[mid] == target',
  '      return mid',
  '    else if arr[mid] < target',
  '      left = mid + 1',
  '    else',
  '      right = mid - 1',
  '  return -1',
];

export function binarySearch(array: number[], target?: number): AlgorithmFrame[] {
  const frames: AlgorithmFrame[] = [];
  const arr = [...array].sort((a, b) => a - b);
  const searchTarget = target || arr[Math.floor(Math.random() * arr.length)];
  let comparisons = 0;
  let accesses = 0;

  frames.push({
    array: [...arr],
    highlight: { comparing: [], swapping: [], sorted: [] },
    codeLine: 0,
    stats: { comparisons, swaps: 0, accesses },
  });

  let left = 0,
    right = arr.length - 1;

  frames.push({
    array: [...arr],
    highlight: {
      comparing: [left, right],
      swapping: [],
      sorted: [],
    },
    codeLine: 1,
    stats: { comparisons, swaps: 0, accesses },
  });

  while (left <= right) {
    accesses++;
    frames.push({
      array: [...arr],
      highlight: {
        comparing: [left, right],
        swapping: [],
        sorted: [],
      },
      codeLine: 2,
      stats: { comparisons, swaps: 0, accesses },
    });

    const mid = Math.floor((left + right) / 2);
    accesses++;
    comparisons++;

    frames.push({
      array: [...arr],
      highlight: {
        comparing: [mid],
        swapping: [],
        sorted: [],
      },
      codeLine: 3,
      stats: { comparisons, swaps: 0, accesses },
    });

    if (arr[mid] === searchTarget) {
      frames.push({
        array: [...arr],
        highlight: {
          comparing: [],
          swapping: [mid],
          sorted: [mid],
        },
        codeLine: 5,
        stats: { comparisons, swaps: 0, accesses },
      });
      break;
    } else if (arr[mid] < searchTarget) {
      comparisons++;
      left = mid + 1;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
          swapping: [],
          sorted: [],
        },
        codeLine: 7,
        stats: { comparisons, swaps: 0, accesses },
      });
    } else {
      comparisons++;
      right = mid - 1;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
          swapping: [],
          sorted: [],
        },
        codeLine: 9,
        stats: { comparisons, swaps: 0, accesses },
      });
    }
  }

  frames.push({
    array: [...arr],
    highlight: { comparing: [], swapping: [], sorted: [] },
    codeLine: 10,
    stats: { comparisons, swaps: 0, accesses },
  });

  return frames;
}

export const BINARY_SEARCH_INFO = {
  name: 'Binary Search',
  description:
    'Binary search is an efficient algorithm that repeatedly divides the sorted search space in half to find the target element.',
  complexity: {
    time: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
    },
    space: 'O(1)',
  },
  useCases: [
    'Sorted data',
    'Large databases',
    'Efficient searching',
  ],
};
