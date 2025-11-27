import React, { useState } from 'react';

interface AddTodoModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (title: string, description: string, date: string) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && date.trim()) {
      onSave(title, description, date);
      setTitle('');
      setDescription('');
      setDate('');
      onClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDate('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-plus-circle me-2 text-primary"></i>
              Nouvelle note
            </h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="todoTitle" className="form-label fw-semibold">
                  Titre de la note
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="todoTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Réunion importante"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="todoDescription" className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="todoDescription"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Présentation du nouveau plan d'action..."
                  required
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label htmlFor="todoDate" className="form-label fw-semibold">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="todoDate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-2"></i>
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;