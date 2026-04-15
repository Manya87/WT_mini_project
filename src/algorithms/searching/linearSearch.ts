/**
 * linearSearch.ts
 * Linear search algorithm with frame-based animation
 */

import { AlgorithmFrame } from '../../types/AlgorithmFrame';

export const LINEAR_SEARCH_PSEUDOCODE = [
  'function linearSearch(arr, target)',
  '  for i = 0 to n-1',
  '    if arr[i] == target',
  '      return i',
  '  return -1',
];

export function linearSearch(array: number[], target?: number): AlgorithmFrame[] {
  const frames: AlgorithmFrame[] = [];
  const arr = [...array];
  const searchTarget = target || arr[Math.floor(Math.random() * arr.length)];
  let comparisons = 0;
  let accesses = 0;

  frames.push({
    array: [...arr],
    highlight: { comparing: [], swapping: [], sorted: [] },
    codeLine: 0,
    stats: { comparisons, swaps: 0, accesses },
  });

  for (let i = 0; i < arr.length; i++) {
    accesses++;
    comparisons++;

    frames.push({
      array: [...arr],
      highlight: {
        comparing: [i],
        swapping: [],
        sorted: arr[i] === searchTarget ? [i] : [],
      },
      codeLine: 2,
      stats: { comparisons, swaps: 0, accesses },
    });

    if (arr[i] === searchTarget) {
      frames.push({
        array: [...arr],
        highlight: {
          comparing: [],
          swapping: [i],
          sorted: [i],
        },
        codeLine: 3,
        stats: { comparisons, swaps: 0, accesses },
      });
      break;
    }
  }

  frames.push({
    array: [...arr],
    highlight: { comparing: [], swapping: [], sorted: [] },
    codeLine: 4,
    stats: { comparisons, swaps: 0, accesses },
  });

  return frames;
}

export const LINEAR_SEARCH_INFO = {
  name: 'Linear Search',
  description:
    'Linear search is a simple algorithm that checks every element in the array sequentially until it finds the target or reaches the end.',
  complexity: {
    time: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    space: 'O(1)',
  },
  useCases: [
    'Unsorted data',
    'Small datasets',
    'Linked lists',
  ],
};
