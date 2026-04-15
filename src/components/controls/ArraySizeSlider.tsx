/**
 * ArraySizeSlider.tsx
 * Controls input array size (10-200)
 */

import React from 'react';

interface ArraySizeSliderProps {
  size: number;
  onSizeChange: (size: number) => void;
  min?: number;
  max?: number;
}

export const ArraySizeSlider: React.FC<ArraySizeSliderProps> = ({
  size,
  onSizeChange,
  min = 10,
  max = 200,
}) => {
  return (
    <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg border border-gray-700">
      <label className="text-sm font-semibold text-gray-300 whitespace-nowrap">
        Array Size:
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="flex-1 cursor-pointer"
      />
      <span className="text-sm font-mono text-indigo-400 w-12 text-center">
        {size}
      </span>
    </div>
  );
};

export default ArraySizeSlider;
