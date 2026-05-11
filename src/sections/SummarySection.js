import React from 'react';
import SmartInput from '../components/SmartInput';

const SummarySection = ({ data, onChange }) => {

    const handleChange = (e) => onChange('summary', e.target.name, e.target.value);
    const handleCheckbox = (e) => onChange('summary', e.target.name, e.target.checked);

    return (
        <div className="card fade-in">
            <h3>7. Сводные данные о случае</h3>

            <div className="section-block">
                <h4>Оценка компании</h4>
                <div className="grid-2">
                    <SmartInput label="Код LLT MedDRA оценки компании" name="companyassessmentmeddrallt" value={data.companyassessmentmeddrallt} onChange={handleChange} placeholder="e.g. 10019233" />
                    <div className="form-group">
                        <label htmlFor="companyassessmentcomment">Комментарий компании к оценке случая</label>
                        <textarea id="companyassessmentcomment" name="companyassessmentcomment" value={data.companyassessmentcomment} onChange={handleChange} rows="3" className="form-control" placeholder="Комментарий..." />
                    </div>
                </div>
            </div>

            <hr />

            <div className="section-block">
                <h4>Критерии серьезности</h4>
                <div className="checkbox-grid">
                    {[
                        { name: 'seriousnessdeath', label: 'Летальный исход' },
                        { name: 'seriousnesslifethreatening', label: 'Угрожающий жизни' },
                        { name: 'seriousnesshospitalization', label: 'Госпитализация или ее продление' },
                        { name: 'seriousnessdisabling', label: 'Стойкая или значительная нетрудоспособность' },
                        { name: 'seriousnesscongenitalanomali', label: 'Врожденная аномалия/порок развития' },
                        { name: 'seriousnessother', label: 'Другое клинически значимое состояние' }
                    ].map(item => (
                        <label key={item.name} className="checkbox-label">
                            <input type="checkbox" name={item.name} checked={data[item.name]} onChange={handleCheckbox} />
                            {item.label}
                        </label>
                    ))}
                </div>
            </div>

            <hr />

            <div className="section-block">
                <h4>Причинно-следственная связь</h4>
                <div className="grid-3">
                    <div className="form-group">
                        <label htmlFor="causalityassessmentsource">Источник оценки</label>
                        <select id="causalityassessmentsource" name="causalityassessmentsource" value={data.causalityassessmentsource} onChange={handleChange}>
                            <option value="">Выбрать...</option>
                            <option value="1">Спонсор</option>
                            <option value="2">Регулирующий орган</option>
                            <option value="3">Медицинский работник</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="causalityassessmentmethod">Метод оценки</label>
                        <select id="causalityassessmentmethod" name="causalityassessmentmethod" value={data.causalityassessmentmethod} onChange={handleChange}>
                            <option value="">Выбрать...</option>
                            <option value="WHO">Оценка ВОЗ</option>
                            <option value="CIOMS">CIOMS</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="causalityassessmentresult">Результат оценки</label>
                        <select id="causalityassessmentresult" name="causalityassessmentresult" value={data.causalityassessmentresult} onChange={handleChange}>
                            <option value="">Выбрать...</option>
                            <option value="1">Определенная</option>
                            <option value="2">Вероятная</option>
                            <option value="3">Возможная</option>
                            <option value="4">Маловероятная</option>
                            <option value="5">Условная/Неклассифицированная</option>
                            <option value="6">Не поддается оценке/Неклассифицируемая</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr />

            <div className="form-group mt-2">
                <label htmlFor="narrativeincludeclinical">Сводное описание случая (Нарратив) <span className="req-dot">*</span></label>
                <textarea id="narrativeincludeclinical" name="narrativeincludeclinical" value={data.narrativeincludeclinical} onChange={handleChange} rows="8" className="form-control" placeholder="Подробное описание хронологии событий..." />
            </div>

            <hr />

            <h4>Дополнительная документация</h4>
            <div className="form-group">
                <label htmlFor="documentlist">Список прилагаемых документов</label>
                <input type="file" id="documentlist" name="documentlist" className="form-control" onChange={(e) => handleChange({ target: { name: 'documentlist', value: e.target.files[0]?.name || '' } })} />
                <small className="text-muted">Загрузка файлов (имитация)</small>
            </div>

            <div className="grid-2 mt-2">
                <div className="form-group">
                    <label htmlFor="reportnullification">Аннулирование отчета?</label>
                    <select id="reportnullification" name="reportnullification" value={data.reportnullification} onChange={handleChange}>
                        <option value="">Нет</option>
                        <option value="1">Да (Аннулировать)</option>
                    </select>
                </div>
                {data.reportnullification === '1' && (
                    <SmartInput label="Причина аннулирования" name="reportnullificationreason" value={data.reportnullificationreason} onChange={handleChange} placeholder="Укажите причину..." />
                )}
            </div>

            <hr />

            <h4>Техническая информация</h4>
            <div className="grid-3">
                <SmartInput label="Дата получения последующей информации" name="mostrecentreceiptdate" value={data.mostrecentreceiptdate} onChange={handleChange} isDate={true} />
                <div className="form-group">
                    <label htmlFor="duplicate">Дубликат отчета?</label>
                    <select id="duplicate" name="duplicate" value={data.duplicate} onChange={handleChange}>
                        <option value="1">Нет</option>
                        <option value="2">Да</option>
                    </select>
                </div>
                {data.duplicate === '2' && (
                    <SmartInput label="Источник дубликата" name="duplicatesource" value={data.duplicatesource} onChange={handleChange} placeholder="Укажите источник..." />
                )}
            </div>
        </div>
    );
};

export default SummarySection;