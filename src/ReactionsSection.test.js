import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactionsSection from './sections/ReactionsSection';

describe('ReactionsSection', () => {
    const mockData = [{
        reactionprimarysourcereaction: '',
        reactionmeddrallt: '',
        reactionoutcome: '',
        reactionstartdate: '',
        reactionenddate: '',
        reactionduration: '',
        reactiondurationunit: '',
    }];

    const mockOnUpdate = jest.fn();
    const mockOnAdd = jest.fn();
    const mockOnRemove = jest.fn();

    beforeEach(() => {
        mockOnUpdate.mockClear();
        mockOnAdd.mockClear();
        mockOnRemove.mockClear();
    });

    test('рендерит кнопку добавления реакции', () => {
        render(<ReactionsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        expect(screen.getByText(/Добавить реакцию/i)).toBeInTheDocument();
    });

    test('вызывает onAdd при клике', async () => {
        render(<ReactionsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        await userEvent.click(screen.getByText(/Добавить реакцию/i));
        expect(mockOnAdd).toHaveBeenCalled();
    });

    test('рендерит поле описания реакции', () => {
        render(<ReactionsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        expect(screen.getByText(/Описание реакции/i)).toBeInTheDocument();
    });

    test('обновляет описание реакции', async () => {
        render(<ReactionsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const descriptionInput = screen.getByRole('textbox', { name: /Описание реакции/i });
        await userEvent.type(descriptionInput, 'Тестовая реакция');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет исход реакции', async () => {
        render(<ReactionsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const outcomeSelect = screen.getByRole('combobox', { name: /Исход/i });
        await userEvent.selectOptions(outcomeSelect, '1');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет дату начала реакции', async () => {
        render(<ReactionsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const dateInput = screen.getByLabelText('Дата начала');
        await userEvent.type(dateInput, '2026-01-01');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет дату окончания реакции', async () => {
        render(<ReactionsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const dateInput = screen.getByLabelText('Дата окончания');
        await userEvent.type(dateInput, '2026-01-10');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет длительность реакции', async () => {
        render(<ReactionsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const durationInput = screen.getByLabelText('Длительность');
        await userEvent.type(durationInput, '7');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет единицу измерения длительности', async () => {
        render(<ReactionsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const unitSelect = screen.getByLabelText('Единица измерения');
        await userEvent.selectOptions(unitSelect, '804');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('отображает кнопку удаления для нескольких реакций', () => {
        const multipleReactions = [
            { ...mockData[0], reactionprimarysourcereaction: 'Реакция 1' },
            { ...mockData[0], reactionprimarysourcereaction: 'Реакция 2' }
        ];

        render(<ReactionsSection data={multipleReactions} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const deleteButtons = screen.getAllByText('Удалить');
        expect(deleteButtons.length).toBe(2);
    });
});