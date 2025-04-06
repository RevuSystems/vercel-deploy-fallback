/**
 * ReVu Systems - Code Flow Visualizer Component
 * 
 * This component provides an interactive visualization of dental procedure codes,
 * their relationships, and billing flows. It helps users understand complex billing
 * patterns and optimize coding strategies.
 */

import React, { useEffect, useState, useRef } from 'react';

export default function CodeFlowMap({ 
  initialCodes = [],
  showRelationships = true,
  highlightConflicts = true,
  interactive = true,
  theme = 'light'
}) {
  const containerRef = useRef(null);
  const [codes, setCodes] = useState(initialCodes);
  const [relationships, setRelationships] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCode, setSelectedCode] = useState(null);
  
  // Fetch code data when component mounts
  useEffect(() => {
    if (initialCodes.length === 0) {
      fetchCommonCodes();
    } else {
      setLoading(false);
    }
    
    if (showRelationships) {
      fetchRelationships();
    }
    
    if (highlightConflicts) {
      identifyConflicts();
    }
  }, [initialCodes, showRelationships, highlightConflicts]);
  
  // Set up visualization when data is ready
  useEffect(() => {
    if (!loading && containerRef.current) {
      renderVisualization();
    }
  }, [loading, codes, relationships, conflicts, selectedCode, theme]);
  
  /**
   * Fetch common dental procedure codes
   */
  const fetchCommonCodes = async () => {
    try {
      // In a real app, this would fetch from an API
      // For demo, we'll use example data
      const exampleCodes = [
        { 
          code: 'D0120', 
          description: 'Periodic oral evaluation', 
          category: 'Diagnostic',
          frequency: 'Twice per year',
          avgCost: 65
        },
        { 
          code: 'D0274', 
          description: 'Bitewings - four films', 
          category: 'Diagnostic',
          frequency: 'Once per year',
          avgCost: 85
        },
        { 
          code: 'D1110', 
          description: 'Prophylaxis - adult', 
          category: 'Preventive',
          frequency: 'Twice per year',
          avgCost: 110
        },
        { 
          code: 'D2150', 
          description: 'Amalgam - two surfaces', 
          category: 'Restorative',
          frequency: 'As needed',
          avgCost: 195
        },
        { 
          code: 'D2740', 
          description: 'Crown - porcelain/ceramic', 
          category: 'Restorative',
          frequency: 'Once per 5 years per tooth',
          avgCost: 1250
        }
      ];
      
      setCodes(exampleCodes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching codes:', error);
      setLoading(false);
    }
  };
  
  /**
   * Fetch code relationships
   */
  const fetchRelationships = async () => {
    try {
      // In a real app, this would fetch from an API
      // For demo, we'll use example data
      const exampleRelationships = [
        { 
          source: 'D0120', 
          target: 'D0274', 
          type: 'commonly-paired', 
          strength: 0.85
        },
        { 
          source: 'D0120', 
          target: 'D1110', 
          type: 'commonly-paired', 
          strength: 0.92
        },
        { 
          source: 'D2150', 
          target: 'D2740', 
          type: 'progression', 
          strength: 0.45
        }
      ];
      
      setRelationships(exampleRelationships);
    } catch (error) {
      console.error('Error fetching relationships:', error);
    }
  };
  
  /**
   * Identify potential code conflicts
   */
  const identifyConflicts = async () => {
    try {
      // In a real app, this would use an intelligent algorithm
      // For demo, we'll use example data
      const exampleConflicts = [
        { 
          codes: ['D2150', 'D2740'], 
          description: 'Cannot bill amalgam and crown on same tooth on same day',
          severity: 'high'
        }
      ];
      
      setConflicts(exampleConflicts);
    } catch (error) {
      console.error('Error identifying conflicts:', error);
    }
  };
  
  /**
   * Handle code selection
   */
  const handleCodeSelect = (code) => {
    if (!interactive) return;
    setSelectedCode(code === selectedCode ? null : code);
  };
  
  /**
   * Render the visualization
   */
  const renderVisualization = () => {
    // In a real app, this would use D3.js or a similar library
    // For demo, we'll simulate a visualization with HTML/CSS
    
    // Clean container
    if (containerRef.current) {
      // Rendering logic would go here in a real implementation
      // For now, we're just using basic HTML structure
    }
  };
  
  /**
   * Get the color for a code category
   */
  const getCategoryColor = (category) => {
    const colors = {
      'Diagnostic': '#4F46E5', // Indigo
      'Preventive': '#10B981', // Emerald
      'Restorative': '#F59E0B', // Amber
      'Periodontics': '#EC4899', // Pink
      'Oral Surgery': '#EF4444', // Red
      'Endodontics': '#8B5CF6', // Purple
      'Prosthodontics': '#3B82F6', // Blue
    };
    
    return colors[category] || '#6B7280'; // Gray default
  };
  
  /**
   * Get CSS class based on theme
   */
  const getThemeClass = () => {
    return theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  };
  
  return (
    <div className={`code-flow-map-container ${getThemeClass()} p-4 rounded-lg shadow-lg`}>
      <h2 className="text-2xl font-bold mb-4">Procedure Code Flow Visualizer</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Code List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {codes.map((code) => (
              <div 
                key={code.code}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all
                  ${selectedCode === code.code ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}
                  ${getThemeClass()}
                `}
                style={{ 
                  borderLeft: `4px solid ${getCategoryColor(code.category)}`,
                  backgroundColor: selectedCode === code.code 
                    ? (theme === 'dark' ? '#1E293B' : '#F3F4F6') 
                    : (theme === 'dark' ? '#111827' : 'white')
                }}
                onClick={() => handleCodeSelect(code.code)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{code.code}</h3>
                  <span className="text-sm px-2 py-1 rounded"
                        style={{ backgroundColor: getCategoryColor(code.category), color: 'white' }}>
                    {code.category}
                  </span>
                </div>
                <p className="mt-2">{code.description}</p>
                <div className="mt-4 text-sm grid grid-cols-2 gap-2">
                  <div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Frequency:</span>
                    <p>{code.frequency}</p>
                  </div>
                  <div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Avg. Cost:</span>
                    <p>${code.avgCost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Relationships Visualization */}
          {showRelationships && relationships.length > 0 && (
            <div className="mb-8 p-4 border rounded-lg">
              <h3 className="text-xl font-bold mb-4">Code Relationships</h3>
              <div className="overflow-x-auto">
                <div className="relationship-diagram min-w-[600px] h-[300px] relative" ref={containerRef}>
                  {/* This would be replaced with actual D3.js visualization */}
                  <div className="text-center p-8">
                    <p className="mb-4">Relationship visualization would be rendered here</p>
                    <p className="text-sm text-gray-500">
                      Example: Found {relationships.length} relationships between codes
                    </p>
                    <ul className="mt-4 text-left max-w-md mx-auto">
                      {relationships.map((rel, index) => (
                        <li key={index} className="mb-2 p-2 rounded bg-opacity-10"
                            style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6' }}>
                          <strong>{rel.source}</strong> → <strong>{rel.target}</strong>: {rel.type} 
                          (strength: {(rel.strength * 100).toFixed(0)}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Conflicts */}
          {highlightConflicts && conflicts.length > 0 && (
            <div className="p-4 border border-red-300 rounded-lg bg-red-50 text-red-900 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-100">
              <h3 className="text-xl font-bold mb-4">Potential Conflicts</h3>
              <ul className="space-y-2">
                {conflicts.map((conflict, index) => (
                  <li key={index} className="p-3 rounded bg-red-100 dark:bg-red-900 dark:bg-opacity-30">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">
                        Conflict: {conflict.codes.join(' + ')}
                      </span>
                    </div>
                    <p>{conflict.description}</p>
                    {conflict.severity === 'high' && (
                      <span className="mt-2 inline-block px-2 py-1 text-xs rounded bg-red-200 text-red-800 dark:bg-red-800 dark:bg-opacity-50 dark:text-red-100">
                        High Severity
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}