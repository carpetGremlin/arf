/**
 * Environment utilities for configuration and detection
 */

/**
 * Get the current environment mode
 */
export function getEnvironmentMode() {
  return process.env.NODE_ENV || 'development';
}

/**
 * Check if the application is running in production environment
 */
export function isProduction() {
  return getEnvironmentMode() === 'production';
}

/**
 * Check if the application is running in development environment
 */
export function isDevelopment() {
  return getEnvironmentMode() === 'development';
}

/**
 * Check if the application is running in test environment
 */
export function isTest() {
  return getEnvironmentMode() === 'test';
}

/**
 * Check if application is in maintenance mode
 */
export function isMaintenanceMode() {
  return process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
}

/**
 * Get base URL for the application (for use in absolute URLs)
 */
export function getBaseUrl() {
  // Use deployment URL in production
  if (isProduction()) {
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://ari.render.com';
  }
  
  // Use localhost in development
  return 'http://localhost:3000';
}

/**
 * Format API URL path
 */
export function formatApiUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const apiPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}/api${apiPath}`;
}

/**
 * Get public debug mode
 */
export function isDebugMode() {
  return process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';
}

/**
 * Check required environment variables and throw error if missing
 */
export function checkRequiredEnvVars(envVars: string[]): void {
  const missing = envVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
} 