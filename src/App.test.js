import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
  });

  test('рендерит главный заголовок', () => {
    render(<App />);
    expect(screen.getByText(/Safety DB/i)).toBeInTheDocument();
  });

  test('отображает все разделы навигации', () => {
    render(<App />);
    expect(screen.getAllByText('1. Административная информация')[0]).toBeInTheDocument();
    expect(screen.getByText('2. Информация о пациенте')).toBeInTheDocument();
    expect(screen.getByText('3. Лекарственные препараты')).toBeInTheDocument();
    expect(screen.getByText('4. Нежелательные реакции')).toBeInTheDocument();
  });

  test('первый раздел активен по умолчанию', () => {
    render(<App />);
    const adminButton = screen.getAllByText('1. Административная информация')[0];
    expect(adminButton).toHaveClass('active');
  });

  test('переключение между разделами работает', async () => {
    render(<App />);
    const patientButton = screen.getByText('2. Информация о пациенте');
    await userEvent.click(patientButton);
    expect(patientButton).toHaveClass('active');
  });

  test('обрабатывает навигацию клавишей ArrowDown', () => {
    render(<App />);
    
    fireEvent.keyDown(window, { key: 'ArrowDown' });

    const patientButton = screen.getAllByText('2. Информация о пациенте')[0];
    expect(patientButton).toHaveClass('active');
  });

  test('обрабатывает навигацию клавишей ArrowUp', () => {
    render(<App />);
    
    const patientButton = screen.getAllByText('2. Информация о пациенте')[0];
    fireEvent.click(patientButton);
    
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    
    const adminButton = screen.getAllByText('1. Административная информация')[0];
    expect(adminButton).toHaveClass('active');
  });

  test('игнорирует навигацию клавишами при фокусе в input', () => {
    render(<App />);
    
    const reportIdInput = screen.getByRole('textbox', { name: /Идентификатор отчета/i });
    reportIdInput.focus();
    
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    
    const adminButton = screen.getAllByText('1. Административная информация')[0];
    expect(adminButton).toHaveClass('active');
  });

  test('игнорирует навигацию клавишами при фокусе в select', () => {
    render(<App />);
    
    const formSelect = screen.getByRole('combobox', { name: /Форма отчета/i });
    formSelect.focus();
    
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    
    const adminButton = screen.getAllByText('1. Административная информация')[0];
    expect(adminButton).toHaveClass('active');
  });

  test('игнорирует навигацию клавишами при фокусе в textarea', async () => {
    render(<App />);
    
    const summaryButton = screen.getByText('7. Сводные данные');
    await userEvent.click(summaryButton);
    
    const narrativeField = screen.getByRole('textbox', { name: /Сводное описание случая/i });
    narrativeField.focus();
    
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    
    const summaryButtonAgain = screen.getByText('7. Сводные данные');
    expect(summaryButtonAgain).toHaveClass('active');
  });

  test('не выходит за пределы при навигации вверх', () => {
    render(<App />);
    
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    
    const adminButton = screen.getAllByText('1. Административная информация')[0];
    expect(adminButton).toHaveClass('active');
  });

  test('не выходит за пределы при навигации вниз', async () => {
    render(<App />);
    
    const summaryButton = screen.getByText('7. Сводные данные');
    await userEvent.click(summaryButton);
    
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    
    const summaryButtonAgain = screen.getByText('7. Сводные данные');
    expect(summaryButtonAgain).toHaveClass('active');
  });

  test('кнопка экспорта существует', () => {
    render(<App />);
    expect(screen.getByText('Экспорт JSON')).toBeInTheDocument();
  });

  test('кнопка черновиков открывает модальное окно', async () => {
    render(<App />);
    const draftsButton = screen.getByText('Черновики');
    await userEvent.click(draftsButton);
    expect(screen.getByText(/Управление черновиками/i)).toBeInTheDocument();
  });

  test('кнопка Новый вызывает подтверждение', async () => {
    render(<App />);
    const newButton = screen.getByText('Новый');
    await userEvent.click(newButton);
    expect(window.confirm).toHaveBeenCalled();
  });

  test('заголовок отчета обновляется при вводе ID', async () => {
    render(<App />);
    const reportIdInput = screen.getByRole('textbox', { name: /Идентификатор отчета/i });
    await userEvent.type(reportIdInput, 'TEST-001');
    expect(screen.getByText(/Отчет № TEST-001/i)).toBeInTheDocument();
  });
});