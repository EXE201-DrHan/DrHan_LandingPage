'use client';

import { getAnalytics, logEvent } from 'firebase/analytics';
import { getApp } from 'firebase/app';

export const initAnalytics = () => {
  try {
    if (typeof window !== 'undefined') {
      const app = getApp();
      const analytics = getAnalytics(app);
      return analytics;
    }
  } catch (error) {
    console.error('Analytics initialization error:', error);
    return null;
  }
};

export const logPageView = (pagePath: string) => {
  try {
    const analytics = initAnalytics();
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: pagePath,
        page_title: document.title
      });
    }
  } catch (error) {
    console.error('Error logging page view:', error);
  }
};

export const logCustomEvent = (eventName: string, params?: Record<string, any>) => {
  try {
    const analytics = initAnalytics();
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch (error) {
    console.error('Error logging custom event:', error);
  }
};
