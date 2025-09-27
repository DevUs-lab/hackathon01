// src/hooks/useAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics, logEvent } from '../config/firebase';

export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            screen_name: location.pathname,
            page_title: document.title,
            engagement_time_msec: 100 // Default engagement time
        });
    }, [location]);
};

export const trackEvent = (eventName, eventParams = {}) => {
    logEvent(analytics, eventName, {
        ...eventParams,
        page_location: window.location.pathname,
        timestamp: new Date().toISOString()
    });
};