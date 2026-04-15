/**
 * selectionSort.ts
 * Selection sort algorithm with frame-based animation
 */

import { AlgorithmFrame } from '../../types/AlgorithmFrame';

export const SELECTION_SORT_PSEUDOCODE = [
  'for i = 0 to n-1',
  '  min_idx = i',
  '  for j = i+1 to n-1',
  '    if arr[j] < arr[min_idx]',
  '      min_idx = j',
  '  swap(arr[i], arr[min_idx])',
  'return arr',
];

export function selectionSort(array: number[]): AlgorithmFrame[] {
  const frames: AlgorithmFrame[] = [];
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  frames.push({
    array: [...arr],
    highlight: { comparing: [], swapping: [], sorted: [] },
    codeLine: 0,
    stats: { comparisons, swaps, accesses },
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    accesses++;

    frames.push({
      array: [...arr],
      highlight: {
        comparing: [i],
        swapping: [],
        sorted: Array.from({ length: i }, (_, k) => k),
      },
      codeLine: 1,
      stats: { comparisons, swaps, accesses },
    });

    for (let j = i + 1; j < n; j++) {
      accesses++;
      comparisons++;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: [i, j, minIdx],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => k),
        },
        codeLine: 3,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        accesses++;

        frames.push({
          array: [...arr],
          highlight: {
            comparing: [i, j],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => k),
          },
          codeLine: 4,
          stats: { comparisons, swaps, accesses },
        });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
      accesses += 2;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: [],
          swapping: [i, minIdx],
          sorted: Array.from({ length: i + 1 }, (_, k) => k),
        },
        codeLine: 5,
        stats: { comparisons, swaps, accesses },
      });
    }
  }

  frames.push({
    array: [...arr],
    highlight: {
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, i) => i),
    },
    codeLine: 6,
    stats: { comparisons, swaps, accesses },
  });

  return frames;
}

export const SELECTION_SORT_INFO = {
  name: 'Selection Sort',
  description:
    'Selection sort divides the input into a sorted and unsorted region. It repeatedly finds the minimum element from the unsorted region and moves it to the sorted region.',
  complexity: {
    time: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    space: 'O(1)',
  },
  useCases: [
    'Educational purposes',
    'When memory writes are expensive',
    'Small datasets',
  ],
};
