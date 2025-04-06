/**
 * ReVu Systems - Code Flow Map Page
 * 
 * This page displays the interactive Code Flow Visualizer component
 * for dental billing codes and their relationships.
 */

import React, { useState } from 'react';
import CodeFlowMap from '../components/CodeFlowMap';

export default function CodeFlowMapPage() {
  const [theme, setTheme] = useState('light');
  const [showRelationships, setShowRelationships] = useState(true);
  const [highlightConflicts, setHighlightConflicts] = useState(true);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ReVu Billing Code Visualizer</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Visualize dental procedure codes, relationships, and identify potential conflicts
        </p>
      </header>
      
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">About This Tool</h2>
        <p className="mb-4">
          The Code Flow Visualizer helps you understand complex billing patterns,
          identify potential conflicts, and optimize your coding strategy.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            className={`px-4 py-2 rounded-md ${
              theme === 'light'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setTheme('light')}
          >
            Light Mode
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              theme === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setTheme('dark')}
          >
            Dark Mode
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              showRelationships
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setShowRelationships(!showRelationships)}
          >
            {showRelationships ? 'Hide' : 'Show'} Relationships
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              highlightConflicts
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setHighlightConflicts(!highlightConflicts)}
          >
            {highlightConflicts ? 'Hide' : 'Show'} Conflicts
          </button>
        </div>
      </div>
      
      <CodeFlowMap 
        theme={theme}
        showRelationships={showRelationships}
        highlightConflicts={highlightConflicts}
      />
      
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Using This Visualizer</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Click on any code to see its details and relationships</li>
          <li>Toggle the relationship view to understand how codes are connected</li>
          <li>Use the conflict detection to avoid potential billing issues</li>
          <li>Export your findings for team review or claim submission</li>
        </ul>
      </div>
    </div>
  );
}