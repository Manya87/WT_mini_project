# Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (UI Layer)                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    React Components                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐   │ │
│  │  │  ControlBar  │  │  Visualizers │  │   CodePanel    │   │ │
│  │  └──────────────┘  └──────────────┘  └────────────────┘   │ │
│  │         ▲                  ▲                 ▲              │ │
│  │         └──────────────────┼─────────────────┘              │ │
│  │                            │                               │ │
│  │                    Consume AppContext                      │ │
│  │                            │                               │ │
│  └────────────────────────────┼───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────┐
│                    AppContext (State Layer)                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  State: {                                                  │ │
│  │    selectedAlgorithm,  ◄── User selects algorithm        │ │
│  │    inputArray,         ◄── User generates array          │ │
│  │    frames[],           ◄── Generated from algorithm      │ │
│  │    isPlaying,          ◄── Animation playing?            │ │
│  │    speed,              ◄── 1-10x speed control          │ │
│  │    currentFrameIndex,  ◄── Current frame pointer         │ │
│  │    stats               ◄── Current frame statistics      │ │
│  │  }                                                         │ │
│  │                                                            │ │
│  │  Reducer: appReducer() handles all actions               │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────┐
│                   Animation Engine (Hook Layer)                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  useAlgorithmRunner(frames, speed) {                      │ │
│  │    - Manages requestAnimationFrame loop                  │ │
│  │    - Adjusts frame duration based on speed              │ │
│  │    - Returns: currentFrame, currentFrameIndex           │ │
│  │  }                                                        │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────┐
│                 Algorithm Generation (Logic Layer)               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  bubbleSort(array: number[]): Frame[] {                  │ │
│  │    - Executes algorithm step-by-step                    │ │
│  │    - Records state at each step as Frame               │ │
│  │    - Tracks comparisons, swaps, accesses                │ │
│  │    - Returns array of all frames                        │ │
│  │  }                                                        │ │
│  │                                                            │ │
│  │  Similar pattern for all other algorithms               │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### User Action → Visual Update

```
User Action (e.g., "Click Play")
        │
        ▼
    ControlBar Component
        │
        ▼
    dispatch({ type: 'SET_PLAYING', payload: true })
        │
        ▼
    AppContext Reducer
        │
        ▼
    Update state.isPlaying = true
        │
        ▼
    Propagate to all subscribers
        │
        ▼
    useAlgorithmRunner detects isPlaying changed
        │
        ▼
    Start requestAnimationFrame loop
        │
        ▼
    Each frame: increment currentFrameIndex
        │
        ▼
    Dispatch SET_CURRENT_FRAME action
        │
        ▼
    Update state.currentFrameIndex
        │
        ▼
    Visualizer receives new currentFrame
        │
        ▼
    Re-render with new frame data
        │
        ▼
    SVG bars move, colors change, stats update
```

---

## Component Hierarchy

```
App
└── AppProvider (Context.Provider)
    └── AlgorithmVisualizer
        ├── Left Sidebar (width: 320px)
        │   ├── AlgorithmSelector
        │   │   └── Category Buttons + Algorithm List
        │   ├── SpeedSlider
        │   ├── ArraySizeSlider
        │   └── CodePanel
        │       ├── Algorithm Name
        │       ├── Complexity Badges
        │       └── Pseudocode Lines (with highlight)
        └── Main Area
            ├── Visualizer (flex-1)
            │   ├── SortingVisualizer
            │   │   ├── SVG Chart
            │   │   └── Stats Grid
            │   └── SearchingVisualizer
            │       ├── Array Bars
            │       └── Stats Grid
            └── ControlBar
                ├── Action Buttons
                ├── Frame Counter
                └── Progress Bar
```

---

## Type System

```typescript
// Core Animation Types
AlgorithmFrame {
  array: number[]                    // Current array state
  highlight: {
    comparing: number[]              // Indices being compared
    swapping: number[]               // Indices being swapped
    sorted: number[]                 // Indices that are sorted
  }
  codeLine: number                   // Current pseudocode line
  stats: {
    comparisons: number
    swaps: number
    accesses: number
  }
}

// Complexity Information
AlgorithmComplexity {
  time: {
    best: string      // e.g., "O(n)"
    average: string   // e.g., "O(n log n)"
    worst: string     // e.g., "O(n²)"
  }
  space: string       // e.g., "O(1)"
}

// App State
AlgorithmState {
  selectedAlgorithm: string
  inputArray: number[]
  frames: AlgorithmFrame[]
  currentFrameIndex: number
  isPlaying: boolean
  speed: number                      // 1-10
  arraySize: number                  // 10-200
  stats: FrameStats
}
```

