import React from 'react';
import SmartInput from '../components/SmartInput';

const AdminSection = ({ data, onChange }) => {
    const handleChange = (e) => onChange('admin', e.target.name, e.target.value);

    return (
        <div className="card fade-in">
            <h3>1. Административная информация</h3>

            {/* Идентификаторы */}
            <div className="grid-3">
                <SmartInput
                    label="Идентификатор отчета"
                    name="safetyreportid"
                    value={data.safetyreportid}
                    onChange={handleChange}
                    required
                />
                <SmartInput
                    label="Версия отчета"
                    name="safetyreportversion"
                    type="number"
                    value={data.safetyreportversion}
                    onChange={handleChange}
                />
                <div className="form-group">
                    <label htmlFor="safetyreportform">Форма отчета</label>
                    <select id="safetyreportform" name="safetyreportform" value={data.safetyreportform} onChange={handleChange}>
                        <option value="">Выбрать...</option>
                        <option value="CIOMS">CIOMS I</option>
                        <option value="MedWatch">MedWatch</option>
                    </select>
                </div>
            </div>

            <div className="grid-2">
                <SmartInput
                    label="Дата получения"
                    name="receiptdate"
                    value={data.receiptdate}
                    onChange={handleChange}
                    isDate={true}
                />
                <SmartInput
                    label="Дата передачи"
                    name="transmissiondate"
                    value={data.transmissiondate}
                    onChange={handleChange}
                    isDate={true}
                />
            </div>

            <hr />
            <h4>Первичный источник</h4>

            <div className="grid-2">
                <SmartInput label="Имя" name="reportergivenname" value={data.reportergivenname} onChange={handleChange} />
                <SmartInput label="Фамилия" name="reporterfamilyname" value={data.reporterfamilyname} onChange={handleChange} />
            </div>

            <div className="grid-2">
                <SmartInput label="Организация" name="reporterorganization" value={data.reporterorganization} onChange={handleChange} />
                <div className="form-group">
                    <label htmlFor="reportercountry">Страна</label>
                    <select id="reportercountry" name="reportercountry" value={data.reportercountry} onChange={handleChange}>
                        <option value="">Выбрать...</option>
                        <option value="RU">Российская Федерация</option>
                        <option value="US">США</option>
                    </select>
                </div>
            </div>

            <div className="grid-2">
                <div className="form-group">
                    <label htmlFor="qualification">Квалификация</label>
                    <select id="qualification" name="qualification" value={data.qualification} onChange={handleChange}>
                        <option value="">Выбрать...</option>
                        <option value="1">Врач</option>
                        <option value="2">Фармацевт</option>
                        <option value="3">Другой медицинский работник</option>
                        <option value="4">Юрист</option>
                        <option value="5">Потребитель</option>
                    </select>
                </div>
                <SmartInput label="Литературный источник" name="literaturesource" value={data.literaturesource} onChange={handleChange} />
            </div>

            <hr />
            <h4>Отправитель и получатель</h4>

            <div className="grid-2">
                <SmartInput label="Организация-отправитель" name="senderorganization" value={data.senderorganization} onChange={handleChange} />
                <SmartInput label="Подразделение" name="senderdepartment" value={data.senderdepartment} onChange={handleChange} />
            </div>

            <div className="grid-3">
                <div className="form-group">
                    <label htmlFor="sendertype">Тип отправителя</label>
                    <select id="sendertype" name="sendertype" value={data.sendertype} onChange={handleChange}>
                        <option value="">Выбрать...</option>
                        <option value="1">Фармацевтическая компания</option>
                        <option value="2">Регулирующий орган</option>
                        <option value="3">Медицинский работник</option>
                        <option value="4">Региональный центр фармаконадзора</option>
                        <option value="5">Сотрудничающий центр ВОЗ</option>
                        <option value="6">Другое</option>
                    </select>
                </div>
                <SmartInput label="Организация-получатель" name="receiverorganization" value={data.receiverorganization} onChange={handleChange} />
                <SmartInput label="Идентификатор получателя" name="receiverid" value={data.receiverid} onChange={handleChange} />
            </div>
        </div>
    );
};

export default AdminSection;