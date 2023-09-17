'use client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { type PropsWithChildren } from 'react'; ;

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}