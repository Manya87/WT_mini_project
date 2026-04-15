/**
 * AlgorithmFrame.ts
 * Core type definitions for algorithm animation frames
 */

export interface FrameHighlight {
  comparing: number[];
  swapping: number[];
  sorted: number[];
}

export interface FrameStats {
  comparisons: number;
  swaps: number;
  accesses: number;
  iterations?: number;
}

export interface AlgorithmFrame {
  array: number[];
  highlight: FrameHighlight;
  codeLine: number;
  stats: FrameStats;
  description?: string;
}

export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface Algorithm {
  name: string;
  category: 'sorting' | 'searching' | 'graph' | 'pathfinding';
  description: string;
  complexity: AlgorithmComplexity;
  pseudocode: string[];
}

export interface SortingAlgorithm extends Algorithm {
  category: 'sorting';
}

export interface SearchingAlgorithm extends Algorithm {
  category: 'searching';
}

export interface AlgorithmState {
  selectedAlgorithm: string;
  inputArray: number[];
  frames: AlgorithmFrame[];
  currentFrameIndex: number;
  isPlaying: boolean;
  speed: number; // 1-10
  arraySize: number;
  stats: FrameStats;
  targetValue: number; // For searching algorithms
  sortOrder: 'ascending' | 'descending'; // For sorting algorithms
}

// Graph and Pathfinding types
export interface GraphNode {
  id: number;
  x: number;
  y: number;
  state: 'default' | 'visiting' | 'visited' | 'in-path';
}

export interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
}

export interface GraphFrame {
  nodes: GraphNode[];
  edges: GraphEdge[];
  currentNode?: number;
  path: number[];
  codeLine: number;
  stats: FrameStats;
}

export interface GridCell {
  row: number;
  col: number;
  type: 'empty' | 'wall' | 'start' | 'end' | 'open' | 'closed' | 'path';
}

export interface GridFrame {
  cells: GridCell[];
  openSet: GridCell[];
  closedSet: GridCell[];
  path: GridCell[];
  codeLine: number;
  stats: FrameStats;
}
