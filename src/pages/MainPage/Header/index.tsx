import React from 'react';

export default function Header() {
  return (
    <header className="w-full border-2 p-2">
      <p className="text-3xl font-black">{document.title}</p>
    </header>
  );
}
