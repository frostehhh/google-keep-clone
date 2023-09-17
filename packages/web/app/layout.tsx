import '@/styles/globals.css';

import { Header } from './_components/Header';
import Providers from './providers';

export default function RootLayout({
  children,
}:      {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}