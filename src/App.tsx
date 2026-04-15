/**
 * App.tsx
 * Main app entry point with context provider
 */

import { AppProvider } from './context/AppContext';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';

export function App() {
  return (
    <AppProvider>
      <AlgorithmVisualizer />
    </AppProvider>
  );
}

export default App;
