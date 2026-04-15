/**
 * AppContext.ts
 * Context and reducer for app state management
 */

import { createContext, useContext, useReducer, ReactNode, Dispatch, useMemo } from 'react';
import { AlgorithmState, AlgorithmFrame } from '../types/AlgorithmFrame';

export interface AppContextType {
  state: AlgorithmState;
  dispatch: Dispatch<AppAction>;
}

export type AppAction =
  | { type: 'SELECT_ALGORITHM'; payload: string }
  | { type: 'SET_INPUT_ARRAY'; payload: number[] }
  | { type: 'SET_FRAMES'; payload: AlgorithmFrame[] }
  | { type: 'SET_CURRENT_FRAME'; payload: number }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_SPEED'; payload: number }
  | { type: 'SET_ARRAY_SIZE'; payload: number }
  | { type: 'SET_TARGET_VALUE'; payload: number }
  | { type: 'SET_SORT_ORDER'; payload: 'ascending' | 'descending' }
  | { type: 'RESET' };

const initialState: AlgorithmState = {
  selectedAlgorithm: 'bubbleSort',
  inputArray: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1),
  frames: [],
  currentFrameIndex: 0,
  isPlaying: false,
  speed: 5,
  arraySize: 30,
  stats: {
    comparisons: 0,
    swaps: 0,
    accesses: 0,
  },
  targetValue: 50,
  sortOrder: 'ascending',
};

export function appReducer(state: AlgorithmState, action: AppAction): AlgorithmState {
  switch (action.type) {
    case 'SELECT_ALGORITHM':
      return { ...state, selectedAlgorithm: action.payload };

    case 'SET_INPUT_ARRAY':
      return { ...state, inputArray: action.payload };

    case 'SET_FRAMES':
      return {
        ...state,
        frames: action.payload,
        currentFrameIndex: 0,
      };

    case 'SET_CURRENT_FRAME': {
      const frame = state.frames[action.payload];
      return {
        ...state,
        currentFrameIndex: action.payload,
        stats: frame?.stats || state.stats,
      };
    }

    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };

    case 'SET_SPEED':
      return { ...state, speed: Math.min(10, Math.max(1, action.payload)) };

    case 'SET_ARRAY_SIZE':
      return { ...state, arraySize: action.payload };

    case 'SET_TARGET_VALUE':
      return { ...state, targetValue: action.payload };

    case 'SET_SORT_ORDER':
      return { ...state, sortOrder: action.payload };

    case 'RESET':
      return { ...state, currentFrameIndex: 0, isPlaying: false };

    default:
      return state;
  }
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
