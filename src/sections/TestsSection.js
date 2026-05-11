import React from 'react';
import SmartInput from '../components/SmartInput';

const TestsSection = ({ data, onUpdate, onAdd, onRemove }) => {
    return (
        <div className="fade-in">
            <div className="section-header-row">
                <h3>5. Исследования и тесты</h3>
                <button className="btn-secondary small" onClick={onAdd}>+ Добавить тест</button>
            </div>

            {data.length === 0 && <p className="text-muted">Нет данных о тестах.</p>}

            {data.map((test, index) => (
                <div key={index} className="card drug-card mb-4">
                    <div className="card-header-row">
                        <h4>Тест #{index + 1}</h4>
                        <button className="btn-danger small" onClick={() => onRemove(index)}>Удалить</button>
                    </div>

                    <div className="grid-2">
                        <div className="form-group">
                            <label htmlFor={`testname-${index}`}>Название теста</label>
                            <input
                                id={`testname-${index}`}
                                className="form-control"
                                type="text"
                                value={test.testname || ''}
                                onChange={(e) => onUpdate(index, 'testname', e.target.value)}
                                placeholder="например, Глюкоза, АЛТ"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`testdate-${index}`}>Дата проведения</label>
                            <input
                                id={`testdate-${index}`}
                                className="form-control"
                                type="date"
                                value={test.testdate || ''}
                                onChange={(e) => onUpdate(index, 'testdate', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid-3">
                        <div className="form-group">
                            <label htmlFor={`testresult-${index}`}>Результат</label>
                            <input
                                id={`testresult-${index}`}
                                className="form-control"
                                type="number"
                                value={test.testresult || ''}
                                onChange={(e) => onUpdate(index, 'testresult', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`testunit-${index}`}>Единица измерения</label>
                            <input
                                id={`testunit-${index}`}
                                className="form-control"
                                type="text"
                                value={test.testunit || ''}
                                onChange={(e) => onUpdate(index, 'testunit', e.target.value)}
                                placeholder="например, мг/дл, мм рт.ст."
                            />
                        </div>
                        <div className="form-group empty-placeholder"></div>
                    </div>

                    <div className="grid-2 mt-2">
                        <div className="form-group">
                            <label htmlFor={`testlow-${index}`}>Нижняя граница (Low)</label>
                            <input
                                id={`testlow-${index}`}
                                className="form-control"
                                type="number"
                                value={test.testlow || ''}
                                onChange={(e) => onUpdate(index, 'testlow', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`testhigh-${index}`}>Верхняя граница (High)</label>
                            <input
                                id={`testhigh-${index}`}
                                className="form-control"
                                type="number"
                                value={test.testhigh || ''}
                                onChange={(e) => onUpdate(index, 'testhigh', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TestsSection;