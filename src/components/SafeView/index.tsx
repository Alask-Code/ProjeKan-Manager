import React from 'react';

export default function SafeView({ children }: { children: React.ReactNode }) {
  return <div className="safe-view bg-mauve-950 text-mauve-400">{children}</div>;
}
