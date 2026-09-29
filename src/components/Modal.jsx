import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-modal p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-surface shadow-sm bg-brand-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ink-500/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-ink-500 hover:text-ink-900"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}