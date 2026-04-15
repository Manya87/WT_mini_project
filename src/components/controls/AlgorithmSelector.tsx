/**
 * AlgorithmSelector.tsx
 * Dropdown/button selector for algorithms by category
 */

import React, { useState } from 'react';

export interface AlgorithmOption {
  id: string;
  name: string;
  category: 'sorting' | 'searching' | 'graph' | 'pathfinding';
}

interface AlgorithmSelectorProps {
  algorithms: AlgorithmOption[];
  selectedAlgorithmId: string;
  onSelect: (algorithmId: string) => void;
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  algorithms,
  selectedAlgorithmId,
  onSelect,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    'sorting'
  );

  const categories = Array.from(
    new Set(algorithms.map((a) => a.category))
  ).sort();

  const groupedAlgorithms: Record<string, AlgorithmOption[]> = {};
  for (const category of categories) {
    groupedAlgorithms[category] = algorithms.filter((a) => a.category === category);
  }

  const categoryIcons: Record<string, string> = {
    sorting: '📊',
    searching: '🔍',
    graph: '📈',
    pathfinding: '🗺️',
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-900 p-4 rounded-lg border border-gray-700">
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
        Algorithms
      </h3>

      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <div key={category}>
            <button
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category ? null : category
                )
              }
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-sm font-semibold text-gray-200"
            >
              <span>
                {categoryIcons[category as keyof typeof categoryIcons]} {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <span className="text-xs text-gray-400">
                {expandedCategory === category ? '▼' : '▶'}
              </span>
            </button>

            {expandedCategory === category && (
              <div className="flex flex-col gap-1 mt-1 ml-2">
                {groupedAlgorithms[category].map((algo) => (
                  <button
                    key={algo.id}
                    onClick={() => onSelect(algo.id)}
                    className={`algorithm-button w-full text-left text-sm py-2 px-3 rounded ${
                      selectedAlgorithmId === algo.id
                        ? 'active'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {algo.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
