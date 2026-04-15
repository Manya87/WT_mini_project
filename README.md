# Algorithm Visualizer

An interactive web application that visually animates classic algorithms step-by-step, helping users learn how algorithms work through animations, code highlighting, and real-time statistics.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

## Features

### Sorting Algorithms
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

Visualizations show:
- Real-time comparisons, swaps, and array accesses
- Color-coded bars: yellow (comparing), red (swapping), green (sorted)
- Detailed statistics dashboard
- Pseudocode with line highlighting

### Searching Algorithms
- Linear Search
- Binary Search

Features:
- Step-by-step element comparison
- Search range visualization
- Found element highlighting

### Controls
- **Play/Pause**: Start or freeze animation
- **Step**: Advance one frame at a time
- **Speed Control**: Adjust animation speed (1x-10x)
- **Array Size**: Change input size (10-200 elements)
- **Generate New**: Create new random array

## Project Structure

```
src/
├── algorithms/
│   ├── sorting/               # Sorting algorithm implementations
│   │   ├── bubbleSort.ts
│   │   ├── selectionSort.ts
│   │   ├── insertionSort.ts
│   │   ├── mergeSort.ts
│   │   ├── quickSort.ts
│   │   └── heapSort.ts
│   └── searching/             # Searching algorithm implementations
│       ├── linearSearch.ts
│       └── binarySearch.ts
├── components/
│   ├── AlgorithmVisualizer.tsx # Main container
│   ├── controls/               # Control components
│   │   ├── ControlBar.tsx
│   │   ├── SpeedSlider.tsx
│   │   ├── ArraySizeSlider.tsx
│   │   └── AlgorithmSelector.tsx
│   ├── visualizers/            # Visualization components
│   │   ├── SortingVisualizer.tsx
│   │   └── SearchingVisualizer.tsx
│   └── panels/                 # Info panels
│       └── CodePanel.tsx
├── context/
│   └── AppContext.tsx          # React Context + Reducer for state
├── hooks/
│   └── useAlgorithmRunner.ts   # Animation engine hook
├── types/
│   └── AlgorithmFrame.ts       # TypeScript type definitions
├── utils/
│   └── algorithms.ts           # Algorithm metadata & utilities
├── App.tsx
├── main.tsx
└── index.css

__tests__/                      # Unit tests
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## How It Works

### Animation Engine
Each algorithm returns an array of "frames" that describe the state at each step:

```typescript
type Frame = {
  array: number[]              // Current array state
  highlight: {
    comparing: number[]        // Indices being compared (yellow)
    swapping: number[]         // Indices being swapped (red)
    sorted: number[]           // Indices that are sorted (green)
  }
  codeLine: number             // Pseudocode line to highlight
  stats: {
    comparisons: number        // Total comparisons so far
    swaps: number              // Total swaps so far
    accesses: number           // Total array accesses
  }
}
```

The `useAlgorithmRunner` hook steps through these frames using `requestAnimationFrame`, respecting the speed slider setting.

### State Management
Uses React Context + useReducer for centralized state management:
- Selected algorithm
- Input array
- Animation frames
- Current frame index
- Play/pause state
- Speed and array size settings

## Algorithm Complexity

### Time Complexity Legend
- 🟢 **O(n log n)** - Fast
- 🟡 **O(n²)** - Medium
- 🔴 **O(n³)** or worse - Slow

### Supported Algorithms

**Sorting:**
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |

**Searching:**
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |

## Testing

Run the test suite:

```bash
npm run test
```

Tests cover:
- Basic sorting functionality (random, sorted, reverse sorted)
- Edge cases (empty, single element, duplicates)
- Statistics tracking
- Animation frame generation

## Styling

The app uses a dark theme with:
- Background: `gray-950`
- Panels: `gray-900`
- Accent color: `indigo-500`
- Status colors: yellow (comparing), red (swapping), green (sorted)

All styling is done with Tailwind CSS utility classes.

## Future Enhancements

- [ ] Graph algorithms (BFS, DFS, Dijkstra)
- [ ] Pathfinding algorithms (A*, Dijkstra on grid)
- [ ] Compare mode (run two algorithms side-by-side)
- [ ] Custom input support
- [ ] Sound effects
- [ ] Export visualization as GIF/MP4
- [ ] Algorithm descriptions and history
- [ ] Mobile responsive design

## Performance Notes

- Animations handle up to 200 elements smoothly
- Frame generation is pre-computed before animation starts
- Speed control adjusts frame duration, not frame count
- Smooth CSS transitions on bar heights

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
