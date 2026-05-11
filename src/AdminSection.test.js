import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminSection from './sections/AdminSection';

describe('AdminSection', () => {
    const mockData = {
        safetyreportid: '',
        safetyreportversion: '',
        safetyreportform: '',
        receiptdate: '',
        transmissiondate: '',
        reportergivenname: '',
        reporterfamilyname: '',
        reporterorganization: '',
        reportercountry: '',
        qualification: '',
        literaturesource: '',
        senderorganization: '',
        senderdepartment: '',
        sendertype: '',
        receiverorganization: '',
        receiverid: '',
    };

    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test('рендерит все поля формы', () => {
        render(<AdminSection data={mockData} onChange={mockOnChange} />);

        expect(screen.getByText(/Идентификатор отчета/i)).toBeInTheDocument();
        expect(screen.getByText(/Версия отчета/i)).toBeInTheDocument();
        expect(screen.getByText(/Форма отчета/i)).toBeInTheDocument();
    });

    test('вызывает onChange при вводе текста', async () => {
        render(<AdminSection data={mockData} onChange={mockOnChange} />);

        const inputs = screen.getAllByRole('textbox');
        const reportIdInput = inputs[0]; 

        await userEvent.type(reportIdInput, 'TEST-001');

        
        expect(mockOnChange).toHaveBeenCalled();
    });

    test('вызывает onChange при выборе формы отчета', async () => {
        render(<AdminSection data={mockData} onChange={mockOnChange} />);

        const formSelect = screen.getByRole('combobox', { name: /Форма отчета/i });
        await userEvent.selectOptions(formSelect, 'CIOMS');

        expect(mockOnChange).toHaveBeenCalled();
    });
});