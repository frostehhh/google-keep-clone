import { Authenticator } from '../Authenticator';
import { KeepLogo } from '../KeepLogo';

export default function Header() {
  return (
    <header className="h-16 border-b border-neutral-200 flex justify-between p-1">
      <KeepLogo />
      <Authenticator />
    </header>
  );
}