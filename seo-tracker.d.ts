/**
 * TypeScript definitions for SEO Tracker
 * Version 1.0.0
 */

export interface SEOTrackerConfig {
  /**
   * API endpoint URL where tracking data will be sent
   * @required
   * @example 'https://your-domain.com/api/tracking'
   */
  apiUrl: string;

  /**
   * Project ID from your admin dashboard
   * @required
   * @example 'uuid-string-from-dashboard'
   */
  projectId: string;

  /**
   * Enable debug logging to console
   * @default false
   */
  debug?: boolean;

  /**
   * Enable automatic click tracking
   * @default true
   */
  trackClicks?: boolean;

  /**
   * Enable automatic scroll depth tracking
   * @default true
   */
  trackScroll?: boolean;

  /**
   * Enable automatic tab visibility tracking
   * @default true
   */
  trackVisibility?: boolean;

  /**
   * Enable automatic page unload tracking
   * @default true
   */
  trackUnload?: boolean;
}

export interface EventDetails {
  [key: string]: any;
}

export interface SEOTrackerAPI {
  /**
   * Initialize the SEO Tracker with configuration
   * @param config - Configuration options
   * @example
   * SEOTracker.init({
   *   apiUrl: 'https://your-domain.com/api/tracking',
   *   projectId: 'your-project-uuid',
   *   debug: true
   * });
   */
  init(config: SEOTrackerConfig): void;

  /**
   * Track a custom event
   * @param type - Event type identifier
   * @param details - Additional event details
   * @example
   * SEOTracker.track('button_click', {
   *   buttonId: 'signup',
   *   variant: 'primary'
   * });
   */
  track(type: string, details?: EventDetails): void;

  /**
   * Set user opt-out preference for tracking
   * @param value - true to opt out, false to opt in
   * @example
   * SEOTracker.setOptOut(true);
   */
  setOptOut(value: boolean): void;

  /**
   * Manually flush all queued events to the server
   * @returns Promise that resolves when flush completes
   * @example
   * await SEOTracker.flush();
   */
  flush(): Promise<void>;

  /**
   * Destroy the tracker instance and cleanup
   * @example
   * SEOTracker.destroy();
   */
  destroy(): void;

  /**
   * Current library version
   * @readonly
   */
  readonly version: string;
}

declare global {
  interface Window {
    SEOTracker: SEOTrackerAPI;
  }
}

declare const SEOTracker: SEOTrackerAPI;

export default SEOTracker;
