import React, { useId } from 'react';
import { IconType } from 'react-icons';

export default function ProjectImageUploadButton({
  label,
  title,
  Icon,
  onSelect
}: {
  label: string;
  title: string;
  Icon: IconType;
  onSelect: (image: string) => void;
}) {
  const inputId = useId();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onSelect(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <label aria-label={label} className="icon-button cover-upload-button" htmlFor={inputId} title={title}>
      <Icon />
      <input accept="image/*" className="cover-file-input" id={inputId} onChange={handleChange} type="file" />
    </label>
  );
}
