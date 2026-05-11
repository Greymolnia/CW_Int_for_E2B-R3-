import React from 'react';
import SmartInput from '../components/SmartInput';

const ReactionsSection = ({ data, onUpdate, onAdd, onRemove }) => {
  return (
    <div className="fade-in">
      <div className="section-header-row">
        <h3>4. Нежелательные реакции</h3>
        <button className="btn-secondary small" onClick={onAdd}>+ Добавить реакцию</button>
      </div>

      {data.map((reaction, index) => (
        <div key={index} className="card drug-card mb-4">
          <div className="card-header-row">
            <h4>Реакция #{index + 1}</h4>
            {data.length > 1 && (
              <button className="btn-danger small" onClick={() => onRemove(index)}>Удалить</button>
            )}
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label htmlFor={`reaction-${index}-description`}>
                Описание реакции
                <span className="req-dot">*</span>
              </label>
              <input
                id={`reaction-${index}-description`}
                className={!reaction.reactionprimarysourcereaction ? 'error-border' : ''}
                type="text"
                value={reaction.reactionprimarysourcereaction || ''}
                onChange={(e) => onUpdate(index, 'reactionprimarysourcereaction', e.target.value)}
                placeholder="Опишите реакцию как указано в первичном источнике..."
              />
            </div>
            <div className="form-group">
              <label htmlFor={`reaction-${index}-meddra`}>Код LLT MedDRA</label>
              <input
                id={`reaction-${index}-meddra`}
                type="text"
                value={reaction.reactionmeddrallt || ''}
                onChange={(e) => onUpdate(index, 'reactionmeddrallt', e.target.value)}
                placeholder="например, 10019233"
              />
            </div>
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label htmlFor={`reaction-${index}-outcome`}>Исход</label>
              <select
                id={`reaction-${index}-outcome`}
                value={reaction.reactionoutcome || ''}
                onChange={(e) => onUpdate(index, 'reactionoutcome', e.target.value)}
              >
                <option value="">...</option>
                <option value="1">Выздоровление/Разрешение</option>
                <option value="2">Выздоровление/Разрешение наступает</option>
                <option value="3">Не выздоровел/Не разрешилось</option>
                <option value="4">Выздоровление/Разрешение с последствиями</option>
                <option value="5">Летальный исход</option>
                <option value="6">Неизвестно</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`reaction-${index}-startdate`}>Дата начала</label>
              <input
                id={`reaction-${index}-startdate`}
                type="date"
                value={reaction.reactionstartdate || ''}
                onChange={(e) => onUpdate(index, 'reactionstartdate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`reaction-${index}-enddate`}>Дата окончания</label>
              <input
                id={`reaction-${index}-enddate`}
                type="date"
                value={reaction.reactionenddate || ''}
                onChange={(e) => onUpdate(index, 'reactionenddate', e.target.value)}
              />
            </div>
          </div>

          <div className="grid-2" style={{ maxWidth: '400px', marginTop: '15px' }}>
            <div className="form-group">
              <label htmlFor={`reaction-${index}-duration`}>Длительность</label>
              <input
                id={`reaction-${index}-duration`}
                type="number"
                value={reaction.reactionduration || ''}
                onChange={(e) => onUpdate(index, 'reactionduration', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`reaction-${index}-durationunit`}>Единица измерения</label>
              <select
                id={`reaction-${index}-durationunit`}
                value={reaction.reactiondurationunit || ''}
                onChange={(e) => onUpdate(index, 'reactiondurationunit', e.target.value)}
              >
                <option value="">...</option>
                <option value="804">День/Дни</option>
                <option value="805">Час(ы)</option>
                <option value="802">Месяц(ы)</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReactionsSection;