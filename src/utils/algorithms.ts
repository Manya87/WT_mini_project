/**
 * utils/algorithms.ts
 * Algorithm metadata and helpers
 */

import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  BUBBLE_SORT_PSEUDOCODE,
  SELECTION_SORT_PSEUDOCODE,
  INSERTION_SORT_PSEUDOCODE,
  MERGE_SORT_PSEUDOCODE,
  QUICK_SORT_PSEUDOCODE,
  HEAP_SORT_PSEUDOCODE,
  BUBBLE_SORT_INFO,
  SELECTION_SORT_INFO,
  INSERTION_SORT_INFO,
  MERGE_SORT_INFO,
  QUICK_SORT_INFO,
  HEAP_SORT_INFO,
} from '../algorithms/sorting';
import {
  linearSearch,
  binarySearch,
  LINEAR_SEARCH_PSEUDOCODE,
  BINARY_SEARCH_PSEUDOCODE,
  LINEAR_SEARCH_INFO,
  BINARY_SEARCH_INFO,
} from '../algorithms/searching';
import { AlgorithmFrame, AlgorithmComplexity } from '../types/AlgorithmFrame';

export interface AlgorithmMetadata {
  id: string;
  name: string;
  category: 'sorting' | 'searching' | 'graph' | 'pathfinding';
  pseudocode: string[];
  complexity: AlgorithmComplexity;
  fn: (arr: number[], target?: number) => AlgorithmFrame[];
}

export const ALGORITHM_REGISTRY: Record<string, AlgorithmMetadata> = {
  bubbleSort: {
    id: 'bubbleSort',
    name: 'Bubble Sort',
    category: 'sorting',
    pseudocode: BUBBLE_SORT_PSEUDOCODE,
    complexity: BUBBLE_SORT_INFO.complexity,
    fn: bubbleSort,
  },
  selectionSort: {
    id: 'selectionSort',
    name: 'Selection Sort',
    category: 'sorting',
    pseudocode: SELECTION_SORT_PSEUDOCODE,
    complexity: SELECTION_SORT_INFO.complexity,
    fn: selectionSort,
  },
  insertionSort: {
    id: 'insertionSort',
    name: 'Insertion Sort',
    category: 'sorting',
    pseudocode: INSERTION_SORT_PSEUDOCODE,
    complexity: INSERTION_SORT_INFO.complexity,
    fn: insertionSort,
  },
  mergeSort: {
    id: 'mergeSort',
    name: 'Merge Sort',
    category: 'sorting',
    pseudocode: MERGE_SORT_PSEUDOCODE,
    complexity: MERGE_SORT_INFO.complexity,
    fn: mergeSort,
  },
  quickSort: {
    id: 'quickSort',
    name: 'Quick Sort',
    category: 'sorting',
    pseudocode: QUICK_SORT_PSEUDOCODE,
    complexity: QUICK_SORT_INFO.complexity,
    fn: quickSort,
  },
  heapSort: {
    id: 'heapSort',
    name: 'Heap Sort',
    category: 'sorting',
    pseudocode: HEAP_SORT_PSEUDOCODE,
    complexity: HEAP_SORT_INFO.complexity,
    fn: heapSort,
  },
  linearSearch: {
    id: 'linearSearch',
    name: 'Linear Search',
    category: 'searching',
    pseudocode: LINEAR_SEARCH_PSEUDOCODE,
    complexity: LINEAR_SEARCH_INFO.complexity,
    fn: linearSearch,
  },
  binarySearch: {
    id: 'binarySearch',
    name: 'Binary Search',
    category: 'searching',
    pseudocode: BINARY_SEARCH_PSEUDOCODE,
    complexity: BINARY_SEARCH_INFO.complexity,
    fn: binarySearch,
  },
};

export function generateRandomArray(size: number, max: number = 100): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

export function getAlgorithmMetadata(id: string): AlgorithmMetadata | undefined {
  return ALGORITHM_REGISTRY[id];
}

export function getAllAlgorithms(): AlgorithmMetadata[] {
  return Object.values(ALGORITHM_REGISTRY);
}

export function getAlgorithmsByCategory(category: string): AlgorithmMetadata[] {
  return getAllAlgorithms().filter((a) => a.category === category);
}
