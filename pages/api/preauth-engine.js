/**
 * ReVu Systems - Preauthorization Engine API
 * 
 * This endpoint handles dental insurance preauthorization requests
 * with AI-powered optimization and approval prediction.
 */

export default async function handler(req, res) {
  // Route based on HTTP method
  switch (req.method) {
    case 'GET':
      return getPreauthorization(req, res);
    case 'POST':
      return createPreauthorization(req, res);
    case 'PUT':
      return updatePreauthorization(req, res);
    default:
      return res.status(405).json({ 
        error: 'Method not allowed',
        message: 'Supported methods: GET, POST, PUT'
      });
  }
}

/**
 * Get preauthorization request
 */
async function getPreauthorization(req, res) {
  try {
    const { preauthId, patientId } = req.query;
    
    if (!preauthId && !patientId) {
      return res.status(400).json({
        error: 'Missing required parameter',
        message: 'Either preauthId or patientId is required'
      });
    }
    
    let preauthResponse;
    
    if (preauthId) {
      // In a real implementation, this would fetch from a database by ID
      preauthResponse = {
        id: preauthId,
        patientId: 'P12345',
        insuranceId: 'INS789',
        status: 'pending',
        createdAt: '2025-04-01T10:30:00Z',
        updatedAt: '2025-04-01T10:30:00Z',
        procedures: [
          {
            code: 'D2740',
            description: 'Crown - porcelain/ceramic',
            toothNumber: '30',
            fee: 1200.00,
            narrativeJustification: 'Extensive decay requiring full coverage restoration'
          }
        ],
        diagnosis: 'Extensive caries',
        attachments: ['xray-123.jpg', 'photo-456.jpg'],
        readinessScore: 85,
        aiAnalysis: {
          approvalProbability: 0.78,
          missingElements: ['periodontal charting'],
          improvementSuggestions: [
            'Include full series radiographs',
            'Document previous restoration attempts'
          ]
        }
      };
    } else {
      // In a real implementation, this would fetch from a database by patient ID
      preauthResponse = [
        {
          id: 'PRE-001',
          patientId: patientId,
          insuranceId: 'INS789',
          status: 'pending',
          createdAt: '2025-04-01T10:30:00Z',
          updatedAt: '2025-04-01T10:30:00Z',
          procedures: [
            {
              code: 'D2740',
              description: 'Crown - porcelain/ceramic',
              toothNumber: '30',
              fee: 1200.00
            }
          ],
          readinessScore: 85
        },
        {
          id: 'PRE-002',
          patientId: patientId,
          insuranceId: 'INS789',
          status: 'approved',
          createdAt: '2025-03-15T14:45:00Z',
          updatedAt: '2025-03-16T09:20:00Z',
          procedures: [
            {
              code: 'D2950',
              description: 'Core buildup, including any pins when required',
              toothNumber: '19',
              fee: 350.00
            }
          ],
          readinessScore: 95
        }
      ];
    }
    
    return res.status(200).json({
      success: true,
      data: preauthResponse
    });
  } catch (error) {
    console.error('Error retrieving preauthorization:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

/**
 * Create a new preauthorization request
 */
async function createPreauthorization(req, res) {
  try {
    const { 
      patientId,
      insuranceId,
      procedures,
      diagnosis,
      attachments,
      narrativeJustification
    } = req.body;
    
    // Validate required fields
    if (!patientId || !insuranceId || !procedures || procedures.length === 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Required fields: patientId, insuranceId, procedures (at least one)'
      });
    }
    
    // Generate unique ID for the preauth
    const preauthId = `PRE-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    // Get insurance info (in production, this would come from a database)
    const insurance = {
      id: insuranceId,
      name: 'Delta Dental',
      planType: 'PPO',
      annualMaximum: 1500,
      coverageLevels: {
        diagnostic: 100,
        preventive: 100,
        basic: 80,
        major: 50
      },
      waitingPeriods: {
        basic: 0,
        major: 3 // months
      },
      requiresPrecertificationFor: ['D2740', 'D2950', 'D3330', 'D4341']
    };
    
    // Calculate readiness score
    const readinessScore = calculateReadinessScore({
      patientId,
      insuranceId,
      procedures,
      diagnosis,
      attachments,
      narrativeJustification
    }, insurance);
    
    // Generate AI analysis
    const aiAnalysis = generateAIAnalysis({
      patientId,
      insuranceId,
      procedures,
      diagnosis,
      attachments,
      narrativeJustification
    }, insurance, readinessScore);
    
    // Create new preauth object
    const newPreauth = {
      id: preauthId,
      patientId,
      insuranceId,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      procedures,
      diagnosis,
      attachments: attachments || [],
      narrativeJustification,
      readinessScore,
      aiAnalysis
    };
    
    // In a real implementation, this would save to a database
    console.log('Creating new preauthorization request:', newPreauth);
    
    // Process the preauth if readiness score is high enough (async, non-blocking)
    if (readinessScore >= 80) {
      processPreauthorization(preauthId).catch(err => {
        console.error('Error processing preauthorization:', err);
      });
    }
    
    return res.status(201).json({
      success: true,
      data: newPreauth,
      message: readinessScore >= 80 
        ? 'Preauthorization created and processing initiated.'
        : 'Preauthorization created in draft status. Please address recommended improvements before submission.'
    });
  } catch (error) {
    console.error('Error creating preauthorization:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

/**
 * Update an existing preauthorization request
 */
async function updatePreauthorization(req, res) {
  try {
    const { 
      id,
      procedures,
      diagnosis,
      attachments,
      narrativeJustification,
      status
    } = req.body;
    
    if (!id) {
      return res.status(400).json({
        error: 'Missing preauth ID',
        message: 'Preauthorization ID is required for updates'
      });
    }
    
    // In a real implementation, this would fetch the existing preauth
    // For demonstration, we'll simulate a preauth object
    let existingPreauth = {
      id,
      patientId: 'P12345',
      insuranceId: 'INS789',
      status: 'draft',
      createdAt: '2025-04-01T10:30:00Z',
      updatedAt: '2025-04-01T10:30:00Z',
      procedures: [
        {
          code: 'D2740',
          description: 'Crown - porcelain/ceramic',
          toothNumber: '30',
          fee: 1200.00
        }
      ],
      diagnosis: 'Extensive caries',
      attachments: ['xray-123.jpg'],
      narrativeJustification: 'Previous restoration failed',
      readinessScore: 70
    };
    
    // Update the preauth with new values
    const updatedPreauth = {
      ...existingPreauth,
      procedures: procedures || existingPreauth.procedures,
      diagnosis: diagnosis || existingPreauth.diagnosis,
      attachments: attachments || existingPreauth.attachments,
      narrativeJustification: narrativeJustification || existingPreauth.narrativeJustification,
      status: status || existingPreauth.status,
      updatedAt: new Date().toISOString()
    };
    
    // Get insurance info (in production, this would come from a database)
    const insurance = {
      id: existingPreauth.insuranceId,
      name: 'Delta Dental',
      planType: 'PPO',
      annualMaximum: 1500,
      coverageLevels: {
        diagnostic: 100,
        preventive: 100,
        basic: 80,
        major: 50
      },
      waitingPeriods: {
        basic: 0,
        major: 3 // months
      },
      requiresPrecertificationFor: ['D2740', 'D2950', 'D3330', 'D4341']
    };
    
    // Recalculate readiness score
    updatedPreauth.readinessScore = calculateReadinessScore(updatedPreauth, insurance);
    
    // Regenerate AI analysis
    updatedPreauth.aiAnalysis = generateAIAnalysis(updatedPreauth, insurance, updatedPreauth.readinessScore);
    
    // Process if status changed to 'submitted' and readiness score is sufficient
    if (status === 'submitted' && updatedPreauth.readinessScore >= 80) {
      processPreauthorization(id).catch(err => {
        console.error('Error processing preauthorization:', err);
      });
    }
    
    console.log('Updating preauthorization:', updatedPreauth);
    
    return res.status(200).json({
      success: true,
      data: updatedPreauth,
      message: status === 'submitted'
        ? 'Preauthorization updated and submitted for processing.'
        : 'Preauthorization updated successfully.'
    });
  } catch (error) {
    console.error('Error updating preauthorization:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

/**
 * Process a preauthorization request
 * @param {string} preauthId - The ID of the preauth to process
 */
async function processPreauthorization(preauthId) {
  console.log(`Processing preauthorization ${preauthId}...`);
  
  // In a real implementation, this would:
  // 1. Fetch the full preauth data from the database
  // 2. Generate and compile documentation
  // 3. Submit to insurance via API or generate a submission package
  // 4. Update the status based on submission result
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log(`Preauthorization ${preauthId} processed and submitted to insurance.`);
  
  return true;
}

/**
 * Calculate submission readiness score
 * @param {Object} preauth - The preauthorization request
 * @param {Object} insurance - The insurance information
 * @returns {number} Readiness score from 0 to 100
 */
function calculateReadinessScore(preauth, insurance) {
  let score = 0;
  let maxScore = 0;
  
  // Check if all required procedures are documented
  if (preauth.procedures && preauth.procedures.length > 0) {
    score += 30;
    maxScore += 30;
    
    // Verify all procedures have required fields
    const proceduresComplete = preauth.procedures.every(proc => 
      proc.code && proc.toothNumber && proc.fee);
    
    if (proceduresComplete) {
      score += 10;
    }
    maxScore += 10;
  }
  
  // Check if diagnosis is provided
  if (preauth.diagnosis && preauth.diagnosis.length > 10) {
    score += 15;
  }
  maxScore += 15;
  
  // Check if any attachments are included
  if (preauth.attachments && preauth.attachments.length > 0) {
    score += 20;
    
    // Additional points for multiple attachments (radiographs, intraoral photos, etc.)
    if (preauth.attachments.length >= 3) {
      score += 10;
    } else {
      score += 5;
    }
  }
  maxScore += 30;
  
  // Check if narrative justification is provided for procedures that typically need it
  const needsNarrative = preauth.procedures.some(proc => 
    ['D2740', 'D2950', 'D3330', 'D4341', 'D4342', 'D6010'].includes(proc.code));
  
  if (needsNarrative) {
    if (preauth.narrativeJustification && preauth.narrativeJustification.length > 30) {
      score += 15;
    }
    maxScore += 15;
  }
  
  // Normalize score to 0-100 scale
  return Math.round((score / maxScore) * 100);
}

/**
 * Generate AI analysis for preauthorization
 * @param {Object} preauth - The preauthorization request
 * @param {Object} insurance - The insurance information
 * @param {number} readinessScore - The readiness score
 * @returns {Object} AI analysis
 */
function generateAIAnalysis(preauth, insurance, readinessScore) {
  // Calculate approval probability
  const approvalProbability = calculateApprovalProbability(preauth, readinessScore);
  
  // Identify missing elements
  const missingElements = [];
  
  if (!preauth.diagnosis || preauth.diagnosis.length < 10) {
    missingElements.push('comprehensive diagnosis');
  }
  
  if (!preauth.attachments || preauth.attachments.length === 0) {
    missingElements.push('radiographic evidence');
  } else if (preauth.attachments.length < 2) {
    missingElements.push('additional supporting images');
  }
  
  const needsNarrative = preauth.procedures.some(proc => 
    ['D2740', 'D2950', 'D3330', 'D4341', 'D4342', 'D6010'].includes(proc.code));
  
  if (needsNarrative && (!preauth.narrativeJustification || preauth.narrativeJustification.length < 30)) {
    missingElements.push('detailed narrative justification');
  }
  
  // Generate improvement suggestions
  let improvementSuggestions = [];
  
  if (missingElements.includes('comprehensive diagnosis')) {
    improvementSuggestions.push('Add detailed clinical findings to support necessity of treatment');
  }
  
  if (missingElements.includes('radiographic evidence')) {
    improvementSuggestions.push('Include periapical radiographs showing pathology');
  } else if (missingElements.includes('additional supporting images')) {
    improvementSuggestions.push('Add intraoral photographs to support diagnosis');
  }
  
  if (missingElements.includes('detailed narrative justification')) {
    improvementSuggestions.push('Provide specific justification for why this procedure is necessary');
  }
  
  // Check for insurance-specific requirements
  if (preauth.procedures.some(proc => insurance.requiresPrecertificationFor.includes(proc.code))) {
    if (!improvementSuggestions.includes('Include full series radiographs')) {
      improvementSuggestions.push('Include full series radiographs - required by this insurance for selected procedure');
    }
  }
  
  // Generate alternative coverage suggestions
  let alternativeCoverageSuggestions = [];
  
  // Check if any procedures might have better alternatives for coverage
  for (const proc of preauth.procedures) {
    // Example: Suggest alternative to porcelain crown if insurance covers amalgam better
    if (proc.code === 'D2740' && insurance.coverageLevels.major < 70) {
      alternativeCoverageSuggestions.push(
        'Consider D2160 (Amalgam - 3 surfaces) which may have better coverage under this plan'
      );
    }
    
    // Example: Suggest alternative to bone graft if not well covered
    if (proc.code === 'D4263' && insurance.coverageLevels.major < 60) {
      alternativeCoverageSuggestions.push(
        'D4263 (Bone replacement graft) may have limited coverage - consider documenting medical necessity'
      );
    }
  }
  
  return {
    approvalProbability,
    missingElements,
    improvementSuggestions,
    alternativeCoverageSuggestions,
    estimatedProcessingTime: '3-5 business days',
    recommendedSubmissionMethod: readinessScore >= 90 ? 'electronic' : 'paper with supporting documentation',
    generatedAt: new Date().toISOString()
  };
}

/**
 * Calculate approval probability
 * @param {Object} preauth - The preauthorization request
 * @param {number} readinessScore - The readiness score
 * @returns {number} Approval probability from 0 to 1
 */
function calculateApprovalProbability(preauth, readinessScore) {
  // Base probability on readiness score
  let probability = readinessScore / 100 * 0.7; // 70% weight for readiness
  
  // Adjust based on procedure types
  const hasMajorProcedures = preauth.procedures.some(proc => 
    ['D2740', 'D2950', 'D3330', 'D4341', 'D4342', 'D6010'].includes(proc.code));
  
  if (hasMajorProcedures) {
    probability *= 0.9; // Major procedures have slightly lower approval rates
  }
  
  // Adjust based on documentation
  if (preauth.attachments && preauth.attachments.length >= 3) {
    probability *= 1.1; // Comprehensive documentation increases chances
    probability = Math.min(probability, 0.95); // Cap at 95%
  }
  
  return parseFloat(probability.toFixed(2));
}