import React, { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

interface DeferredInstallPrompt extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function InstallPwaButton() {
  const [installPrompt, setInstallPrompt] = useState<DeferredInstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const isAppleMobile =
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(navigator.userAgent);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    if (standalone) setInstalled(true);

    const handleBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as DeferredInstallPrompt);
    };
    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      setShowInstructions(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) {
      setShowInstructions(true);
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') setInstalled(true);
    setInstallPrompt(null);
  };

  return (
    <>
      <button className="pwa-install-button" disabled={installed} onClick={install} type="button">
        <FiDownload aria-hidden="true" />
        {installed ? 'App instalada' : 'Instalar app'}
      </button>
      {showInstructions ? (
        <div
          className="modal-backdrop pwa-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowInstructions(false);
          }}
          role="presentation"
        >
          <section
            aria-labelledby="pwa-install-title"
            aria-modal="true"
            className="project-modal pwa-install-dialog"
            role="dialog"
          >
            <div className="modal-header">
              <div>
                <span className="demo-eyebrow">PROJEKAN NO SEU DISPOSITIVO</span>
                <h2 id="pwa-install-title">Instalar app</h2>
              </div>
              <button
                aria-label="Fechar"
                className="icon-button"
                onClick={() => setShowInstructions(false)}
                type="button"
              >
                ×
              </button>
            </div>
            {isAppleMobile ? (
              <ol className="pwa-steps">
                <li>Abra esta página no Safari.</li>
                <li>
                  Toque em <strong>Compartilhar</strong> na barra do navegador.
                </li>
                <li>
                  Escolha <strong>Adicionar à Tela de Início</strong> e confirme em <strong>Adicionar</strong>.
                </li>
              </ol>
            ) : (
              <ol className="pwa-steps">
                <li>Abra o menu do navegador.</li>
                <li>
                  Escolha <strong>{isAndroid ? 'Instalar app' : 'Instalar ProjeKan Manager'}</strong> ou{' '}
                  <strong>Adicionar à tela inicial</strong>.
                </li>
                <li>
                  Confirme a instalação. O app ficará disponível também quando estiver offline após o primeiro acesso.
                </li>
              </ol>
            )}
            <button
              className="button-primary pwa-close-button"
              onClick={() => setShowInstructions(false)}
              type="button"
            >
              Entendi
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}
