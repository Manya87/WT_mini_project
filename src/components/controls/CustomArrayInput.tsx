/**
 * CustomArrayInput.tsx
 * Allows users to input their own array values
 */

import React, { useState } from 'react';

interface CustomArrayInputProps {
  onArraySubmit: (array: number[]) => void;
  currentSize: number;
}

export const CustomArrayInput: React.FC<CustomArrayInputProps> = ({
  onArraySubmit,
  currentSize,
}) => {
  const [inputValue, setInputValue] = useState<string>(
    Array.from({ length: currentSize }, () => Math.floor(Math.random() * 100) + 1).join(', ')
  );
  const [error, setError] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Parse comma-separated values
      const values = inputValue
        .split(',')
        .map((v) => {
          const trimmed = v.trim();
          const num = Number(trimmed);
          if (!trimmed || isNaN(num)) {
            throw new Error(`Invalid number: "${trimmed}"`);
          }
          if (!Number.isInteger(num)) {
            throw new Error(`Not an integer: "${trimmed}"`);
          }
          if (num < 1 || num > 1000) {
            throw new Error(
              `Number out of range (1-1000): "${trimmed}"`
            );
          }
          return num;
        });

      if (values.length === 0) {
        throw new Error('Please enter at least one number');
      }

      if (values.length > 200) {
        throw new Error('Maximum 200 elements allowed');
      }

      onArraySubmit(values);
      setIsExpanded(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
    }
  };

  const handleExample = () => {
    const example = '5, 2, 8, 1, 9, 3, 7';
    setInputValue(example);
    setError('');
  };

  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm font-semibold text-gray-300 hover:text-white transition-colors"
      >
        <span>⌨️ Custom Array Input</span>
        <span className="text-xs text-gray-400">
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
          {/* Input field */}
          <textarea
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError('');
            }}
            placeholder="Enter numbers separated by commas (e.g., 5, 2, 8, 1, 9)"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono resize-none"
            rows={3}
          />

          {/* Helper text */}
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span>💡 Tip: Enter 1-200 integers (1-1000 each)</span>
            <button
              type="button"
              onClick={handleExample}
              className="ml-auto px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors"
            >
              Example
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="pt-2 px-2 py-1 bg-red-900 bg-opacity-30 border border-red-600 rounded text-xs text-red-300">
              ⚠️ {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded transition-colors"
            >
              Use This Array
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-semibold rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CustomArrayInput;
