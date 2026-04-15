/**
 * insertionSort.ts
 * Insertion sort algorithm with frame-based animation
 */

import { AlgorithmFrame } from '../../types/AlgorithmFrame';

export const INSERTION_SORT_PSEUDOCODE = [
  'for i = 1 to n-1',
  '  key = arr[i]',
  '  j = i - 1',
  '  while j >= 0 and arr[j] > key',
  '    arr[j+1] = arr[j]',
  '    j = j - 1',
  '  arr[j+1] = key',
  'return arr',
];

export function insertionSort(array: number[]): AlgorithmFrame[] {
  const frames: AlgorithmFrame[] = [];
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  frames.push({
    array: [...arr],
    highlight: { comparing: [], swapping: [], sorted: [0] },
    codeLine: 0,
    stats: { comparisons, swaps, accesses },
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    accesses++;
    let j = i - 1;

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

    while (j >= 0) {
      accesses++;
      comparisons++;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: [j, i],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => k),
        },
        codeLine: 3,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        swaps++;
        accesses += 2;
        j--;

        frames.push({
          array: [...arr],
          highlight: {
            comparing: [j + 1],
            swapping: [j + 1],
            sorted: Array.from({ length: i }, (_, k) => k),
          },
          codeLine: 4,
          stats: { comparisons, swaps, accesses },
        });
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    accesses++;

    frames.push({
      array: [...arr],
      highlight: {
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
      },
      codeLine: 6,
      stats: { comparisons, swaps, accesses },
    });
  }

  return frames;
}

export const INSERTION_SORT_INFO = {
  name: 'Insertion Sort',
  description:
    'Insertion sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
  complexity: {
    time: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    space: 'O(1)',
  },
  useCases: [
    'Small datasets',
    'Nearly sorted data',
    'Online sorting',
    'Adaptive sorting',
  ],
};
