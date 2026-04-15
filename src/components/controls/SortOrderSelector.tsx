/**
 * SortOrderSelector.tsx
 * Allows users to choose sort direction (ascending/descending)
 */

import React from 'react';

interface SortOrderSelectorProps {
  order: 'ascending' | 'descending';
  onOrderChange: (order: 'ascending' | 'descending') => void;
}

export const SortOrderSelector: React.FC<SortOrderSelectorProps> = ({
  order,
  onOrderChange,
}) => {
  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
      <label className="text-sm font-semibold text-gray-300 block mb-2">
        📊 Sort Order
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => onOrderChange('ascending')}
          className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
            order === 'ascending'
              ? 'bg-indigo-600 text-white border-indigo-500 border'
              : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
          }`}
        >
          ⬆️ Ascending
        </button>
        <button
          onClick={() => onOrderChange('descending')}
          className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
            order === 'descending'
              ? 'bg-indigo-600 text-white border-indigo-500 border'
              : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
          }`}
        >
          ⬇️ Descending
        </button>
      </div>
    </div>
  );
};

export default SortOrderSelector;
