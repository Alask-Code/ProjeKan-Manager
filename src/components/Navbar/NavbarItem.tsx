import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavbarItemProps } from '../../utils/interfaces';
import useUiState from '../../stores/uiStore';

export default function NavbarItem({ Icon, label, to, isMenuExpanded }: NavbarItemProps) {
  const { setMenuExpanded } = useUiState();
  return (
    <NavLink
      onClick={() => isMenuExpanded && setMenuExpanded()}
      to={to}
      end={to === '/'}
      className="navbar-item flex items-stretch gap-2"
    >
      {({ isActive }) => (
        <>
          <div className={`border-2 p-2 ${isActive ? 'bg-mauve-500' : 'bg-mauve-950'}`}>
            <Icon className="text-2xl" />
          </div>

          {isMenuExpanded && (
            <p
              className={`border-2 text-xl font-bold flex px-2 pr-12 w-full items-center ${
                isActive ? 'bg-mauve-500' : 'border-transparent'
              }`}
            >
              {label}
            </p>
          )}
        </>
      )}
    </NavLink>
  );
}
