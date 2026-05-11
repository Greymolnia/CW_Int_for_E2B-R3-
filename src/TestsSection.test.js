import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestsSection from './sections/TestsSection';

describe('TestsSection', () => {
    const mockData = [{
        testname: '',
        testresult: '',
        testunit: '',
        testlow: '',
        testhigh: '',
        testdate: '',
    }];

    const mockOnUpdate = jest.fn();
    const mockOnAdd = jest.fn();
    const mockOnRemove = jest.fn();

    beforeEach(() => {
        mockOnUpdate.mockClear();
        mockOnAdd.mockClear();
        mockOnRemove.mockClear();
    });

    test('рендерит заголовок секции', () => {
        render(<TestsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        expect(screen.getByText('5. Исследования и тесты')).toBeInTheDocument();
    });

    test('рендерит кнопку добавления теста', () => {
        render(<TestsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        expect(screen.getByText('+ Добавить тест')).toBeInTheDocument();
    });

    test('вызывает onAdd при клике на кнопку', async () => {
        render(<TestsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        const addButton = screen.getByText('+ Добавить тест');
        await userEvent.click(addButton);
        expect(mockOnAdd).toHaveBeenCalled();
    });

    test('рендерит поля для теста', () => {
        render(<TestsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        expect(screen.getByText('Название теста')).toBeInTheDocument();
        expect(screen.getByText('Дата проведения')).toBeInTheDocument();
        expect(screen.getByText('Результат')).toBeInTheDocument();
        expect(screen.getByText('Единица измерения')).toBeInTheDocument();
    });

    test('вызывает onUpdate при изменении названия теста', async () => {
        render(<TestsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        const input = screen.getByRole('textbox', { name: 'Название теста' });
        await userEvent.type(input, 'Глюкоза');
        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('вызывает onUpdate при изменении результата', async () => {
        render(<TestsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        const input = screen.getByRole('spinbutton', { name: 'Результат' });
        await userEvent.type(input, '5.6');
        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('показывает сообщение если нет тестов', () => {
        render(<TestsSection data={[]} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        expect(screen.getByText('Нет данных о тестах.')).toBeInTheDocument();
    });

    test('вызывает onRemove при клике на удаление', async () => {
        const multipleTests = [{ ...mockData[0] }, { ...mockData[0] }];
        render(<TestsSection data={multipleTests} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        const deleteButtons = screen.getAllByText('Удалить');
        await userEvent.click(deleteButtons[0]);
        expect(mockOnRemove).toHaveBeenCalled();
    });
});