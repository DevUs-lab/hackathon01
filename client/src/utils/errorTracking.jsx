// src/utils/errorTracking.js
import { trackEvent } from '../hooks/useAnalytics';
import { EVENTS, PARAMS } from './events';

export const trackError = (error, context = {}) => {
    trackEvent(EVENTS.ERROR, {
        [PARAMS.ERROR_MESSAGE]: error.message,
        error_stack: error.stack,
        ...context
    });
};

// Usage in components:
// try { ... } catch (error) { trackError(error); }