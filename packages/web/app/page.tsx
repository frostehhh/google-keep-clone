import { Inter } from 'next/font/google';

import { NotesSection } from './_components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  console.log('DEBUG HOME NEXT_PUBLIC_TEST', process.env.NEXT_PUBLIC_TEST);
  console.log('DEBUG HOME NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <NotesSection />
    </main>
  );
}
