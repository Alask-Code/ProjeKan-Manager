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
    <button onClick={() => setActive(!isActive)} className="quick-menu-toggle flex cursor-pointer items-stretch gap-2">
      <div className="border-2 p-2">
        {isActive ? <PiArrowLeft className="text-2xl" /> : <PiList className="text-2xl" />}
      </div>

      {isActive && <p className="border-2 text-xl font-bold flex px-2 pr-12 w-full items-center">Quick Menu</p>}
    </button>
  );
}
