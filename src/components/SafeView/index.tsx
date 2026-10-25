import React from 'react';

export default function SafeView({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-mauve-950 text-mauve-400 gap-2 w-full p-2 h-screen flex items-start justify-center">
      {children}
    </div>
  );
}
