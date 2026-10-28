import React from 'react';
import InstallPwaButton from '../InstallPwaButton';

export default function Header() {
  return (
    <header className="app-header w-full border-2 p-2">
      <p className="text-3xl px-4 font-black">{document.title}</p>
      <InstallPwaButton />
    </header>
  );
}
