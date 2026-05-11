import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DrugsSection from './sections/DrugsSection';

describe('DrugsSection', () => {
    const mockData = [{
        drugcharacterization: '',
        medicinalproductname: '',
        drugauthorizationholder: '',
        drugbatchnumber: '',
        drugindication: '',
        drugindicationmeddraversion: '',
        drugindicationmeddrallt: '',
        drugdosagetext: '',
        drugstructuredosagenumb: '',
        drugstructuredosageunit: '',
        drugadministrationroute: '',
        drugdosageform: '',
        drugstartdate: '',
        drugenddate: '',
        drugtreatmentduration: '',
        drugtreatmentdurationunit: '',
        drugactiontaken: '',
        drugreactionrecurreadministration: '',
        drugadditional: '',
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
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        expect(screen.getByText('3. Лекарственные препараты')).toBeInTheDocument();
    });

    test('рендерит кнопку добавления препарата', () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        expect(screen.getByText('+ Добавить препарат')).toBeInTheDocument();
    });

    test('вызывает onAdd при клике', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        await userEvent.click(screen.getByText('+ Добавить препарат'));
        expect(mockOnAdd).toHaveBeenCalled();
    });

    test('рендерит поля для препарата', () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
        expect(screen.getByText('Характеристика препарата')).toBeInTheDocument();
        expect(screen.getByText('Название препарата')).toBeInTheDocument();
    });

    test('обновляет характеристику препарата', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const select = screen.getByRole('combobox', { name: /Характеристика препарата/i });
        await userEvent.selectOptions(select, '1');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет держателя РУ', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const input = screen.getByRole('textbox', { name: /Держатель РУ/i });
        await userEvent.type(input, 'Фармкомпания');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет путь введения', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const select = screen.getByRole('combobox', { name: /Путь введения/i });
        await userEvent.selectOptions(select, '048');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет дату начала', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const dateInput = screen.getByLabelText(/Дата начала/i);
        await userEvent.type(dateInput, '2026-01-01');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('отображает кнопку удаления для нескольких препаратов', () => {
        const multipleDrugs = [{ ...mockData[0] }, { ...mockData[0] }];

        render(<DrugsSection data={multipleDrugs} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const deleteButtons = screen.getAllByText('Удалить');
        expect(deleteButtons.length).toBe(2);
    });

    test('обновляет название препарата', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const input = screen.getByRole('textbox', { name: /Название препарата/i });
        await userEvent.type(input, 'Аспирин');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет номер серии', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const input = screen.getByRole('textbox', { name: /Номер серии/i });
        await userEvent.type(input, '12345');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет показание', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const input = screen.getByRole('textbox', { name: /Показание/i });
        await userEvent.type(input, 'Гипертония');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет версию MedDRA показания', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const input = screen.getByRole('textbox', { name: /Версия MedDRA показания/i });
        await userEvent.type(input, '24.0');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет код LLT MedDRA показания', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const input = screen.getByRole('textbox', { name: /Код LLT MedDRA показания/i });
        await userEvent.type(input, '10019233');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет текст описания дозировки', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const input = screen.getByRole('textbox', { name: /Текст описания дозировки/i });
        await userEvent.type(input, 'По 1 таблетке 2 раза в день');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет дозу (число)', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const input = screen.getByRole('spinbutton', { name: /Доза \(число\)/i });
        await userEvent.type(input, '100');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет единицу измерения дозы', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const select = screen.getByRole('combobox', { name: /Единица измерения/i });
        await userEvent.selectOptions(select, '001');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет лекарственную форму', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const select = screen.getByRole('combobox', { name: /Лекарственная форма/i });
        await userEvent.selectOptions(select, 'TAB');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет дату окончания', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const dateInput = screen.getByLabelText(/Дата окончания/i);
        await userEvent.type(dateInput, '2026-01-31');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет длительность терапии', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const input = screen.getByRole('spinbutton', { name: /Длительность терапии/i });
        await userEvent.type(input, '30');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет дополнительную информацию', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const textarea = screen.getByRole('textbox', { name: /Дополнительная информация/i });
        await userEvent.type(textarea, 'Дополнительные замечания по препарату');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет меру, принятую в отношении препарата', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const select = screen.getByRole('combobox', { name: /Мера, принятая в отношении препарата/i });
        await userEvent.selectOptions(select, '1');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('обновляет информацию о возобновлении реакции', async () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const select = screen.getByRole('combobox', { name: /Возобновление реакции при повторном приеме/i });
        await userEvent.selectOptions(select, '1');

        expect(mockOnUpdate).toHaveBeenCalled();
    });

    test('вызывает onRemove при клике на удаление', async () => {
        const multipleDrugs = [{ ...mockData[0] }, { ...mockData[0] }];

        render(<DrugsSection data={multipleDrugs} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        const deleteButtons = screen.getAllByText('Удалить');
        await userEvent.click(deleteButtons[0]);

        expect(mockOnRemove).toHaveBeenCalled();
    });

    test('отображает заголовок с номером препарата', () => {
        render(<DrugsSection data={mockData} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        expect(screen.getByText('Препарат #1')).toBeInTheDocument();
    });

    test('отображает правильный номер препарата для второго препарата', () => {
        const multipleDrugs = [{ ...mockData[0] }, { ...mockData[0] }];

        render(<DrugsSection data={multipleDrugs} onUpdate={mockOnUpdate} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

        expect(screen.getByText('Препарат #2')).toBeInTheDocument();
    });
});