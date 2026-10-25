import React, { useState } from 'react';
import { PiArrowLeft, PiDatabase, PiEyes, PiList, PiListChecks, PiPaintBrush } from 'react-icons/pi';
import NavbarItem from './NavbarItem';

const navigation = [
  { to: '/', label: 'Home', Icon: PiListChecks },
  { to: '/overview', label: 'Overview', Icon: PiEyes },
  { to: '/backlog', label: 'Backlog', Icon: PiDatabase },
  { to: '/todo', label: 'Simple Todo List', Icon: PiListChecks },
  { to: '/theme-editor', label: 'Theme Editor', Icon: PiPaintBrush }
];

export function QuickMenuToggler({ setActive, isActive }: { setActive: (arg0: boolean) => void; isActive: boolean }) {
  return (
    <button onClick={() => setActive(!isActive)} className="flex cursor-pointer items-stretch gap-2">
      <div className="border-2 p-2">
        {isActive ? <PiArrowLeft className="text-2xl" /> : <PiList className="text-2xl" />}
      </div>

      {isActive && <p className="border-2 text-xl font-bold flex px-2 pr-12 w-full items-center">Quick Menu</p>}
    </button>
  );
}
export default function Navbar() {
  const [isMenuExpanded, setMenuExpanded] = useState(true);

  return (
    <nav className="border-2 p-2 gap-2 flex flex-col min-w-fit items-stretch justify-start h-full">
      <QuickMenuToggler setActive={setMenuExpanded} isActive={isMenuExpanded} />

      {navigation.map(({ to, label, Icon }) => (
        <NavbarItem key={to} to={to} label={label} Icon={Icon} isMenuExpanded={isMenuExpanded} />
      ))}
    </nav>
  );
}
