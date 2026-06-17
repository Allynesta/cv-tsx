interface Props {
	message: string;
	confirmLabel?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmModal = ({ message, confirmLabel = "Delete", onConfirm, onCancel }: Props) => (
	<div className="modal-overlay" onClick={onCancel}>
		<div className="modal-card" onClick={(e) => e.stopPropagation()}>
			<p className="modal-message">{message}</p>
			<div className="modal-actions">
				<button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
				<button className="btn btn-danger" onClick={onConfirm}>{confirmLabel}</button>
			</div>
		</div>
	</div>
);

export default ConfirmModal;
