import React from 'react';
import SmartInput from '../components/SmartInput';

const PatientSection = ({ data, onChange }) => {
    const handleChange = (e) => onChange('patient', e.target.name, e.target.value);

    return (
        <div className="card fade-in">
            <h3>2. Информация о пациенте</h3>

            <div className="grid-3">
                <SmartInput label="Инициалы" name="patientinitial" value={data.patientinitial} onChange={handleChange} />
                <div className="form-group">
                    <label htmlFor="patientsex">Пол</label>
                    <select id="patientsex" name="patientsex" value={data.patientsex} onChange={handleChange}>
                        <option value="">Не указано</option>
                        <option value="1">Мужской</option>
                        <option value="2">Женский</option>
                        <option value="9">Неизвестно</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="patientagegroup">Возрастная группа</label>
                    <select id="patientagegroup" name="patientagegroup" value={data.patientagegroup} onChange={handleChange}>
                        <option value="">Не указано</option>
                        <option value="1">Новорожденный</option>
                        <option value="2">Младенец</option>
                        <option value="3">Ребенок</option>
                        <option value="4">Подросток</option>
                        <option value="5">Взрослый</option>
                        <option value="6">Пожилой</option>
                    </select>
                </div>
            </div>

            <div className="grid-2">
                <div className="grid-2" style={{ gap: '10px' }}>
                    <SmartInput label="Возраст" name="patientage" type="number" value={data.patientage} onChange={handleChange} />
                    <div className="form-group">
                        <label htmlFor="patientageunit">Единица измерения</label>
                        <select id="patientageunit" name="patientageunit" value={data.patientageunit} onChange={handleChange}>
                            <option value="">...</option>
                            <option value="800">Декада</option>
                            <option value="801">Год</option>
                            <option value="802">Месяц</option>
                            <option value="803">Неделя</option>
                            <option value="804">День</option>
                            <option value="805">Час</option>
                        </select>
                    </div>
                </div>
                <SmartInput label="Дата смерти" name="patientdeathdate" value={data.patientdeathdate} onChange={handleChange} isDate={true} />
            </div>

            <div className="grid-2">
                <SmartInput label="Вес (кг)" name="patientweight" type="number" step="0.1" value={data.patientweight} onChange={handleChange} />
                <SmartInput label="Рост (см)" name="patientheight" type="number" value={data.patientheight} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="patientmedicalhistorytext">История болезни / Анамнез</label>
                <textarea
                    id="patientmedicalhistorytext"
                    name="patientmedicalhistorytext"
                    value={data.patientmedicalhistorytext}
                    onChange={handleChange}
                    rows="4"
                    className="form-control"
                    placeholder="История болезни, сопутствующие заболевания, аллергические реакции..."
                />
            </div>
        </div>
    );
};

export default PatientSection;