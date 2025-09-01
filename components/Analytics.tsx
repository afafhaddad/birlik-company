import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Declare gtag function for TypeScript to avoid errors
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
    // The initial page_view is sent by the script in index.html via the 'config' command.
    // This effect handles sending page_view events for subsequent virtual navigations in the SPA.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Ensure gtag is available before calling it
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search + location.hash,
        page_location: window.location.href,
        page_title: document.title,
        send_to: GA_MEASUREMENT_ID,
      });
    }
  }, [location]);

  // This component does not render anything to the DOM
  return null;
};

export default Analytics;
