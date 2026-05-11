import React from 'react';
import SmartInput from '../components/SmartInput';

const InvestigationSection = ({ data, onChange }) => {
    const handleChange = (e) => onChange('investigation', e.target.name, e.target.value);

    return (
        <div className="card fade-in">
            <h3>6. Расследования и ПА-исследования</h3>

            <h4>Данные исследований</h4>
            <div className="grid-2">
                <SmartInput
                    label="Название исследования"
                    name="studyname"
                    value={data.studyname}
                    onChange={handleChange}
                />
                <SmartInput
                    label="Спонсор исследования"
                    name="studysponsorname"
                    value={data.studysponsorname}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group" style={{ marginTop: '15px' }}>
                <label htmlFor="studytypenumb">Тип исследования</label>
                <select id="studytypenumb" name="studytypenumb" value={data.studytypenumb} onChange={handleChange}>
                    <option value="">Выбрать...</option>
                    <option value="1">Клиническое исследование</option>
                    <option value="2">Индивидуальное применение</option>
                    <option value="3">Другие исследования</option>
                </select>
            </div>

            <hr />
            <h4>Патологоанатомические исследования</h4>

            <div className="form-group">
                <label htmlFor="autopsyyesno">Проводилось ли вскрытие?</label>
                <select id="autopsyyesno" name="autopsyyesno" value={data.autopsyyesno} onChange={handleChange}>
                    <option value="">...</option>
                    <option value="1">Да</option>
                    <option value="2">Нет</option>
                    <option value="3">Неизвестно</option>
                </select>
            </div>

            {data.autopsyyesno === '1' && (
                <div className="form-group">
                    <label htmlFor="autopsydonedeterm">Заключение по данным вскрытия</label>
                    <textarea
                        id="autopsydonedeterm"
                        name="autopsydonedeterm"
                        value={data.autopsydonedeterm}
                        onChange={handleChange}
                        rows="4"
                        className="form-control"
                        placeholder="Результаты вскрытия..."
                    />
                </div>
            )}
        </div>
    );
};

export default InvestigationSection;