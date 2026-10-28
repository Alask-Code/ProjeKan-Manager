import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ThemeSettings {
  primary: string;
  background: string;
  surface: string;
  raised: string;
  text: string;
  muted: string;
  border: string;
  danger: string;
  success: string;
  warning: string;
  info: string;
  borderRadius: number;
  borderWidth: number;
  font: string;
}

export const defaultTheme: ThemeSettings = {
  primary: '#a77ec3',
  background: '#17131d',
  surface: '#1e1826',
  raised: '#33263f',
  text: '#eadcf5',
  muted: '#b59bc9',
  border: '#76568f',
  danger: '#d26f83',
  success: '#61b58a',
  warning: '#d7ad58',
  info: '#7da5da',
  borderRadius: 0,
  borderWidth: 2,
  font: 'monospace'
};

export const themePresets: { id: string; name: string; settings: ThemeSettings }[] = [
  { id: 'mauve', name: 'Mauve clássico', settings: defaultTheme },
  {
    id: 'ocean',
    name: 'Oceano',
    settings: {
      ...defaultTheme,
      primary: '#66a8d1',
      background: '#101923',
      surface: '#172330',
      raised: '#223448',
      text: '#dcecf7',
      muted: '#9ab6ca',
      border: '#466b88',
      info: '#75bde0'
    }
  },
  {
    id: 'forest',
    name: 'Floresta',
    settings: {
      ...defaultTheme,
      primary: '#69b48e',
      background: '#111a17',
      surface: '#19251f',
      raised: '#26392f',
      text: '#e0f0e7',
      muted: '#a0c1ad',
      border: '#557866',
      success: '#81c69b'
    }
  },
  {
    id: 'sunset',
    name: 'Pôr do sol',
    settings: {
      ...defaultTheme,
      primary: '#db916b',
      background: '#201713',
      surface: '#2b1e19',
      raised: '#483027',
      text: '#f5e3d8',
      muted: '#d0a995',
      border: '#956449',
      warning: '#e5bb67'
    }
  }
];

interface ThemeStore {
  settings: ThemeSettings;
  saveSettings: (settings: ThemeSettings) => void;
  resetSettings: () => void;
}
const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      settings: defaultTheme,
      saveSettings: (settings) => set({ settings }),
      resetSettings: () => set({ settings: defaultTheme })
    }),
    {
      name: 'projekan-theme',
      storage: createJSONStorage(() => localStorage),
      version: 2,
      partialize: (state) => ({ settings: state.settings })
    }
  )
);
export default useThemeStore;
