/**
 * SearchTargetInput.tsx
 * Allows users to input target value for search algorithms
 */

import React, { useState } from 'react';

interface SearchTargetInputProps {
  onTargetChange: (target: number) => void;
  defaultTarget?: number;
}

export const SearchTargetInput: React.FC<SearchTargetInputProps> = ({
  onTargetChange,
  defaultTarget = 50,
}) => {
  const [target, setTarget] = useState<number>(defaultTarget);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError('');

    if (value === '') {
      setTarget(0);
      return;
    }

    const num = Number(value);

    if (isNaN(num)) {
      setError('Please enter a valid number');
      return;
    }

    if (!Number.isInteger(num)) {
      setError('Must be a whole number');
      return;
    }

    if (num < 1 || num > 1000) {
      setError('Number must be between 1 and 1000');
      return;
    }

    setTarget(num);
    onTargetChange(num);
  };

  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
      <label className="text-sm font-semibold text-gray-300 block mb-2">
        🎯 Search Target Value
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          value={target}
          onChange={handleChange}
          placeholder="Enter target value"
          min="1"
          max="1000"
          className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
        />
        <div className="text-center flex flex-col justify-center">
          <div className="text-xs text-gray-400">Target</div>
          <div className="text-lg font-bold text-indigo-400">{target}</div>
        </div>
      </div>
      {error && (
        <div className="mt-2 text-xs text-red-300">⚠️ {error}</div>
      )}
      <div className="mt-2 text-xs text-gray-400">
        Will search for <span className="font-semibold text-indigo-400">{target}</span> in the array
      </div>
    </div>
  );
};

export default SearchTargetInput;
