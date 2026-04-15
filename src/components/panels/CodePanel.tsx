/**
 * CodePanel.tsx
 * Displays pseudocode with highlighted current line
 */

import React from 'react';
import { AlgorithmComplexity } from '../../types/AlgorithmFrame';

interface CodePanelProps {
  pseudocode: string[];
  currentLine: number;
  complexity: AlgorithmComplexity;
  algorithmName: string;
}

const ComplexityBadge: React.FC<{ label?: string; value: string; tier: 'fast' | 'medium' | 'slow' }> = ({
  value,
  tier,
}) => {
  const tierClass = {
    fast: 'complexity-fast',
    medium: 'complexity-medium',
    slow: 'complexity-slow',
  }[tier];

  return (
    <div className={`complexity-chip ${tierClass}`}>
      <span className="font-mono">{value}</span>
    </div>
  );
};

function getTier(complexity: string): 'fast' | 'medium' | 'slow' {
  if (complexity.includes('log')) return 'fast';
  if (complexity.includes('n²')) return 'slow';
  if (complexity.includes('n')) return 'medium';
  return 'medium';
}

export const CodePanel: React.FC<CodePanelProps> = ({
  pseudocode,
  currentLine,
  complexity,
  algorithmName,
}) => {
  return (
    <div className="flex flex-col h-full gap-4 bg-gray-900 rounded-lg p-6 border border-gray-700">
      {/* Header */}
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-white mb-2">{algorithmName}</h2>

        {/* Time Complexity */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
            Time Complexity
          </p>
          <div className="flex gap-2 flex-wrap">
            <ComplexityBadge
              label="Best"
              value={complexity.time.best}
              tier={getTier(complexity.time.best)}
            />
            <ComplexityBadge
              label="Avg"
              value={complexity.time.average}
              tier={getTier(complexity.time.average)}
            />
            <ComplexityBadge
              label="Worst"
              value={complexity.time.worst}
              tier={getTier(complexity.time.worst)}
            />
          </div>
        </div>

        {/* Space Complexity */}
        <div>
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
            Space Complexity
          </p>
          <div className="flex gap-2">
            <ComplexityBadge
              label="Space"
              value={complexity.space}
              tier={getTier(complexity.space)}
            />
          </div>
        </div>
      </div>

      {/* Pseudocode */}
      <div className="flex-1 overflow-auto">
        <pre className="font-mono text-sm">
          {pseudocode.map((line, index) => (
            <div
              key={index}
              className={`px-4 py-1 transition-all ${
                index === currentLine
                  ? 'bg-yellow-900 bg-opacity-50 text-yellow-200 border-l-4 border-yellow-400'
                  : 'text-gray-300 border-l-4 border-transparent'
              }`}
            >
              <span className="text-gray-500 mr-4 inline-block w-6 text-right">
                {index}
              </span>
              <span>{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CodePanel;
