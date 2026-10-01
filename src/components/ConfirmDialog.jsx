import Modal from './Modal';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, isDeleting }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p className="text-sm text-ink-500">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm font-semibold text-ink-500 hover:text-ink-900"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="rounded-md bg-alert-500 px-4 py-2 text-sm font-semibold text-white hover:bg-alert-500/90 disabled:opacity-50"
        >
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </Modal>
  );
}