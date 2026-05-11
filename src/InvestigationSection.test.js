import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InvestigationSection from './sections/InvestigationSection';

describe('InvestigationSection', () => {
    const mockData = {
        studyname: '',
        studysponsorname: '',
        studytypenumb: '',
        autopsyyesno: '',
        autopsydonedeterm: '',
    };

    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test('рендерит заголовок секции', () => {
        render(<InvestigationSection data={mockData} onChange={mockOnChange} />);
        expect(screen.getByText('6. Расследования и ПА-исследования')).toBeInTheDocument();
    });

    test('рендерит все поля ввода', () => {
        render(<InvestigationSection data={mockData} onChange={mockOnChange} />);
        expect(screen.getByLabelText('Название исследования')).toBeInTheDocument();
        expect(screen.getByLabelText('Спонсор исследования')).toBeInTheDocument();
        expect(screen.getByLabelText('Тип исследования')).toBeInTheDocument();
        expect(screen.getByLabelText('Проводилось ли вскрытие?')).toBeInTheDocument();
    });

    test('вызывает onChange при вводе названия', async () => {
        render(<InvestigationSection data={mockData} onChange={mockOnChange} />);
        const input = screen.getByLabelText('Название исследования');
        await userEvent.type(input, 'Тест');
        expect(mockOnChange).toHaveBeenCalled();
    });

    test('показывает поле вскрытия при выборе "Да"', async () => {
        const dataWithAutopsy = {
            ...mockData,
            autopsyyesno: '1',
        };

        render(<InvestigationSection data={dataWithAutopsy} onChange={mockOnChange} />);

        const autopsyField = screen.getByLabelText('Заключение по данным вскрытия');
        expect(autopsyField).toBeInTheDocument();
    });
});