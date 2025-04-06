/**
 * Add-On Mode Configuration
 * Toggle between standalone mode and integration with external PMS systems
 */

// Default to Add-On mode for integration with Tracker or other PMS
let addOnMode = true;

/**
 * Set the application's add-on mode status
 * @param {boolean} enabled - Whether add-on mode is enabled
 */
export function setAddOnMode(enabled) {
  addOnMode = Boolean(enabled);
}

/**
 * Check if the application is running in add-on mode
 * @returns {boolean} Current add-on mode status
 */
export function isAddOnMode() {
  return addOnMode;
}