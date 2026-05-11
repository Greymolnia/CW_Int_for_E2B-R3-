import React, { useState, useEffect } from 'react';
import './DraftsManager.css';

const DraftsManager = ({ isOpen, onClose, currentData, onLoadDraft }) => {
    const [drafts, setDrafts] = useState([]);
    const [draftName, setDraftName] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const savedDrafts = JSON.parse(localStorage.getItem('safetyDrafts') || '[]');
            setDrafts(savedDrafts.sort((a, b) => new Date(b.date) - new Date(a.date)));
            setSaveSuccess(false);
        }
    }, [isOpen]);

    const handleSaveDraft = () => {
        if (!draftName.trim()) {
            alert('Пожалуйста, введите название черновика');
            return;
        }

        const savedDrafts = JSON.parse(localStorage.getItem('safetyDrafts') || '[]');

        const newDraft = {
            id: `draft_${Date.now()}`,
            name: draftName.trim(),
            date: new Date().toISOString(),
            safetyReportId: currentData.admin.safetyreportid || 'Без ID',
            data: currentData
        };

        savedDrafts.push(newDraft);
        localStorage.setItem('safetyDrafts', JSON.stringify(savedDrafts));

        setDrafts([newDraft, ...drafts].sort((a, b) => new Date(b.date) - new Date(a.date)));
        setDraftName('');
        setSaveSuccess(true);

        setTimeout(() => setSaveSuccess(false), 2000);
    };

    const handleLoadDraft = (draft) => {
        if (window.confirm('Загрузить этот черновик? Текущие несохраненные данные будут потеряны.')) {
            onLoadDraft(draft.data);
            onClose();
        }
    };

    const handleDeleteDraft = (draftId) => {
        if (window.confirm('Удалить этот черновик? Это действие нельзя отменить.')) {
            const updatedDrafts = drafts.filter(d => d.id !== draftId);
            localStorage.setItem('safetyDrafts', JSON.stringify(updatedDrafts));
            setDrafts(updatedDrafts);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Управление черновиками</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    <div className="save-section">
                        <h4>Сохранить текущий отчет как черновик</h4>
                        <div className="save-form">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Введите название черновика..."
                                value={draftName}
                                onChange={(e) => setDraftName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveDraft()}
                            />
                            <button className="btn-primary" onClick={handleSaveDraft}>
                                Сохранить
                            </button>
                        </div>
                        {saveSuccess && (
                            <div className="success-message">Черновик успешно сохранен!</div>
                        )}
                    </div>

                    <hr />

                    <div className="drafts-list-section">
                        <h4>Сохраненные черновики ({drafts.length})</h4>

                        {drafts.length === 0 ? (
                            <div className="empty-state">
                                <p>У вас пока нет сохраненных черновиков</p>
                                <p className="text-muted">Заполните форму и сохраните ее для дальнейшей работы</p>
                            </div>
                        ) : (
                            <div className="drafts-list">
                                {drafts.map(draft => (
                                    <div key={draft.id} className="draft-item">
                                        <div className="draft-info">
                                            <div className="draft-name">{draft.name}</div>
                                            <div className="draft-meta">
                                                <span className="draft-id">ID: {draft.safetyReportId}</span>
                                                <span className="draft-date">Сохранен: {formatDate(draft.date)}</span>
                                            </div>
                                        </div>
                                        <div className="draft-actions">
                                            <button
                                                className="btn-secondary small"
                                                onClick={() => handleLoadDraft(draft)}
                                            >
                                                Загрузить
                                            </button>
                                            <button
                                                className="btn-danger small"
                                                onClick={() => handleDeleteDraft(draft.id)}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default DraftsManager;