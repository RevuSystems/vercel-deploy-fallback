/**
 * CBCT Sync Endpoint
 * 
 * This API endpoint enables integration with CBCT machines and practice
 * management software for automated data synchronization.
 * 
 * Features:
 * - PRF flag detection and handling
 * - CBCT markup integration
 * - NIHB claim triggers
 * - Audit narrative overlay
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract data from the request
    const {
      patientId,
      scanData,
      teeth,
      flags,
      billingCodes,
      providerInfo,
      reasonCode,
      notes
    } = req.body;

    // Validate required fields
    if (!patientId || !scanData) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['patientId', 'scanData']
      });
    }

    // Check if this is a PRF-flagged scan
    const hasPrfFlag = flags && flags.includes('PRF');

    // Process CBCT data
    const processedData = {
      patientId,
      processedTimestamp: new Date().toISOString(),
      scanData,
      teethData: teeth || [],
      processingFlags: {
        prfDetected: hasPrfFlag,
        nihbEligible: flags && flags.includes('NIHB'),
        auditNarrativeRequired: reasonCode && ['PERIO', 'TRAUMA', 'IMPLANT'].includes(reasonCode)
      },
      billingRecommendations: processBillingCodes(billingCodes, flags),
      hasPrfFlag,
      hasNotes: !!notes
    };

    // Add to processing queue if successful
    // Note: In production, this would call a database or message queue service
    
    return res.status(200).json({
      success: true,
      message: 'CBCT data synchronized successfully',
      jobId: generateJobId(),
      processedData
    });
  } catch (error) {
    console.error('Error processing CBCT sync:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

/**
 * Process billing codes based on flags
 * @param {string[]} codes - List of billing codes
 * @param {string[]} flags - List of special processing flags
 * @returns {object} Processed billing recommendations
 */
function processBillingCodes(codes = [], flags = []) {
  const recommendations = {
    suggested: codes,
    alternative: [],
    warning: null
  };

  // If PRF flag is present, add specific recommendations
  if (flags.includes('PRF')) {
    recommendations.alternative = [...codes, '04671', '04672'];
    recommendations.warning = 'PRF detected - consider using additional codes 04671/04672';
  }

  // If NIHB flag is present, adjust recommendations
  if (flags.includes('NIHB')) {
    recommendations.alternative = [...recommendations.alternative, 'NIHB-PREDET'];
    recommendations.warning = recommendations.warning 
      ? `${recommendations.warning}; NIHB eligible - predetermination required` 
      : 'NIHB eligible - predetermination required';
  }

  return recommendations;
}

/**
 * Generate a unique job ID
 * @returns {string} Unique job ID
 */
function generateJobId() {
  return `cbct-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}