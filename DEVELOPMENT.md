# Development Guide

## Quick Start

```bash
# Start development server
npm run dev

# This opens http://localhost:5173 in your browser
```

## Project Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production (generates `dist/` folder)
- **`npm run preview`** - Preview production build locally
- **`npm run test`** - Run tests in watch mode
- **`npm run test -- --run`** - Run tests once and exit

## Adding a New Sorting Algorithm

1. Create a new file in `src/algorithms/sorting/` (e.g., `cocktailSort.ts`)

2. Implement the algorithm function that returns `AlgorithmFrame[]`:

```typescript
import { AlgorithmFrame } from '../../types/AlgorithmFrame';

export const COCKTAIL_SORT_PSEUDOCODE = [
  'function cocktailSort(arr)',
  '  while hasSwapped',
  '    // forward pass',
  '    // backward pass',
  'return arr',
];

export function cocktailSort(array: number[]): AlgorithmFrame[] {
  const frames: AlgorithmFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  // Push initial state
  frames.push({
    array: [...arr],
    highlight: { comparing: [], swapping: [], sorted: [] },
    codeLine: 0,
    stats: { comparisons, swaps, accesses },
  });

  // ... implement algorithm with frames
  
  return frames;
}

export const COCKTAIL_SORT_INFO = {
  name: 'Cocktail Sort',
  description: '...',
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
};
```

3. Export from `src/algorithms/sorting/index.ts`:

```typescript
export { cocktailSort, COCKTAIL_SORT_PSEUDOCODE, COCKTAIL_SORT_INFO } from './cocktailSort';
```

4. Add to `src/utils/algorithms.ts`:

```typescript
cocktailSort: {
  id: 'cocktailSort',
  name: 'Cocktail Sort',
  category: 'sorting',
  pseudocode: COCKTAIL_SORT_PSEUDOCODE,
  complexity: COCKTAIL_SORT_INFO.complexity,
  fn: cocktailSort,
},
```

5. Tests will automatically pick it up from ALGORITHM_REGISTRY!

## Adding a New Algorithm Category

### For Searching Algorithms

1. Create `src/algorithms/searching/myAlgorithm.ts` following the pattern above
2. Export from `src/algorithms/searching/index.ts`
3. Add to `ALGORITHM_REGISTRY` in `src/utils/algorithms.ts`
4. Create visualizer in `src/components/visualizers/MyVisualizer.tsx`
5. Add case in `AlgorithmVisualizer.tsx` render method

### For Graph Algorithms

1. Update `AlgorithmFrame` type to include `GraphFrame` types
2. Create algorithms in `src/algorithms/graph/`
3. Create `GraphVisualizer.tsx` component (canvas or SVG based)
4. Add rendering logic to main visualizer

### For Pathfinding Algorithms

1. Create algorithms in `src/algorithms/pathfinding/`  
2. Create `GridVisualizer.tsx` component (20x20 grid)
3. Implement cell interaction (walls, start, end placement)
4. Add rendering logic

## Component Architecture

### Control Flow

```
App (context provider)
  ↓
AlgorithmVisualizer (main container)
  ├── Left Sidebar:
  │   ├── AlgorithmSelector
  │   ├── SpeedSlider
  │   ├── ArraySizeSlider
  │   └── CodePanel
  └── Main Area:
      ├── SortingVisualizer / SearchingVisualizer / etc.
      └── ControlBar
```

### State Management

All state managed through `AppContext` (React Context + useReducer):

```typescript
{
  selectedAlgorithm: string;       // Algorithm ID
  inputArray: number[];             // Current array
  frames: AlgorithmFrame[];         // All animation frames
  currentFrameIndex: number;        // Current frame being displayed
  isPlaying: boolean;               // Animation playing?
  speed: number;                    // 1-10 multiplier
  arraySize: number;                // 10-200 elements
  stats: FrameStats;                // Comparisons, swaps, accesses
}
```

## Styling System

### Color Classes

```css
.bar-default     /* indigo-500 */
.bar-comparing   /* yellow-400 */
.bar-swapping    /* red-500 */
.bar-sorted      /* green-500 */

.complexity-fast   /* green-900 badge */
.complexity-medium /* yellow-900 badge */
.complexity-slow   /* red-900 badge */
```

### Dark Theme

- Primary background: `bg-gray-950`
- Panel background: `bg-gray-900`
- Text: `text-gray-300` / `text-white`
- Accent: `indigo-500` for interactive elements
- Borders: `border-gray-700`

### Responsive Breakpoints

Currently optimized for desktop. Mobile responsiveness planned:
- Sidebar collapses to tabs at `md` breakpoint
- Visualizer scales to 100% width
- Controls stack vertically

## Testing Best Practices

### Unit Testing Algorithms

```typescript
it('should sort array correctly', () => {
  const input = [5, 2, 8, 1];
  const frames = bubbleSort(input);
  
  // Check final result
  const finalArray = frames[frames.length - 1].array;
  expect(finalArray).toEqual([1, 2, 5, 8]);
  
  // Check frames exist
  expect(frames.length).toBeGreaterThan(1);
  
  // Check stats are tracked
  expect(frames[frames.length - 1].stats.comparisons).toBeGreaterThan(0);
});
```

**Test edge cases:**
- Empty array
- Single element
- Already sorted
- Reverse sorted
- Duplicates

### Component Testing

Use Vitest + React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';

it('renders control buttons', () => {
  render(<ControlBar ... />);
  expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
});
```

## Performance Tips

1. **Array size**: Visualizations are smooth up to 200 elements
2. **Frame generation**: Pre-computed before animation, not during
3. **CSS transitions**: Use `transition-all duration-100` for smooth bar animations
4. **requestAnimationFrame**: Used in animation hook for 60fps max
5. **Memoization**: Use `useMemo` in visualizers to avoid recalculations

## Common Issues

### Build failing with TypeScript errors

1. Check imports are correct (relative paths)
2. Verify all imports are actually used (`@typescript-eslint/no-unused-vars`)
3. Run `npx tsc --noEmit` to see exact errors

### Tests failing

1. Ensure algorithms return `AlgorithmFrame[]` not `Promise<...>`
2. Check array import paths (should be relative to test file)
3. Verify mock data doesn't have NaN or undefined values

### Visualizer not updating

1. Check `currentFrame` is being passed correctly from hook
2. Verify reducer is dispatching `SET_CURRENT_FRAME` action
3. Check speed value is between 1-10

## Next Steps

- [ ] Add graph algorithms (BFS, DFS, Dijkstra)
- [ ] Add pathfinding visualizer (A*, Dijkstra on grid)
- [ ] Implement compare mode (side-by-side)
- [ ] Add custom input support
- [ ] Mobile responsiveness
- [ ] Export as GIF/video
- [ ] Sound effects on swaps
- [ ] Algorithm descriptions/history drawer
