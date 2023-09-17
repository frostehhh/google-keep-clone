import { Inter } from 'next/font/google';

import { NotesSection } from './_components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex gap-8 min-h-screen flex-col items-center p-10 ${inter.className}`}
    >
      <NotesSection />
    </main>
  );
}
