import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface DropdownOption {
  value: string;
  label: string;
}
interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
}

export default function Dropdown({ value, options, onChange, ariaLabel, className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((option) => option.value === value)
    )
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const listId = useId();
  const currentIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );
  const selected = options[currentIndex];

  useLayoutEffect(() => {
    if (!open) {
      setMenuPosition(null);
      return undefined;
    }
    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const viewportPadding = 8;
      const width = Math.min(rect.width, window.innerWidth - viewportPadding * 2);
      const left = Math.max(viewportPadding, Math.min(rect.left, window.innerWidth - width - viewportPadding));
      const below = window.innerHeight - rect.bottom - viewportPadding - 4;
      const above = rect.top - viewportPadding - 4;
      const naturalHeight = Math.min(240, options.length * 36 + 10);
      const openAbove = below < naturalHeight && above > below;
      const maxHeight = Math.max(72, Math.min(240, openAbove ? above : below));
      const top = openAbove
        ? Math.max(viewportPadding, rect.top - Math.min(naturalHeight, maxHeight) - 4)
        : rect.bottom + 4;
      setMenuPosition({ top, left, width, maxHeight });
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    document.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, options.length]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !menuRef.current?.contains(target)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(currentIndex);
        return;
      }
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((index) => (index + offset + options.length) % options.length);
    } else if ((event.key === 'Enter' || event.key === ' ') && open) {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) onChange(option.value);
      setOpen(false);
    }
  };

  return (
    <div className={`app-dropdown ${className}`} ref={rootRef}>
      <button
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className="app-dropdown-trigger"
        onKeyDown={handleKeyDown}
        onClick={() => {
          setOpen((state) => !state);
          setActiveIndex(currentIndex);
        }}
        ref={triggerRef}
        type="button"
      >
        <span>{selected?.label ?? value}</span>
        <span aria-hidden="true" className="app-dropdown-chevron">
          ▾
        </span>
      </button>
      {open && menuPosition
        ? createPortal(
            <div
              className="app-dropdown-menu"
              id={listId}
              ref={menuRef}
              role="listbox"
              aria-label={ariaLabel}
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
                width: menuPosition.width,
                maxHeight: menuPosition.maxHeight
              }}
            >
              {options.map((option, index) => (
                <button
                  aria-selected={option.value === value}
                  className={`app-dropdown-option${index === activeIndex ? ' is-active' : ''}`}
                  id={`${listId}-option-${index}`}
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  role="option"
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
