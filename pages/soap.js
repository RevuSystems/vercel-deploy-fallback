/**
 * ReVu Systems - SOAP Notes Dashboard
 * 
 * This page provides an interface for viewing and managing SOAP notes.
 */

import React, { useState, useEffect } from 'react';

export default function SoapNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState('P12345');
  const [viewMode, setViewMode] = useState('list');
  const [selectedNote, setSelectedNote] = useState(null);
  
  // Fetch SOAP notes when the component mounts or patientId changes
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        // In production, this would fetch from the actual API
        // For demo purposes, using static data
        const demoNotes = [
          {
            id: 'note1',
            patientId: 'P12345',
            date: '2025-04-01T10:30:00Z',
            provider: 'Dr. Smith',
            subjective: 'Patient reports moderate pain in lower right quadrant. Pain began 3 days ago and has been increasing in intensity.',
            objective: 'Temperature: 98.6°F, BP: 120/80, Pulse: 72, Dental exam reveals inflammation around tooth #30.',
            assessment: 'Acute periapical periodontitis on tooth #30.',
            plan: 'Prescribe antibiotics (amoxicillin 500mg TID for 7 days). Schedule for root canal therapy next week.',
            aiEnhancements: {
              clinicalSuggestions: [
                'Consider CBCT imaging to evaluate extent of periapical lesion',
                'Evaluate adjacent teeth for referred pain'
              ],
              billingSuggestions: [
                'Code D0220 (periapical radiograph) can be billed with today\'s exam',
                'Root canal therapy (D3330) likely to be needed at next appointment'
              ],
              followUpSuggestions: [
                'Schedule 7-day antibiotic check',
                'Evaluate for pain reduction in 48 hours'
              ]
            }
          },
          {
            id: 'note2',
            patientId: 'P12345',
            date: '2025-03-15T14:45:00Z',
            provider: 'Dr. Johnson',
            subjective: 'Patient presents for regular 6-month checkup. No complaints or concerns reported.',
            objective: 'Full mouth exam reveals healthy gingiva, no caries detected. Previous restorations intact.',
            assessment: 'Healthy dentition with excellent oral hygiene.',
            plan: 'Continue current oral hygiene regimen. Schedule next 6-month recall.',
            aiEnhancements: {
              clinicalSuggestions: [
                'Consider fluoride varnish application as preventive measure'
              ],
              billingSuggestions: [
                'Preventive services D1110 and D0120 appropriate for today\'s visit'
              ],
              followUpSuggestions: [
                'Remind patient about 6-month recall'
              ]
            }
          }
        ];
        
        setNotes(demoNotes);
      } catch (error) {
        console.error('Error fetching SOAP notes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotes();
  }, [patientId]);
  
  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setViewMode('detail');
  };
  
  const handleBackToList = () => {
    setSelectedNote(null);
    setViewMode('list');
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SOAP Notes</h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage clinical documentation with AI-enhanced insights
        </p>
      </header>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : viewMode === 'list' ? (
        <>
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
            <div className="flex items-center">
              <label htmlFor="patientId" className="mr-2">Patient ID:</label>
              <input
                type="text"
                id="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="px-2 py-1 border rounded"
              />
              <button 
                className="ml-4 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setPatientId(patientId)}
              >
                Refresh
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Notes ({notes.length})</h2>
            {notes.length === 0 ? (
              <p className="text-gray-500">No SOAP notes found for this patient.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note) => (
                  <div 
                    key={note.id}
                    className="border rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                    onClick={() => handleSelectNote(note)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{formatDate(note.date)}</h3>
                      <span className="text-sm text-gray-500">{note.provider}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <strong>Assessment:</strong> {note.assessment}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                      <strong>Plan:</strong> {note.plan}
                    </p>
                    <div className="mt-3 flex items-center text-blue-600 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">AI insights available</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <button 
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => alert('New SOAP note feature would open here')}
            >
              New SOAP Note
            </button>
          </div>
        </>
      ) : (
        <div className="note-detail">
          <button 
            className="mb-6 px-4 py-1 flex items-center text-blue-600 hover:text-blue-800"
            onClick={handleBackToList}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to List
          </button>
          
          <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{formatDate(selectedNote.date)}</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {selectedNote.provider}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400">Subjective</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedNote.subjective}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400">Objective</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedNote.objective}</p>
                </div>
              </div>
              
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400">Assessment</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedNote.assessment}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400">Plan</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedNote.plan}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI-Enhanced Insights
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Clinical Suggestions</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedNote.aiEnhancements.clinicalSuggestions.map((suggestion, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{suggestion}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Billing Suggestions</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedNote.aiEnhancements.billingSuggestions.map((suggestion, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{suggestion}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Follow-Up Suggestions</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedNote.aiEnhancements.followUpSuggestions.map((suggestion, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => alert('Edit SOAP note feature would open here')}
            >
              Edit Note
            </button>
            <button 
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={() => alert('Generate report feature would open here')}
            >
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}