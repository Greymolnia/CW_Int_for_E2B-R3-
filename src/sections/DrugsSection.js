import React from 'react';
import SmartInput from '../components/SmartInput';

const DrugsSection = ({ data, onUpdate, onAdd, onRemove }) => {
    return (
        <div className="fade-in">
            <div className="section-header-row">
                <h3>3. Лекарственные препараты</h3>
                <button className="btn-secondary small" onClick={onAdd}>+ Добавить препарат</button>
            </div>

            {data.map((drug, index) => (
                <div key={index} className="card drug-card mb-4">
                    <div className="card-header-row">
                        <h4>Препарат #{index + 1}</h4>
                        {data.length > 1 && (
                            <button className="btn-danger small" onClick={() => onRemove(index)}>Удалить</button>
                        )}
                    </div>

                    <h5>Общие сведения</h5>
                    <div className="grid-2">
                        <div className="form-group">
                            <label htmlFor={`drug-characterization-${index}`}>Характеристика препарата <span className="req-dot">*</span></label>
                            <select
                                id={`drug-characterization-${index}`}
                                value={drug.drugcharacterization}
                                onChange={(e) => onUpdate(index, 'drugcharacterization', e.target.value)}
                            >
                                <option value="">Выбрать...</option>
                                <option value="1">Подозреваемый</option>
                                <option value="2">Сопутствующий</option>
                                <option value="3">Взаимодействующий</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-name-${index}`}>Название препарата <span className="req-dot">*</span></label>
                            <input
                                id={`drug-name-${index}`}
                                type="text"
                                className={!drug.medicinalproductname ? 'error-border' : ''}
                                value={drug.medicinalproductname || ''}
                                onChange={(e) => onUpdate(index, 'medicinalproductname', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid-3">
                        <div className="form-group">
                            <label htmlFor={`drug-holder-${index}`}>Держатель РУ</label>
                            <input
                                id={`drug-holder-${index}`}
                                type="text"
                                value={drug.drugauthorizationholder || ''}
                                onChange={(e) => onUpdate(index, 'drugauthorizationholder', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-batch-${index}`}>Номер серии</label>
                            <input
                                id={`drug-batch-${index}`}
                                type="text"
                                value={drug.drugbatchnumber || ''}
                                onChange={(e) => onUpdate(index, 'drugbatchnumber', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-indication-${index}`}>Показание</label>
                            <input
                                id={`drug-indication-${index}`}
                                type="text"
                                value={drug.drugindication || ''}
                                onChange={(e) => onUpdate(index, 'drugindication', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label htmlFor={`drug-meddra-version-${index}`}>Версия MedDRA показания</label>
                            <input
                                id={`drug-meddra-version-${index}`}
                                type="text"
                                value={drug.drugindicationmeddraversion || ''}
                                onChange={(e) => onUpdate(index, 'drugindicationmeddraversion', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-meddra-llt-${index}`}>Код LLT MedDRA показания</label>
                            <input
                                id={`drug-meddra-llt-${index}`}
                                type="text"
                                value={drug.drugindicationmeddrallt || ''}
                                onChange={(e) => onUpdate(index, 'drugindicationmeddrallt', e.target.value)}
                            />
                        </div>
                    </div>

                    <hr />
                    <h5>Режим дозирования</h5>
                    <div className="form-group">
                        <label htmlFor={`drug-dose-text-${index}`}>Текст описания дозировки</label>
                        <input
                            id={`drug-dose-text-${index}`}
                            type="text"
                            value={drug.drugdosagetext || ''}
                            onChange={(e) => onUpdate(index, 'drugdosagetext', e.target.value)}
                        />
                    </div>
                    <div className="grid-4">
                        <div className="form-group">
                            <label htmlFor={`drug-dose-num-${index}`}>Доза (число)</label>
                            <input
                                id={`drug-dose-num-${index}`}
                                type="number"
                                value={drug.drugstructuredosagenumb || ''}
                                onChange={(e) => onUpdate(index, 'drugstructuredosagenumb', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-dose-unit-${index}`}>Единица измерения</label>
                            <select
                                id={`drug-dose-unit-${index}`}
                                value={drug.drugstructuredosageunit}
                                onChange={(e) => onUpdate(index, 'drugstructuredosageunit', e.target.value)}
                            >
                                <option value="">...</option>
                                <option value="001">мг</option>
                                <option value="002">мл</option>
                                <option value="003">таблетка</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-route-${index}`}>Путь введения</label>
                            <select
                                id={`drug-route-${index}`}
                                value={drug.drugadministrationroute}
                                onChange={(e) => onUpdate(index, 'drugadministrationroute', e.target.value)}
                            >
                                <option value="">...</option>
                                <option value="048">Перорально</option>
                                <option value="061">Подкожно</option>
                                <option value="041">Внутривенно</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-form-${index}`}>Лекарственная форма</label>
                            <select
                                id={`drug-form-${index}`}
                                value={drug.drugdosageform}
                                onChange={(e) => onUpdate(index, 'drugdosageform', e.target.value)}
                            >
                                <option value="">...</option>
                                <option value="TAB">Таблетка</option>
                                <option value="CAP">Капсула</option>
                                <option value="SOL">Раствор</option>
                            </select>
                        </div>
                    </div>

                    <hr />
                    <h5>Временные параметры приема</h5>
                    <div className="grid-2">
                        <div className="form-group">
                            <label htmlFor={`drug-start-date-${index}`}>Дата начала</label>
                            <input
                                id={`drug-start-date-${index}`}
                                type="date"
                                value={drug.drugstartdate || ''}
                                onChange={(e) => onUpdate(index, 'drugstartdate', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-end-date-${index}`}>Дата окончания</label>
                            <input
                                id={`drug-end-date-${index}`}
                                type="date"
                                value={drug.drugenddate || ''}
                                onChange={(e) => onUpdate(index, 'drugenddate', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid-2 mt-2">
                        <div className="form-group">
                            <label htmlFor={`drug-duration-${index}`}>Длительность терапии</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    id={`drug-duration-${index}`}
                                    type="number"
                                    className="form-control"
                                    value={drug.drugtreatmentduration}
                                    onChange={(e) => onUpdate(index, 'drugtreatmentduration', e.target.value)}
                                    style={{ flex: 1 }}
                                />
                                <select
                                    id={`drug-duration-unit-${index}`}
                                    value={drug.drugtreatmentdurationunit}
                                    onChange={(e) => onUpdate(index, 'drugtreatmentdurationunit', e.target.value)}
                                    style={{ flex: 1 }}
                                >
                                    <option value="">Ед. изм...</option>
                                    <option value="804">День/Дни</option>
                                    <option value="802">Месяц(ы)</option>
                                    <option value="801">Год(ы)</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-additional-${index}`}>Дополнительная информация</label>
                            <textarea
                                id={`drug-additional-${index}`}
                                className="form-control"
                                value={drug.drugadditional}
                                onChange={(e) => onUpdate(index, 'drugadditional', e.target.value)}
                                rows="3"
                            />
                        </div>
                    </div>

                    <hr />
                    <h5>Действия</h5>
                    <div className="grid-2">
                        <div className="form-group">
                            <label htmlFor={`drug-action-${index}`}>Мера, принятая в отношении препарата</label>
                            <select
                                id={`drug-action-${index}`}
                                value={drug.drugactiontaken}
                                onChange={(e) => onUpdate(index, 'drugactiontaken', e.target.value)}
                            >
                                <option value="">...</option>
                                <option value="1">Отменен</option>
                                <option value="2">Доза снижена</option>
                                <option value="3">Доза повышена</option>
                                <option value="4">Без изменений</option>
                                <option value="5">Неизвестно</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor={`drug-recurrence-${index}`}>Возобновление реакции при повторном приеме</label>
                            <select
                                id={`drug-recurrence-${index}`}
                                value={drug.drugreactionrecurreadministration}
                                onChange={(e) => onUpdate(index, 'drugreactionrecurreadministration', e.target.value)}
                            >
                                <option value="">...</option>
                                <option value="1">Да</option>
                                <option value="2">Нет</option>
                                <option value="3">Неизвестно</option>
                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DrugsSection;