---

## Animation Engine Details

### Speed to Duration Mapping

```
Speed  Duration (ms)  Description
1      500ms          0.1x normal (slow)
2      450ms
3      400ms
4      350ms
5      300ms          1x (default)
6      250ms
7      200ms
8      150ms
9      100ms
10     50ms           5x fast
```

### Frame Timing

```
requestAnimationFrame callback (~16ms)
  ├─ Check elapsed time
  ├─ If elapsed >= frameDuration
  │  ├─ Increment currentFrameIndex
  │  ├─ Reset timer
  │  └─ Dispatch SET_CURRENT_FRAME
  └─ Schedule next frame if still playing
```

---

## Algorithm Execution Flow

### For Each Algorithm Function

```typescript
function algorithm(array: number[]): AlgorithmFrame[] {
  const frames: AlgorithmFrame[] = [];
  let comparisons = 0, swaps = 0, accesses = 0;
  
  // Initial frame (empty, no actions yet)
  frames.push({
    array: [...array],
    highlight: { comparing: [], swapping: [], sorted: [] },
    codeLine: 0,
    stats: { comparisons, swaps, accesses }
  });
  
  // Algorithm loop - for each action, create frame(s)
  for (let i = 0; i < n; i++) {
    // 1. Before comparing
    frames.push({
      array: [...arr],
      highlight: { comparing: [i, i+1], ... },
      codeLine: 2,  // Line in pseudocode
      stats: { comparisons: ++comparisons, ... }
    });
    
    // 2. If need to swap
    if (shouldSwap) {
      [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
      swaps++;
      frames.push({
        array: [...arr],
        highlight: { swapping: [i, i+1], ... },
        codeLine: 3,
        stats: { swaps: swaps, ... }
      });
    }
  }
  
  // Final frame - all sorted
  frames.push({
    array: [...arr],
    highlight: { sorted: [0, 1, 2, ...] },
    codeLine: pseudocode.length - 1,
    stats: { ... }
  });
  
  return frames;  // Animation will iterate through all these frames
}
```

---

## State Reducer Actions

```typescript
export type AppAction =
  | { type: 'SELECT_ALGORITHM'; payload: string }
      // User selected new algorithm from dropdown
  
  | { type: 'SET_INPUT_ARRAY'; payload: number[] }
      // Generate new random array or user input
  
  | { type: 'SET_FRAMES'; payload: AlgorithmFrame[] }
      // Algorithm generated new frame sequence
  
  | { type: 'SET_CURRENT_FRAME'; payload: number }
      // Animation progressed to new frame index
  
  | { type: 'SET_PLAYING'; payload: boolean }
      // Play button pressed
  
  | { type: 'SET_SPEED'; payload: number }
      // User moved speed slider
  
  | { type: 'SET_ARRAY_SIZE'; payload: number }
      // User moved array size slider
  
  | { type: 'RESET' }
      // Reset button pressed
```

---

## Rendering Pipeline

### SortingVisualizer Render

```
1. Receive currentFrame from useAlgorithmRunner
2. Extract: array, highlight, stats

3. Render SVG:
   ├─ For each element in array
   │  ├─ Calculate bar height (element / max)
   │  ├─ Determine color class
   │  │  ├─ If in highlight.sorted → "bar-sorted" (green)
   │  │  ├─ Elif in highlight.swapping → "bar-swapping" (red)
   │  │  ├─ Elif in highlight.comparing → "bar-comparing" (yellow)
   │  │  └─ Else → "bar-default" (indigo)
   │  └─ Render rect with transition
   │
   └─ Render stats grid
      ├─ Comparisons counter
      ├─ Swaps counter
      └─ Accesses counter

4. CSS handles smooth height/color transitions
```

---

## File Organization by Concern

