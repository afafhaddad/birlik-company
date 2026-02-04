
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Fix: Corrected 'window' to 'Window' to properly extend the global interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-QYYM96DYXJ';

/**
 * Component to handle sending page_view events to Google Analytics on route changes
 * for a Single Page Application (SPA).
 */
const Analytics: React.FC = () => {
  const location = useLocation();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Detect blob environment
    const isBlob = typeof window !== 'undefined' && window.location.protocol === 'blob:';

    // The initial page_view is sent by the script in index.html via the 'config' command.
    // This effect handles sending page_view events for subsequent virtual navigations in the SPA.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Ensure gtag is available and wrap in try-catch to handle SecurityError
    // caused by third-party tracking in restricted contexts.
    try {
      if (typeof window.gtag === 'function') {
        // Use a safe version of the URL. In some sandboxes, blob URLs are restricted.
        const safePath = location.pathname + location.search + location.hash;
        
        let pageLocation = '';
        try {
            // Only try to access window.location.href if not in a strict blob sandbox
            // that might have already thrown errors.
            pageLocation = isBlob ? (window.location.origin + '/#' + safePath) : window.location.href;
        } catch (e) {
            pageLocation = 'https://birlik-insaat.com/#' + safePath;
        }

        window.gtag('event', 'page_view', {
          page_path: safePath,
          page_location: pageLocation,
          page_title: document.title,
          send_to: GA_MEASUREMENT_ID,
        });
      }
    } catch (err) {
      console.warn('Analytics event failed:', err);
    }
  }, [location]);

  // This component does not render anything to the DOM
  return null;
};

export default Analytics;
