/**
 * __tests__/algorithms/sorting/sorting.test.ts
 * Generic tests for all sorting algorithms
 */

import { describe, it, expect } from 'vitest';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
} from '../../../algorithms/sorting';

const testCases = [
  { name: 'Bubble Sort', fn: bubbleSort },
  { name: 'Selection Sort', fn: selectionSort },
  { name: 'Insertion Sort', fn: insertionSort },
  { name: 'Merge Sort', fn: mergeSort },
  { name: 'Quick Sort', fn: quickSort },
  { name: 'Heap Sort', fn: heapSort },
];

describe('All Sorting Algorithms', () => {
  testCases.forEach(({ name, fn }) => {
    describe(name, () => {
      it(`should sort a random array`, () => {
        const input = [5, 2, 8, 1, 9, 3, 7];
        const frames = fn(input);
        const sorted = frames[frames.length - 1].array;
        expect(sorted).toEqual([1, 2, 3, 5, 7, 8, 9]);
      });

      it(`should handle duplicate elements`, () => {
        const input = [3, 1, 4, 1, 5, 9, 2, 6, 5];
        const frames = fn(input);
        const sorted = frames[frames.length - 1].array;
        expect(sorted).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
      });

      it(`should handle single element`, () => {
        const input = [42];
        const frames = fn(input);
        expect(frames[frames.length - 1].array).toEqual([42]);
      });

      it(`should handle two elements`, () => {
        const input = [2, 1];
        const frames = fn(input);
        expect(frames[frames.length - 1].array).toEqual([1, 2]);
      });

      it(`should handle already sorted array`, () => {
        const input = [1, 2, 3, 4, 5];
        const frames = fn(input);
        expect(frames[frames.length - 1].array).toEqual([1, 2, 3, 4, 5]);
      });

      it(`should handle reverse sorted array`, () => {
        const input = [5, 4, 3, 2, 1];
        const frames = fn(input);
        expect(frames[frames.length - 1].array).toEqual([1, 2, 3, 4, 5]);
      });

      it(`should generate animation frames`, () => {
        const input = [5, 2, 8, 1];
        const frames = fn(input);
        expect(frames.length).toBeGreaterThan(1);
        expect(frames[0]).toBeDefined();
        expect(frames[0].array).toBeDefined();
        expect(frames[0].highlight).toBeDefined();
        expect(frames[0].stats).toBeDefined();
      });

      it(`should track statistics`, () => {
        const input = [5, 2, 8, 1, 9];
        const frames = fn(input);
        const finalFrame = frames[frames.length - 1];
        expect(finalFrame.stats.comparisons).toBeGreaterThanOrEqual(0);
        expect(finalFrame.stats.accesses).toBeGreaterThanOrEqual(0);
      });

      it(`should maintain array properties through animation`, () => {
        const input = [5, 2, 8, 1, 9];
        const frames = fn(input);
        frames.forEach((frame: typeof frames[0]) => {
          expect(frame.array.length).toBe(input.length);
          expect(Array.isArray(frame.array)).toBe(true);
        });
      });
    });
  });
});
