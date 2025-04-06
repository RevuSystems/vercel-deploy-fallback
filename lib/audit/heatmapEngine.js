/**
 * Audit Heatmap Engine
 * Generates heatmap data for visualizing risk patterns in billing data
 */

import { calculateRiskScore } from './helpers';

/**
 * Generate heatmap data from claims
 * @param {Array} claims - Array of claims to analyze
 * @param {Object} options - Configuration options
 * @returns {Object} Heatmap data structure
 */
export function generateHeatmap(claims, options = {}) {
  if (!claims || !Array.isArray(claims) || claims.length === 0) {
    return {
      cells: [],
      maxValue: 0,
      totalClaims: 0,
      averageRisk: 0
    };
  }
  
  // Default options
  const config = {
    groupBy: options.groupBy || 'code', // 'code', 'date', 'provider'
    colorScale: options.colorScale || 'risk', // 'risk', 'count', 'value'
    minColor: options.minColor || '#e5f5e0', // Green for low risk
    maxColor: options.maxColor || '#ff0000', // Red for high risk
    dimensions: options.dimensions || [10, 10] // Grid size
  };
  
  // Process data based on grouping
  let groupedData = {};
  
  if (config.groupBy === 'code') {
    // Group by procedure code
    claims.forEach(claim => {
      if (!claim.codes) return;
      
      claim.codes.forEach(code => {
        if (!groupedData[code]) {
          groupedData[code] = {
            id: code,
            claims: [],
            totalValue: 0,
            count: 0,
            avgRisk: 0
          };
        }
        
        groupedData[code].claims.push(claim);
        groupedData[code].count++;
        groupedData[code].totalValue += claim.total || 0;
      });
    });
  } else if (config.groupBy === 'date') {
    // Group by date (month)
    claims.forEach(claim => {
      if (!claim.date) return;
      
      const date = new Date(claim.date);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!groupedData[month]) {
        groupedData[month] = {
          id: month,
          claims: [],
          totalValue: 0,
          count: 0,
          avgRisk: 0
        };
      }
      
      groupedData[month].claims.push(claim);
      groupedData[month].count++;
      groupedData[month].totalValue += claim.total || 0;
    });
  } else if (config.groupBy === 'provider') {
    // Group by provider
    claims.forEach(claim => {
      if (!claim.provider) return;
      
      const provider = claim.provider;
      
      if (!groupedData[provider]) {
        groupedData[provider] = {
          id: provider,
          claims: [],
          totalValue: 0,
          count: 0,
          avgRisk: 0
        };
      }
      
      groupedData[provider].claims.push(claim);
      groupedData[provider].count++;
      groupedData[provider].totalValue += claim.total || 0;
    });
  }
  
  // Calculate average risk scores for each group
  Object.keys(groupedData).forEach(key => {
    const group = groupedData[key];
    const totalRisk = group.claims.reduce((sum, claim) => sum + calculateRiskScore(claim), 0);
    group.avgRisk = group.claims.length > 0 ? totalRisk / group.claims.length : 0;
  });
  
  // Convert to array and sort by risk score
  const groupArray = Object.values(groupedData).sort((a, b) => {
    if (config.colorScale === 'risk') {
      return b.avgRisk - a.avgRisk;
    } else if (config.colorScale === 'count') {
      return b.count - a.count;
    } else {
      return b.totalValue - a.totalValue;
    }
  });
  
  // Generate heatmap cells
  const cells = groupArray.map((group, index) => {
    // Calculate position in grid
    const cols = config.dimensions[0];
    const x = index % cols;
    const y = Math.floor(index / cols);
    
    // Calculate color value based on selected scale
    let value;
    if (config.colorScale === 'risk') {
      value = group.avgRisk;
    } else if (config.colorScale === 'count') {
      value = group.count;
    } else {
      value = group.totalValue;
    }
    
    return {
      id: group.id,
      x,
      y,
      value,
      count: group.count,
      totalValue: group.totalValue,
      avgRisk: group.avgRisk,
      claims: group.claims
    };
  });
  
  // Find maximum value for color scaling
  const maxValue = cells.reduce((max, cell) => Math.max(max, cell.value), 0);
  
  // Calculate overall statistics
  const totalClaims = claims.length;
  const totalRisk = claims.reduce((sum, claim) => sum + calculateRiskScore(claim), 0);
  const averageRisk = totalClaims > 0 ? totalRisk / totalClaims : 0;
  
  return {
    cells,
    maxValue,
    totalClaims,
    averageRisk,
    config
  };
}

