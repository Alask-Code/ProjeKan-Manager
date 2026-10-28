import React from 'react';
import { PiArrowLeft, PiList } from 'react-icons/pi';

export default function QuickMenuToggler({
  setActive,
  isActive
}: {
  setActive: (arg0: boolean) => void;
  isActive: boolean;
}) {
  return (
    <button
      aria-expanded={isActive}
      aria-label={isActive ? 'Recolher menu' : 'Expandir menu'}
      className="quick-menu-toggle"
      onClick={() => setActive(!isActive)}
      type="button"
    >
      <span className="quick-menu-icon">
        {isActive ? <PiArrowLeft className="quick-menu-symbol" /> : <PiList className="quick-menu-symbol" />}
      </span>

      {isActive && <span className="quick-menu-label">Quick Menu</span>}
    </button>
  );
}
