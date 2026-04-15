/**
 * __tests__/algorithms/sorting/bubbleSort.test.ts
 */

import { describe, it, expect } from 'vitest';
import { bubbleSort } from '../../../algorithms/sorting/bubbleSort';

describe('Bubble Sort', () => {
  it('should sort a random array', () => {
    const input = [5, 2, 8, 1, 9];
    const frames = bubbleSort(input);
    expect(frames.length).toBeGreaterThan(0);
    expect(frames[frames.length - 1].array).toEqual([1, 2, 5, 8, 9]);
  });

  it('should handle already sorted array', () => {
    const input = [1, 2, 3, 4, 5];
    const frames = bubbleSort(input);
    expect(frames[frames.length - 1].array).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle reverse sorted array', () => {
    const input = [5, 4, 3, 2, 1];
    const frames = bubbleSort(input);
    expect(frames[frames.length - 1].array).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle single element', () => {
    const input = [42];
    const frames = bubbleSort(input);
    expect(frames[frames.length - 1].array).toEqual([42]);
  });

  it('should handle empty array', () => {
    const input: number[] = [];
    const frames = bubbleSort(input);
    expect(frames.length).toBeGreaterThan(0);
  });

  it('should handle duplicates', () => {
    const input = [3, 1, 3, 1, 3];
    const frames = bubbleSort(input);
    expect(frames[frames.length - 1].array).toEqual([1, 1, 3, 3, 3]);
  });

  it('should track comparisons', () => {
    const input = [5, 2, 8, 1, 9];
    const frames = bubbleSort(input);
    const finalFrame = frames[frames.length - 1];
    expect(finalFrame.stats.comparisons).toBeGreaterThan(0);
  });

  it('should track swaps', () => {
    const input = [5, 2, 8, 1, 9];
    const frames = bubbleSort(input);
    const finalFrame = frames[frames.length - 1];
    expect(finalFrame.stats.swaps).toBeGreaterThan(0);
  });
});
