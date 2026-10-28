import React, { FormEvent, useState } from 'react';
import { FiExternalLink, FiPlus, FiTrash2 } from 'react-icons/fi';
import type { ProjectProperty, ReleaseEntry } from '../../../../utils/interfaces';

export default function ReleasesProperty({
  property,
  onChange
}: {
  property: ProjectProperty;
  onChange: (releases: ReleaseEntry[]) => void;
}) {
  const [version, setVersion] = useState('');
  const [date, setDate] = useState('');
  const [url, setUrl] = useState('');
  const [changelogUrl, setChangelogUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const releases = Array.isArray(property.value) ? (property.value as ReleaseEntry[]) : [];

  const addRelease = (event: FormEvent) => {
    event.preventDefault();
    if (!version.trim() || !date) return;
    onChange([
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        version: version.trim(),
        date,
        url: url.trim(),
        changelogUrl: changelogUrl.trim()
      },
      ...releases
    ]);
    setVersion('');
    setDate('');
    setUrl('');
    setChangelogUrl('');
    setShowForm(false);
  };

  return (
    <div className="release-property-content">
      <div className="release-toolbar">
        <span>
          {releases.length
            ? `${releases.length} ${releases.length === 1 ? 'versão' : 'versões'}`
            : 'Versões do projeto'}
        </span>
        <button
          aria-expanded={showForm}
          className="release-add"
          onClick={() => setShowForm((visible) => !visible)}
          type="button"
        >
          <FiPlus /> Adicionar release
        </button>
      </div>
      {releases.length ? (
        <ul className="release-list">
          {releases.map((release) => (
            <li className="release-item" key={release.id}>
              <div className="release-heading">
                <strong>{release.version}</strong>
                <time dateTime={release.date}>{new Date(`${release.date}T00:00:00`).toLocaleDateString('pt-BR')}</time>
                <button
                  aria-label={`Remover versão ${release.version}`}
                  className="release-remove"
                  onClick={() => onChange(releases.filter((entry) => entry.id !== release.id))}
                  type="button"
                >
                  <FiTrash2 />
                </button>
              </div>
              <div className="release-links">
                {release.url ? (
                  <a href={release.url} rel="noreferrer" target="_blank">
                    <FiExternalLink /> Release
                  </a>
                ) : null}
                {release.changelogUrl ? (
                  <a href={release.changelogUrl} rel="noreferrer" target="_blank">
                    <FiExternalLink /> Changelog
                  </a>
                ) : null}
                {!release.url && !release.changelogUrl ? <span>Sem links adicionados</span> : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="release-empty">Nenhuma versão registrada ainda.</p>
      )}
      {showForm ? (
        <form className="release-form" onSubmit={addRelease}>
          <div className="release-fields">
            <label htmlFor={`${property.id}-release-version`}>
              Versão
              <input
                id={`${property.id}-release-version`}
                onChange={(event) => setVersion(event.target.value)}
                placeholder="Ex.: v1.2.0"
                required
                value={version}
              />
            </label>
            <label htmlFor={`${property.id}-release-date`}>
              Data
              <input
                id={`${property.id}-release-date`}
                onChange={(event) => setDate(event.target.value)}
                required
                type="date"
                value={date}
              />
            </label>
            <label htmlFor={`${property.id}-release-url`}>
              Link da release
              <input
                id={`${property.id}-release-url`}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://..."
                type="url"
                value={url}
              />
            </label>
            <label htmlFor={`${property.id}-release-changelog`}>
              Link do changelog
              <input
                id={`${property.id}-release-changelog`}
                onChange={(event) => setChangelogUrl(event.target.value)}
                placeholder="https://..."
                type="url"
                value={changelogUrl}
              />
            </label>
          </div>
          <div className="release-form-actions">
            <button className="release-submit" type="submit">
              Salvar release
            </button>
            <button className="release-cancel" onClick={() => setShowForm(false)} type="button">
              Cancelar
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
