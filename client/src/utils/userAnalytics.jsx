// src/utils/userAnalytics.js
import { setUserProperties } from "firebase/analytics";
import { analytics } from "../config/firebase";

export const setUserAnalyticsProperties = (user) => {
    if (!user) return;

    setUserProperties(analytics, {
        user_id: user.uid,
        account_type: user.isPremium ? 'premium' : 'basic',
        signup_method: user.provider,
        last_active: new Date().toISOString()
    });
};