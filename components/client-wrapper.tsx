// components/client-wrapper.tsx
'use client';

import { AnalyticsProvider } from '@/components/analytics-provider';
import { Suspense } from 'react';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsProvider>{children}</AnalyticsProvider>
    </Suspense>
  );
}
