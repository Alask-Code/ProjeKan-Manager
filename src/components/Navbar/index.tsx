import React from 'react';
import { PiDatabase, PiEyes, PiListChecks, PiPaintBrush } from 'react-icons/pi';
import NavbarItem from './NavbarItem';
import QuickMenuToggler from './QuickMenuToggler';
import useUiState from '../../stores/uiStore';

const navigation = [
  { to: '/', label: 'Quadro', Icon: PiListChecks },
  { to: '/overview', label: 'Visão geral', Icon: PiEyes },
  { to: '/backlog', label: 'Backlog', Icon: PiDatabase },
  { to: '/todo', label: 'Tarefas', Icon: PiListChecks },
  { to: '/theme-editor', label: 'Tema', Icon: PiPaintBrush }
];

export default function Navbar() {
  const { isMenuExpanded, setMenuExpanded } = useUiState();

  return (
    <nav className="border-2 p-2 gap-2 flex flex-col min-w-fit items-stretch justify-start h-full">
      <QuickMenuToggler setActive={setMenuExpanded} isActive={isMenuExpanded} />

      {navigation.map(({ to, label, Icon }) => (
        <NavbarItem key={to} to={to} label={label} Icon={Icon} isMenuExpanded={isMenuExpanded} />
      ))}
    </nav>
  );
}
