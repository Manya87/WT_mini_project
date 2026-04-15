/**
 * quickSort.ts
 * Quick sort algorithm with frame-based animation
 */

import { AlgorithmFrame } from '../../types/AlgorithmFrame';

export const QUICK_SORT_PSEUDOCODE = [
  'function quickSort(arr, low, high)',
  '  if low < high',
  '    pi = partition(arr, low, high)',
  '    quickSort(arr, low, pi-1)',
  '    quickSort(arr, pi+1, high)',
  'return arr',
];

export function quickSort(array: number[]): AlgorithmFrame[] {
  const frames: AlgorithmFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  frames.push({
    array: [...arr],
    highlight: { comparing: [], swapping: [], sorted: [] },
    codeLine: 0,
    stats: { comparisons, swaps, accesses },
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    accesses++;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      accesses++;
      comparisons++;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: [j, high],
          swapping: [],
          sorted: [],
        },
        codeLine: 4,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;
        accesses += 2;

        frames.push({
          array: [...arr],
          highlight: {
            comparing: [],
            swapping: [i, j],
            sorted: [],
          },
          codeLine: 4,
          stats: { comparisons, swaps, accesses },
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    accesses += 2;

    frames.push({
      array: [...arr],
      highlight: {
        comparing: [],
        swapping: [i + 1, high],
        sorted: [],
      },
      codeLine: 4,
      stats: { comparisons, swaps, accesses },
    });

    return i + 1;
  }

  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      frames.push({
        array: [...arr],
        highlight: { comparing: [], swapping: [], sorted: [] },
        codeLine: 1,
        stats: { comparisons, swaps, accesses },
      });

      const pi = partition(low, high);

      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, arr.length - 1);

  frames.push({
    array: [...arr],
    highlight: {
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    },
    codeLine: 5,
    stats: { comparisons, swaps, accesses },
  });

  return frames;
}

export const QUICK_SORT_INFO = {
  name: 'Quick Sort',
  description:
    'Quick sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    space: 'O(log n)',
  },
  useCases: [
    'General purpose sorting',
    'In-place sorting preferred',
    'Cache-friendly sorting',
  ],
};
