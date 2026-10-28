import React, { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import type { ProjectProperty, ProjectPropertyType, ProjectProps } from '../../../../utils/interfaces';
import useProjectStore from '../../../../stores/projectStore';
import Dropdown from '../../../Dropdown';
import ReleasesProperty from './ReleasesProperty';

const fieldTypes: { value: ProjectPropertyType; label: string }[] = [
  { value: 'text', label: 'Texto' },
  { value: 'number', label: 'Número' },
  { value: 'date', label: 'Data' },
  { value: 'select', label: 'Seleção' },
  { value: 'checkbox', label: 'Caixa de seleção' },
  { value: 'url', label: 'URL' },
  { value: 'releases', label: 'Releases' }
];

export default function ProjectProperties({ project }: { project: ProjectProps }) {
  const updateProject = useProjectStore((state) => state.updateProject);
  const properties = project.properties ?? [];
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<ProjectPropertyType>('text');
  const update = (next: ProjectProperty[]) => updateProject(project.id, { properties: next });
  const add = (event: React.FormEvent) => {
    event.preventDefault();
    const fieldName = name.trim();
    if (!fieldName) return;
    let initialValue: ProjectProperty['value'] = '';
    if (type === 'checkbox') initialValue = false;
    if (type === 'releases') initialValue = [];
    const property: ProjectProperty = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: fieldName,
      type,
      value: initialValue
    };
    update([...properties, property]);
    setName('');
    setType('text');
    setAdding(false);
  };
  const setValue = (property: ProjectProperty, value: ProjectProperty['value']) =>
    update(properties.map((item) => (item.id === property.id ? { ...item, value } : item)));
  return (
    <section className="project-properties">
      <header className="properties-heading">
        <div>
          <h3>Propriedades</h3>
          <p>Campos personalizados deste projeto</p>
        </div>
        <button className="properties-add" onClick={() => setAdding((open) => !open)} type="button">
          <FiPlus /> Adicionar propriedade
        </button>
      </header>
      {properties.length ? (
        <div className="property-list">
          {properties.map((property) => (
            <div className="property-row" key={property.id}>
              <label htmlFor={`property-${property.id}`}>{property.name}</label>
              <div className="property-control">
                {property.type === 'checkbox' ? (
                  <input
                    checked={Boolean(property.value)}
                    id={`property-${property.id}`}
                    onChange={(event) => setValue(property, event.target.checked)}
                    type="checkbox"
                  />
                ) : null}
                {property.type === 'text' || property.type === 'url' ? (
                  <input
                    id={`property-${property.id}`}
                    onChange={(event) => setValue(property, event.target.value)}
                    placeholder={property.type === 'url' ? 'https://' : 'Adicionar valor'}
                    type={property.type === 'url' ? 'url' : 'text'}
                    value={String(property.value ?? '')}
                  />
                ) : null}
                {property.type === 'number' ? (
                  <input
                    id={`property-${property.id}`}
                    onChange={(event) =>
                      setValue(property, event.target.value === '' ? '' : Number(event.target.value))
                    }
                    placeholder="Adicionar valor"
                    type="number"
                    value={property.value === '' ? '' : Number(property.value)}
                  />
                ) : null}
                {property.type === 'date' ? (
                  <input
                    id={`property-${property.id}`}
                    onChange={(event) => setValue(property, event.target.value)}
                    type="date"
                    value={String(property.value ?? '')}
                  />
                ) : null}
                {property.type === 'select' ? (
                  <Dropdown
                    ariaLabel={property.name}
                    className="property-dropdown"
                    onChange={(value) => setValue(property, value)}
                    options={[
                      { value: '', label: 'Escolher...' },
                      ...(property.options ?? ['A fazer', 'Em andamento', 'Concluído']).map((option) => ({
                        value: option,
                        label: option
                      }))
                    ]}
                    value={String(property.value ?? '')}
                  />
                ) : null}
                {property.type === 'releases' ? (
                  <ReleasesProperty onChange={(releases) => setValue(property, releases)} property={property} />
                ) : null}
                <button
                  aria-label={`Remover propriedade ${property.name}`}
                  className="property-remove"
                  onClick={() => update(properties.filter((item) => item.id !== property.id))}
                  type="button"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="properties-empty">Adicione campos para acompanhar informações específicas deste projeto.</p>
      )}
      {adding ? (
        <form className="property-create" onSubmit={add}>
          <input
            aria-label="Nome da propriedade"
            onChange={(event) => setName(event.target.value)}
            placeholder="Nome da propriedade"
            value={name}
          />
          <Dropdown
            ariaLabel="Tipo da propriedade"
            onChange={(value) => setType(value as ProjectPropertyType)}
            options={fieldTypes.map((field) => ({ value: field.value, label: field.label }))}
            value={type}
          />
          <button className="button-primary" type="submit">
            Adicionar
          </button>
          <button className="button-secondary" onClick={() => setAdding(false)} type="button">
            Cancelar
          </button>
        </form>
      ) : null}
    </section>
  );
}