```
src/
├── algorithms/          [LOGIC LAYER]
│   ├── sorting/        Each algorithm is pure function
│   └── searching/      Returns: AlgorithmFrame[]
│
├── context/            [STATE LAYER]
│   └── AppContext.tsx  Centralized app state + reducer
│
├── hooks/              [ENGINE LAYER]
│   └── useAlgorithmRunner.ts  Animation framerate controller
│
├── components/         [VIEW LAYER]
│   ├── AlgorithmVisualizer.tsx  Main container + orchestration
│   ├── visualizers/    Render frames as visual output
│   ├── controls/       User input components
│   └── panels/         Info panels (code, stats)
│
├── types/              [TYPE DEFINITIONS]
│   └── AlgorithmFrame.ts  Shared TypeScript interfaces
│
├── utils/              [UTILITIES]
│   └── algorithms.ts   Algorithm registry + helpers
│
├── __tests__/          [TESTS]
│   └── algorithms/sorting/  Unit tests for algorithms
│
└── index.css           [STYLING]
    Global styles + Tailwind layer components
```

---

## Extension Points

### Adding New Sorting Algorithm

1. **Algorithm Layer**: `src/algorithms/sorting/newSort.ts`
   - Implement function returning `AlgorithmFrame[]`
   - Export pseudocode and complexity info

2. **Registry**: `src/utils/algorithms.ts`
   - Add entry to `ALGORITHM_REGISTRY`

3. **Visualizer**: Uses `SortingVisualizer` (already handles all sorts)

4. **Tests**: Tests automatically run for new algorithm

**No UI changes needed!**

### Adding New Algorithm Category (e.g., Graph)

1. **New Algorithm Functions**: `src/algorithms/graph/*.ts`
2. **New Type**: Extend `AlgorithmFrame` type in `types/AlgorithmFrame.ts`
3. **New Visualizer**: `src/components/visualizers/GraphVisualizer.tsx`
4. **Update Main Component**: Add case in `AlgorithmVisualizer.tsx` render
5. **Register**: Add to `ALGORITHM_REGISTRY` with new category

---

## Performance Considerations

### Frame Generation
- ✓ Happens synchronously before animation starts
- ✓ For n=200 item array: typically 500-2000 frames
- ✓ Minimal delay (~100ms) before animation begins

### Rendering
- ✓ SVG bars get smooth CSS transitions
- ✓ Only `currentFrame` causes re-renders
- ✓ No full tree traversal per frame

### Animation Loop
- ✓ requestAnimationFrame ensures 60fps max
- ✓ Speed slider adjusts frame duration, not frame count
- ✓ Minimal CPU/GPU usage during animation

### Memory
- ✓ Frames stored in state (for n=200: ~100KB)
- ✓ No frame disposal needed (constant memory)
- ✓ Browser GC handles cleanup on reset

---

## Browser API Usage

### requestAnimationFrame
- **Why**: Syncs animation with screen refresh
- **Usage**: In `useAlgorithmRunner` hook
- **Cleanup**: Automatically cleared on unmount

### CSS Transitions
- **Why**: Hardware-accelerated smooth bar animations
- **Classes**: `.bar-default { transition: height 0.1s ease }`
- **Performance**: GPU-rendered, 60fps possible

### React Context API
- **Why**: Simple state management without Redux
- **Limitation**: All consumers re-render on state change
- **Future**: Could optimize with useCallback/useMemo

---

## Error Handling Strategy

### Input Validation
```typescript
// In sorting algorithms
if (array.length === 0) return [emptyFrame];
if (array.some(x => !Number.isFinite(x))) throw Error(...);
```

### Safe Defaults
```typescript
// In visualizer
if (!frame) return <Loading />;
if (arrayLength === 0) return <Empty />;
```

### Tests Cover Edge Cases
- Empty array
- Single element
- Already sorted
- Reverse sorted
- Duplicates
- Large arrays

---

## Summary

The Algorithm Visualizer uses a **layered architecture**:

1. **Logic Layer** → Pure algorithm functions (side-effect free)
2. **State Layer** → React Context + Reducer (single source of truth)
3. **Engine Layer** → useAlgorithmRunner (animation controller)
4. **View Layer** → React Components (render current frame)

This separation enables:
- ✅ Easy to test (pure functions)
- ✅ Predictable state updates
- ✅ Reusable components
- ✅ Easy to extend (add algorithms without changing UI)
