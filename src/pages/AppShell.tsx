import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiActivity,
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiGrid,
  FiHeart,
  FiHome,
  FiSettings,
  FiShield,
  FiUsers
} from 'react-icons/fi';

const navigation = [{ to: '/app/', label: 'Resumo', icon: FiHome }];

const mobileNavigation = navigation.slice(0, 4);
const moreNavigation = navigation.slice(4);

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export default function AppShell({ title, subtitle, children, actions }: AppShellProps) {
  const { pathname } = useLocation();

  const [moreOpen, setMoreOpen] = useState(false);
  const morePageActive = moreNavigation.some(({ to }) => pathname === to || pathname.startsWith(`${to}/`));

  return (
    <div className="app-shell">
      <div className="app-layout">
        <aside className="app-sidebar">
          <nav aria-label="Navegação principal" className="app-navigation">
            {navigation.map(({ to, label, icon: Icon }) => (
              <NavLink
                end={to === '/app/'}
                key={to}
                to={to}
                className={({ isActive }) => `app-nav-link${isActive ? ' is-active' : ''}`}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="app-main">
          <header className="app-header">
            <div className="app-heading">
              <span className="demo-eyebrow">SEU ESPAÇO DE CUIDADO</span>
              <h1>{title}</h1>
              {subtitle ? <p>{subtitle}</p> : null}
              <div className="baby-context">
                <span aria-hidden="true">👶</span>
              </div>
            </div>
            <div className="header-tools">
              {actions}
              <div className="account-chip">
                <span className="account-avatar">M</span>
              </div>
            </div>
          </header>

          <div className="page-content">{children}</div>
        </main>
      </div>

      <nav aria-label="Navegação móvel" className="mobile-navigation">
        {mobileNavigation.map(({ to, label, icon: Icon }) => (
          <NavLink
            end={to === '/app/'}
            key={to}
            to={to}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          aria-expanded={moreOpen}
          aria-label="Mais páginas"
          className={`mobile-nav-link${moreOpen || morePageActive ? ' is-active' : ''}`}
          onClick={() => setMoreOpen(!moreOpen)}
          type="button"
        >
          <FiGrid aria-hidden="true" />
          <span>Mais</span>
        </button>
      </nav>

      {moreOpen ? (
        <div className="mobile-more-menu">
          {moreNavigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              onClick={() => setMoreOpen(false)}
              to={to}
              className={({ isActive }) => `mobile-more-link${isActive ? ' is-active' : ''}`}
            >
              <Icon aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
