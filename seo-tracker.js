/**
 * SEO Tracker - Lightweight Analytics Library
 * Version: 1.0.0
 * License: MIT
 * 
 * A privacy-first tracking library for capturing user behavior
 * Repository: https://github.com/yourusername/seo-tracker
 */

(function(window) {
  'use strict';

  // Library state
  const state = {
    initialized: false,
    apiUrl: null,
    projectId: null,
    queue: [],
    sending: false,
    optOut: false,
    flushInterval: null,
    debug: false
  };

  // Utility: Check Do Not Track
  function getDNT() {
    if (typeof navigator !== 'undefined') {
      const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
      return dnt === '1' || dnt === 'yes';
    }
    return false;
  }

  // Utility: Should track events
  function shouldTrack() {
    if (state.optOut) {
      log('Tracking disabled: User opted out');
      return false;
    }
    if (getDNT()) {
      log('Tracking disabled: DNT enabled');
      return false;
    }
    if (!state.projectId || !state.apiUrl) {
      log('Tracking disabled: Missing configuration');
      return false;
    }
    return true;
  }

  // Utility: Debug logging
  function log(...args) {
    if (state.debug && console && console.log) {
      console.log('[SEOTracker]', ...args);
    }
  }

  // Utility: Generate unique session ID
  function generateSessionId() {
    try {
      const stored = localStorage.getItem('seo_tracker_session');
      if (stored) return stored;
      const sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('seo_tracker_session', sessionId);
      return sessionId;
    } catch {
      return 'sess_' + Math.random().toString(36).substr(2, 9);
    }
  }

  // Utility: Get user info
  function getUserInfo() {
    const info = {
      path: window.location.pathname || '/',
      url: window.location.href || '',
      referrer: document.referrer || '',
      userAgent: navigator.userAgent || '',
      language: navigator.language || '',
      screenWidth: window.screen ? window.screen.width : null,
      screenHeight: window.screen ? window.screen.height : null,
      viewportWidth: window.innerWidth || null,
      viewportHeight: window.innerHeight || null,
      sessionId: generateSessionId(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null
    };
    return info;
  }

  // Core: Flush queue to server
  async function flush() {
    if (state.sending) return;
    if (state.queue.length === 0) return;
    
    state.sending = true;
    const batch = state.queue.splice(0, state.queue.length);
    
    log('Flushing', batch.length, 'events');
    
    try {
      const response = await fetch(state.apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Tracker-Version': '1.0.0'
        },
        body: JSON.stringify({ 
          projectId: state.projectId, 
          events: batch 
        })
      });
      
      if (response.ok) {
        log('Events sent successfully');
      } else {
        log('Failed to send events:', response.status);
        // Re-queue failed events
        state.queue.unshift(...batch);
      }
    } catch (error) {
      log('Error sending events:', error);
      // Re-queue failed events
      state.queue.unshift(...batch);
    }
    
    state.sending = false;
  }

  // Core: Track event
  function trackEvent(type, details = {}) {
    if (!shouldTrack()) return;
    
    const now = new Date().toISOString();
    const userInfo = getUserInfo();
    
    const event = {
      type: type,
      details: Object.assign({}, details, {
        sessionId: userInfo.sessionId
      }),
      path: userInfo.path,
      url: userInfo.url,
      referrer: userInfo.referrer,
      ts: now
    };
    
    state.queue.push(event);
    log('Event tracked:', type, details);
    
    // Auto-flush if queue is large
    if (state.queue.length >= 10) {
      flush();
    }
  }

  // Core: Initialize library
  function init(config = {}) {
    if (state.initialized) {
      log('Already initialized');
      return;
    }

    // Configuration
    state.apiUrl = config.apiUrl || null;
    state.projectId = config.projectId || null;
    state.debug = config.debug || false;
    
    log('Initializing with config:', { apiUrl: state.apiUrl, projectId: state.projectId });

    // Check required config
    if (!state.apiUrl || !state.projectId) {
      console.error('[SEOTracker] Missing required configuration: apiUrl and projectId');
      return;
    }

    // Load opt-out preference
    try {
      const optOut = localStorage.getItem('seo_tracker_opt_out');
      state.optOut = optOut === '1';
    } catch {}

    state.initialized = true;

    if (!shouldTrack()) {
      log('Tracking disabled');
      return;
    }

    // Track initial page view
    const userInfo = getUserInfo();
    trackEvent('page_view', {
      title: document.title || '',
      ua: userInfo.userAgent,
      lang: userInfo.language,
      ref: userInfo.referrer,
      screenW: userInfo.screenWidth,
      screenH: userInfo.screenHeight,
      viewportW: userInfo.viewportWidth,
      viewportH: userInfo.viewportHeight,
      tz: userInfo.timezone
    });

    // Auto-track clicks
    if (config.trackClicks !== false) {
      document.addEventListener('click', function(e) {
        if (!shouldTrack()) return;
        
        const target = e.target;
        const tagName = target && target.tagName ? target.tagName.toLowerCase() : null;
        const id = target && target.id ? target.id : null;
        const className = target && target.className ? String(target.className) : null;
        const text = target && target.textContent ? target.textContent.slice(0, 100) : null;
        
        trackEvent('click', { 
          tag: tagName, 
          id: id, 
          class: className,
          text: text
        });
      }, { capture: true });
    }

    // Auto-track visibility changes
    if (config.trackVisibility !== false) {
      document.addEventListener('visibilitychange', function() {
        if (!shouldTrack()) return;
        trackEvent('visibility', { state: document.visibilityState });
      });
    }

    // Auto-track page unload
    if (config.trackUnload !== false) {
      window.addEventListener('beforeunload', function() {
        trackEvent('page_unload', {});
        flush();
      });
    }

    // Auto-track scroll depth
    if (config.trackScroll !== false) {
      let maxScroll = 0;
      window.addEventListener('scroll', function() {
        if (!shouldTrack()) return;
        
        const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          if (maxScroll >= 25 && maxScroll < 50) {
            trackEvent('scroll', { depth: '25%' });
          } else if (maxScroll >= 50 && maxScroll < 75) {
            trackEvent('scroll', { depth: '50%' });
          } else if (maxScroll >= 75 && maxScroll < 90) {
            trackEvent('scroll', { depth: '75%' });
          } else if (maxScroll >= 90) {
            trackEvent('scroll', { depth: '90%' });
          }
        }
      });
    }

    // Periodic flush
    state.flushInterval = setInterval(() => flush(), 5000);
    
    log('Initialization complete');
  }

  // Core: Set opt-out preference
  function setOptOut(value) {
    state.optOut = !!value;
    try {
      localStorage.setItem('seo_tracker_opt_out', state.optOut ? '1' : '0');
      log('Opt-out set to:', state.optOut);
    } catch {}
  }

  // Core: Manual flush
  function flushNow() {
    return flush();
  }

  // Core: Destroy instance
  function destroy() {
    if (state.flushInterval) {
      clearInterval(state.flushInterval);
    }
    flush();
    state.initialized = false;
    log('Destroyed');
  }

  // Public API
  const SEOTracker = {
    init: init,
    track: trackEvent,
    setOptOut: setOptOut,
    flush: flushNow,
    destroy: destroy,
    version: '1.0.0'
  };

  // Export for different module systems
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = SEOTracker;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return SEOTracker; });
  } else {
    window.SEOTracker = SEOTracker;
  }

  log('SEOTracker library loaded');

})(typeof window !== 'undefined' ? window : this);
