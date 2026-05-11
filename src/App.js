import React, { useState, useEffect } from 'react';
import './App.css';
import { INITIAL_STATE, EMPTY_DRUG, EMPTY_REACTION, EMPTY_TEST } from './formState';
import TestsSection from './sections/TestsSection';
import SummarySection from './sections/SummarySection';
import ReactionsSection from './sections/ReactionsSection';
import AdminSection from './sections/AdminSection';
import PatientSection from './sections/PatientSection';
import DrugsSection from './sections/DrugsSection';
import InvestigationSection from './sections/InvestigationSection';
import DraftsManager from './components/DraftsManager';

const SECTIONS = [
    { id: 'admin', title: '1. Административная информация', required: true },
    { id: 'patient', title: '2. Информация о пациенте', required: true },
    { id: 'drugs', title: '3. Лекарственные препараты', required: true },
    { id: 'reactions', title: '4. Нежелательные реакции', required: true },
    { id: 'tests', title: '5. Исследования и тесты', required: false },
    { id: 'investigation', title: '6. Расследования (Study)', required: false },
    { id: 'summary', title: '7. Сводные данные', required: false },
];

function App() {
    const [activeSection, setActiveSection] = useState('admin');
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [isDraftsOpen, setIsDraftsOpen] = useState(false);

    const handleSectionChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleArrayUpdate = (section, index, field, value) => {
        setFormData(prev => {
            const newArray = [...prev[section]];
            newArray[index] = { ...newArray[index], [field]: value };
            return { ...prev, [section]: newArray };
        });
    };

    const handleArrayAdd = (section, template) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...template }]
        }));
    };

    const handleArrayRemove = (section, index) => {
        setFormData(prev => {
            const newArray = prev[section].filter((_, i) => i !== index);
            return { ...prev, [section]: newArray };
        });
    };

    const handleLoadDraft = (draftData) => {
        setFormData(draftData);
    };

    const handleNewReport = () => {
        if (window.confirm('Создать новый отчет? Текущие несохраненные данные будут потеряны.')) {
            setFormData(INITIAL_STATE);
            setActiveSection('admin');
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
            if (e.key === 'ArrowDown' && currentIndex < SECTIONS.length - 1) {
                e.preventDefault();
                setActiveSection(SECTIONS[currentIndex + 1].id);
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                setActiveSection(SECTIONS[currentIndex - 1].id);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeSection]);

    const handleExport = () => {
        const fileName = `report_${formData.admin.safetyreportid || 'draft'}.json`;
        const jsonStr = JSON.stringify(formData, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Safety DB</h2>
                    <span className="subtitle">E2B(R3) Form</span>
                </div>
                <nav>
                    {SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(section.id)}
                        >
                            {section.title}
                            {section.required && <span className="req-dot" title="Обязательно">•</span>}
                        </button>
                    ))}
                </nav>
                <div className="hotkeys-hint">
                    <small>Навигация: ↑ ↓ (вне полей)</small><br />
                </div>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <h1>Отчет № {formData.admin.safetyreportid || "Новый"}</h1>
                    <div className="actions">
                        <button className="btn-secondary" onClick={handleNewReport}>Новый</button>
                        <button className="btn-secondary" onClick={() => setIsDraftsOpen(true)}>Черновики</button>
                        <button className="btn-primary" onClick={handleExport}>Экспорт JSON</button>
                    </div>
                </header>

                <div className="form-area">
                    {activeSection === 'admin' && (
                        <AdminSection data={formData.admin} onChange={handleSectionChange} />
                    )}
                    {activeSection === 'patient' && (
                        <PatientSection data={formData.patient} onChange={handleSectionChange} />
                    )}
                    {activeSection === 'drugs' && (
                        <DrugsSection
                            data={formData.drugs}
                            onUpdate={(index, field, value) => handleArrayUpdate('drugs', index, field, value)}
                            onAdd={() => handleArrayAdd('drugs', EMPTY_DRUG)}
                            onRemove={(index) => handleArrayRemove('drugs', index)}
                        />
                    )}
                    {activeSection === 'reactions' && (
                        <ReactionsSection
                            data={formData.reactions}
                            onUpdate={(index, field, value) => handleArrayUpdate('reactions', index, field, value)}
                            onAdd={() => handleArrayAdd('reactions', EMPTY_REACTION)}
                            onRemove={(index) => handleArrayRemove('reactions', index)}
                        />
                    )}
                    {activeSection === 'tests' && (
                        <TestsSection
                            data={formData.tests}
                            onUpdate={(index, field, value) => handleArrayUpdate('tests', index, field, value)}
                            onAdd={() => handleArrayAdd('tests', EMPTY_TEST)}
                            onRemove={(index) => handleArrayRemove('tests', index)}
                        />
                    )}
                    {activeSection === 'investigation' && (
                        <InvestigationSection data={formData.investigation} onChange={handleSectionChange} />
                    )}
                    {activeSection === 'summary' && (
                        <SummarySection data={formData.summary} onChange={handleSectionChange} />
                    )}
                </div>
            </main>

            {/* Модальное окно черновиков */}
            <DraftsManager
                isOpen={isDraftsOpen}
                onClose={() => setIsDraftsOpen(false)}
                currentData={formData}
                onLoadDraft={handleLoadDraft}
            />
        </div>
    );
}

export default App;