/**
 * heapSort.ts
 * Heap sort algorithm with frame-based animation
 */

import { AlgorithmFrame } from '../../types/AlgorithmFrame';

export const HEAP_SORT_PSEUDOCODE = [
  'function heapSort(arr)',
  '  n = arr.length',
  '  for i = n/2 - 1 down to 0',
  '    heapify(arr, n, i)',
  '  for i = n - 1 down to 0',
  '    swap(arr[0], arr[i])',
  '    heapify(arr, i, 0)',
  'return arr',
];

export function heapSort(array: number[]): AlgorithmFrame[] {
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

  function heapify(n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      accesses++;
      comparisons++;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: [largest, left],
          swapping: [],
          sorted: Array.from({ length: Math.min(n, arr.length - n + 1) }, (_, idx) =>
            arr.length - 1 - idx
          ),
        },
        codeLine: 3,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      accesses++;
      comparisons++;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: [largest, right],
          swapping: [],
          sorted: Array.from({ length: Math.min(n, arr.length - n + 1) }, (_, idx) =>
            arr.length - 1 - idx
          ),
        },
        codeLine: 3,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps++;
      accesses += 2;

      frames.push({
        array: [...arr],
        highlight: {
          comparing: [],
          swapping: [i, largest],
          sorted: Array.from({ length: Math.min(n, arr.length - n + 1) }, (_, idx) =>
            arr.length - 1 - idx
          ),
        },
        codeLine: 3,
        stats: { comparisons, swaps, accesses },
      });

      heapify(n, largest);
    }
  }

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    frames.push({
      array: [...arr],
      highlight: { comparing: [i], swapping: [], sorted: [] },
      codeLine: 2,
      stats: { comparisons, swaps, accesses },
    });
    heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;
    accesses += 2;

    frames.push({
      array: [...arr],
      highlight: {
        comparing: [],
        swapping: [0, i],
        sorted: Array.from({ length: n - i }, (_, idx) => arr.length - 1 - idx),
      },
      codeLine: 5,
      stats: { comparisons, swaps, accesses },
    });

    heapify(i, 0);
  }

  frames.push({
    array: [...arr],
    highlight: {
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, i) => i),
    },
    codeLine: 7,
    stats: { comparisons, swaps, accesses },
  });

  return frames;
}

export const HEAP_SORT_INFO = {
  name: 'Heap Sort',
  description:
    'Heap sort uses the heap data structure to sort elements. It first builds a max heap, then repeatedly extracts the maximum element and places it at the end.',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    space: 'O(1)',
  },
  useCases: [
    'Guaranteed O(n log n) performance',
    'In-place sorting',
    'Real-time systems',
  ],
};
