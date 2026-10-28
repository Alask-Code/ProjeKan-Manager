import React, { useState } from 'react';
import { FiCheck, FiRotateCcw, FiSave } from 'react-icons/fi';
import useThemeStore, { defaultTheme, themePresets, type ThemeSettings } from '../../stores/themeStore';
import Dropdown from '../../components/Dropdown';

const colorControls: { key: keyof ThemeSettings; label: string }[] = [
  { key: 'primary', label: 'Cor principal' },
  { key: 'background', label: 'Fundo da aplicação' },
  { key: 'surface', label: 'Superfícies e cartões' },
  { key: 'raised', label: 'Elementos elevados' },
  { key: 'text', label: 'Texto principal' },
  { key: 'muted', label: 'Texto secundário' },
  { key: 'border', label: 'Bordas' },
  { key: 'danger', label: 'Ações de atenção' },
  { key: 'success', label: 'Estados positivos' },
  { key: 'warning', label: 'Estados de alerta' },
  { key: 'info', label: 'Informações' }
];
const fonts = [
  { label: 'Monoespaçada clássica', value: 'monospace' },
  { label: 'Sistema', value: 'system-ui, sans-serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: '"Courier New", monospace' }
];

export default function ThemeEditorPage() {
  const savedSettings = useThemeStore((state) => state.settings);
  const saveSettings = useThemeStore((state) => state.saveSettings);
  const resetSettings = useThemeStore((state) => state.resetSettings);
  const [draft, setDraft] = useState<ThemeSettings>(() => ({ ...savedSettings }));
  const [saved, setSaved] = useState(false);
  const setColor = (key: keyof ThemeSettings, value: string | number) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };
  const save = () => {
    saveSettings({ ...draft });
    setSaved(true);
  };
  const restore = () => {
    const defaults = { ...defaultTheme };
    setDraft(defaults);
    resetSettings();
    setSaved(true);
  };
  const choosePreset = (settings: ThemeSettings) => {
    setDraft({ ...settings });
    setSaved(false);
  };

  return (
    <main className="workspace-page theme-editor-page">
      <div className="page-intro">
        <div>
          <span className="demo-eyebrow">PERSONALIZAÇÃO</span>
          <h2>Editor de temas</h2>
          <p>Personalize cores, bordas e tipografia. Salve para aplicar as alterações em todo o espaço.</p>
        </div>
        <div className="theme-actions">
          <button className="button-secondary" onClick={restore} type="button">
            <FiRotateCcw /> Restaurar padrão
          </button>
          <button className="button-primary" onClick={save} type="button">
            <FiSave /> {saved ? 'Salvo' : 'Salvar alterações'}
          </button>
        </div>
      </div>
      <section className="theme-editor-grid">
        <div className="theme-settings-column">
          <article className="workspace-card theme-section">
            <div className="section-heading">
              <div>
                <h3>Temas prontos</h3>
                <p>Escolha uma paleta como ponto de partida.</p>
              </div>
            </div>
            <div className="palette-list">
              {themePresets.map((preset) => (
                <button
                  className="palette-option"
                  key={preset.id}
                  onClick={() => choosePreset(preset.settings)}
                  type="button"
                >
                  <span className="palette-swatches">
                    <i style={{ background: preset.settings.primary }} />
                    <i style={{ background: preset.settings.surface }} />
                    <i style={{ background: preset.settings.background }} />
                  </span>
                  <span>{preset.name}</span>
                  <FiCheck className="palette-check" />
                </button>
              ))}
            </div>
          </article>
          <article className="workspace-card theme-section">
            <div className="section-heading">
              <div>
                <h3>Cores da interface</h3>
                <p>Ajuste cada cor usada nos componentes.</p>
              </div>
            </div>
            <div className="theme-color-grid">
              {colorControls.map(({ key, label }) => (
                <label className="theme-color-control" htmlFor={`theme-color-${key}`} key={key}>
                  <span>{label}</span>
                  <span className="theme-color-picker">
                    <input
                      aria-label={label}
                      id={`theme-color-${key}`}
                      onChange={(event) => setColor(key, event.target.value)}
                      type="color"
                      value={String(draft[key])}
                    />
                    <code>{String(draft[key]).toUpperCase()}</code>
                  </span>
                </label>
              ))}
            </div>
          </article>
          <article className="workspace-card theme-section">
            <div className="section-heading">
              <div>
                <h3>Forma e tipografia</h3>
                <p>Defina o acabamento dos componentes.</p>
              </div>
            </div>
            <div className="theme-select-control">
              <span>Fonte da interface</span>
              <Dropdown
                ariaLabel="Fonte da interface"
                onChange={(value) => setColor('font', value)}
                options={fonts.map((font) => ({ value: font.value, label: font.label }))}
                value={draft.font}
              />
            </div>
            <label className="theme-range-control" htmlFor="theme-border-radius">
              <span>
                <strong>Arredondamento</strong>
                <output>{draft.borderRadius}px</output>
              </span>
              <input
                id="theme-border-radius"
                max="24"
                min="0"
                onChange={(event) => setColor('borderRadius', Number(event.target.value))}
                type="range"
                value={draft.borderRadius}
              />
              <small>
                Quadrado <span>Arredondado</span>
              </small>
            </label>
            <label className="theme-range-control" htmlFor="theme-border-width">
              <span>
                <strong>Espessura das bordas</strong>
                <output>{draft.borderWidth}px</output>
              </span>
              <input
                id="theme-border-width"
                max="5"
                min="0"
                onChange={(event) => setColor('borderWidth', Number(event.target.value))}
                type="range"
                value={draft.borderWidth}
              />
              <small>
                Sem borda <span>Espessa</span>
              </small>
            </label>
          </article>
        </div>
        <article className="workspace-card theme-preview-panel">
          <div className="section-heading">
            <div>
              <h3>Prévia</h3>
              <p>As alterações aparecem aqui antes de salvar.</p>
            </div>
            <span className="draft-badge">RASCUNHO</span>
          </div>
          <div
            className="theme-live-preview"
            style={
              {
                background: draft.background,
                color: draft.text,
                borderColor: draft.border,
                '--preview-radius': `${draft.borderRadius}px`,
                '--preview-font': draft.font
              } as React.CSSProperties
            }
          >
            <aside style={{ background: draft.surface, borderColor: draft.border }}>
              <span style={{ color: draft.primary }}>P</span>
              <i />
              <i />
              <i />
            </aside>
            <div className="live-preview-content">
              <small style={{ color: draft.muted }}>SEU ESPAÇO DE TRABALHO</small>
              <h4>Meus projetos</h4>
              <div className="live-preview-columns">
                <div style={{ background: draft.surface, borderColor: draft.border }}>
                  <b style={{ color: draft.muted }}>A FAZER</b>
                  <span style={{ background: draft.raised, borderColor: draft.border }}>
                    <i style={{ background: draft.primary }} /> Planejar projeto
                  </span>
                </div>
                <div style={{ background: draft.surface, borderColor: draft.border }}>
                  <b style={{ color: draft.muted }}>EM ANDAMENTO</b>
                  <span style={{ background: draft.raised, borderColor: draft.border }}>
                    <i style={{ background: draft.info }} /> Criar protótipo
                  </span>
                </div>
              </div>
              <div className="live-preview-footer">
                <button style={{ background: draft.primary, color: draft.background, borderColor: draft.border }}>
                  Ação principal
                </button>
                <span style={{ color: draft.success }}>Concluído</span>
                <span style={{ color: draft.warning }}>Atenção</span>
                <span style={{ color: draft.danger }}>Excluir</span>
              </div>
            </div>
          </div>
          <p className="preview-save-hint">
            Para aplicar ao restante do app, clique em <strong>Salvar alterações</strong>.
          </p>
        </article>
      </section>
    </main>
  );
}
