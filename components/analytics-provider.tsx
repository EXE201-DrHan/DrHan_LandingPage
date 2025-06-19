'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/lib/firebase-config';
import { logPageView } from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const isInitialized = useRef(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isInitialized.current) {
      // Initialize Firebase
      initializeApp(firebaseConfig);
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (pathname) {
      // Log page view on route change
      logPageView(pathname);
    }
  }, [pathname, searchParams]);

  return children;
}
