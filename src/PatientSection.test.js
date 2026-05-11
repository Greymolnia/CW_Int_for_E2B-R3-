import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PatientSection from './sections/PatientSection';

describe('PatientSection', () => {
    const mockData = {
        patientinitial: '',
        patientsex: '',
        patientagegroup: '',
        patientage: '',
        patientageunit: '',
        patientweight: '',
        patientheight: '',
        patientmedicalhistorytext: '',
        patientdeathdate: '',
    };

    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test('рендерит форму пациента', () => {
        render(<PatientSection data={mockData} onChange={mockOnChange} />);

        expect(screen.getByText(/Информация о пациенте/i)).toBeInTheDocument();
        expect(screen.getByText(/Инициалы/i)).toBeInTheDocument();
        expect(screen.getByText(/Пол/i)).toBeInTheDocument();
    });

    test('вызывает onChange при вводе инициалов', async () => {
        render(<PatientSection data={mockData} onChange={mockOnChange} />);

        const inputs = screen.getAllByRole('textbox');
        const initialsInput = inputs[0];
        await userEvent.type(initialsInput, 'Иванов И.И.');

        expect(mockOnChange).toHaveBeenCalled();
    });

    test('вызывает onChange при выборе пола', async () => {
        render(<PatientSection data={mockData} onChange={mockOnChange} />);

        const sexSelect = screen.getByRole('combobox', { name: /Пол/i });
        await userEvent.selectOptions(sexSelect, '1');

        expect(mockOnChange).toHaveBeenCalled();
    });
});