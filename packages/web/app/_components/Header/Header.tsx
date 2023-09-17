import { Authenticator } from '../Authenticator';

export default function Header() {
  return (
    <header className="h-16 border-b border-neutral-200 flex justify-end p-1">
      <Authenticator />
    </header>
  );
}