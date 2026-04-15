/**
 * mergeSort.ts
 * Merge sort algorithm with frame-based animation
 */

import { AlgorithmFrame } from '../../types/AlgorithmFrame';

export const MERGE_SORT_PSEUDOCODE = [
  'function mergeSort(arr, left, right)',
  '  if left < right',
  '    mid = (left + right) / 2',
  '    mergeSort(arr, left, mid)',
  '    mergeSort(arr, mid+1, right)',
  '    merge(arr, left, mid, right)',
  'return arr',
];

export function mergeSort(array: number[]): AlgorithmFrame[] {
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

  function merge(
    left: number,
    mid: number,
    right: number,
    comparing: number[]
  ): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      accesses += 2;
      comparisons++;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: [left + i, mid + 1 + j, ...comparing],
          swapping: [],
          sorted: [],
        },
        codeLine: 5,
        stats: { comparisons, swaps, accesses },
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      swaps++;
      accesses++;
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
      swaps++;
      accesses++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
      swaps++;
      accesses++;
    }

    frames.push({
      array: [...arr],
      highlight: {
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      },
      codeLine: 5,
      stats: { comparisons, swaps, accesses },
    });
  }

  function mergeSortHelper(left: number, right: number): void {
    if (left < right) {
      frames.push({
        array: [...arr],
        highlight: { comparing: [], swapping: [], sorted: [] },
        codeLine: 1,
        stats: { comparisons, swaps, accesses },
      });

      const mid = Math.floor((left + right) / 2);

      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);

      merge(
        left,
        mid,
        right,
        Array.from(
          { length: right - left + 1 },
          (_, idx) => left + idx
        )
      );
    }
  }

  mergeSortHelper(0, arr.length - 1);

  frames.push({
    array: [...arr],
    highlight: {
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    },
    codeLine: 6,
    stats: { comparisons, swaps, accesses },
  });

  return frames;
}

export const MERGE_SORT_INFO = {
  name: 'Merge Sort',
  description:
    'Merge sort is a divide-and-conquer algorithm that divides the input array in half, recursively sorts the halves, and then merges the sorted halves.',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    space: 'O(n)',
  },
  useCases: [
    'Large datasets',
    'Guaranteed O(n log n) performance',
    'Stable sorting needed',
  ],
};
