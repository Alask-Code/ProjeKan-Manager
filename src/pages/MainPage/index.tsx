import React, { useEffect } from 'react';

import SafeView from '../../components/SafeView';
import Navbar from '../../components/Navbar';
import RouteContent from '../../components/RouteContent';
import Header from '../../components/Header';
import useThemeStore from '../../stores/themeStore';

export default function MainPage() {
  const settings = useThemeStore((state) => state.settings);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', settings.primary);
    root.style.setProperty('--brand', settings.primary);
    root.style.setProperty('--brand-soft', settings.raised);
    root.style.setProperty('--app-background', settings.background);
    root.style.setProperty('--surface-color', settings.surface);
    root.style.setProperty('--raised-color', settings.raised);
    root.style.setProperty('--text-color', settings.text);
    root.style.setProperty('--muted-color', settings.muted);
    root.style.setProperty('--border-color', settings.border);
    root.style.setProperty('--danger-color', settings.danger);
    root.style.setProperty('--success-color', settings.success);
    root.style.setProperty('--warning-color', settings.warning);
    root.style.setProperty('--info-color', settings.info);
    root.style.setProperty('--control-radius', `${settings.borderRadius}px`);
    root.style.setProperty('--border-width', `${settings.borderWidth}px`);
    root.style.setProperty('--app-font', settings.font);
  }, [settings]);
  return (
    <SafeView>
      <Navbar />

      <div className="main-content">
        <Header />
        <RouteContent />
      </div>
    </SafeView>
  );
}
