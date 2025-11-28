interface deleteTodoModalProps {
  id: string;
  show: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

const DeleteTodoModal: React.FC<deleteTodoModalProps> = ({
  id,
  show,
  onClose,
  onConfirm,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(id);
  };

  const handleClose = () => {
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-plus-circle me-2 text-primary"></i>
              Supprimer la note
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <p>Êtes-vous sûr de vouloir supprimer cette note ?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodoModal;