/**
 * Get color for a heatmap cell based on its value
 * @param {number} value - Value of the cell
 * @param {number} maxValue - Maximum value in the heatmap
 * @param {string} minColor - Color for minimum value (hex)
 * @param {string} maxColor - Color for maximum value (hex)
 * @returns {string} CSS color value
 */
export function getHeatmapColor(value, maxValue, minColor = '#e5f5e0', maxColor = '#ff0000') {
  // Convert hex colors to RGB
  const minRgb = hexToRgb(minColor);
  const maxRgb = hexToRgb(maxColor);
  
  // Calculate color ratio
  const ratio = maxValue > 0 ? value / maxValue : 0;
  
  // Interpolate RGB values
  const r = Math.round(minRgb.r + ratio * (maxRgb.r - minRgb.r));
  const g = Math.round(minRgb.g + ratio * (maxRgb.g - minRgb.g));
  const b = Math.round(minRgb.b + ratio * (maxRgb.b - minRgb.b));
  
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color string
 * @returns {Object} RGB values
 */
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Generate risk pattern analysis from heatmap data
 * @param {Object} heatmapData - Data generated by generateHeatmap
 * @returns {Array} Array of risk pattern insights
 */
export function analyzeRiskPatterns(heatmapData) {
  if (!heatmapData || !heatmapData.cells || heatmapData.cells.length === 0) {
    return [];
  }
  
  const insights = [];
  const { cells, config } = heatmapData;
  
  // Find high-risk patterns
  const highRiskThreshold = 75;
  const highRiskCells = cells.filter(cell => cell.avgRisk > highRiskThreshold);
  
  if (highRiskCells.length > 0) {
    if (config.groupBy === 'code') {
      insights.push({
        type: 'high_risk_codes',
        title: 'High-Risk Procedure Codes',
        description: `${highRiskCells.length} procedure codes have an average risk score above ${highRiskThreshold}`,
        items: highRiskCells.map(cell => ({
          id: cell.id,
          value: Math.round(cell.avgRisk),
          count: cell.count
        }))
      });
    } else if (config.groupBy === 'date') {
      insights.push({
        type: 'high_risk_periods',
        title: 'High-Risk Time Periods',
        description: `${highRiskCells.length} time periods have an average risk score above ${highRiskThreshold}`,
        items: highRiskCells.map(cell => ({
          id: cell.id,
          value: Math.round(cell.avgRisk),
          count: cell.count
        }))
      });
    } else if (config.groupBy === 'provider') {
      insights.push({
        type: 'high_risk_providers',
        title: 'High-Risk Providers',
        description: `${highRiskCells.length} providers have an average risk score above ${highRiskThreshold}`,
        items: highRiskCells.map(cell => ({
          id: cell.id,
          value: Math.round(cell.avgRisk),
          count: cell.count
        }))
      });
    }
  }
  
  // Find common patterns
  const highFrequencyThreshold = Math.max(...cells.map(cell => cell.count)) * 0.7;
  const highFrequencyCells = cells.filter(cell => cell.count > highFrequencyThreshold);
  
  if (highFrequencyCells.length > 0) {
    insights.push({
      type: 'high_frequency',
      title: 'High-Frequency Patterns',
      description: `${highFrequencyCells.length} items appear with very high frequency`,
      items: highFrequencyCells.map(cell => ({
        id: cell.id,
        value: cell.count,
        risk: Math.round(cell.avgRisk)
      }))
    });
  }
  
  // Find valuable patterns
  const highValueThreshold = Math.max(...cells.map(cell => cell.totalValue)) * 0.7;
  const highValueCells = cells.filter(cell => cell.totalValue > highValueThreshold);
  
  if (highValueCells.length > 0) {
    insights.push({
      type: 'high_value',
      title: 'High-Value Patterns',
      description: `${highValueCells.length} items represent significant financial value`,
      items: highValueCells.map(cell => ({
        id: cell.id,
        value: Math.round(cell.totalValue),
        risk: Math.round(cell.avgRisk)
      }))
    });
  }
  
  return insights;
}