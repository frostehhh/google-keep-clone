import { Inter } from 'next/font/google';

import { NotesSection } from './_components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <NotesSection />
    </main>
  );
}
