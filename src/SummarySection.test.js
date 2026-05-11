import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummarySection from './sections/SummarySection';

describe('SummarySection', () => {
    const mockData = {
        companyassessmentmeddrallt: '',
        companyassessmentcomment: '',
        seriousnessdeath: false,
        seriousnesslifethreatening: false,
        seriousnesshospitalization: false,
        seriousnessdisabling: false,
        seriousnesscongenitalanomali: false,
        seriousnessother: false,
        causalityassessmentsource: '',
        causalityassessmentmethod: '',
        causalityassessmentresult: '',
        documentlist: '',
        reportnullification: '',
        reportnullificationreason: '',
        narrativeincludeclinical: '',
        mostrecentreceiptdate: '',
        duplicate: '1',
        duplicatesource: '',
    };

    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test('рендерит заголовок секции', () => {
        render(<SummarySection data={mockData} onChange={mockOnChange} />);
        expect(screen.getByText('7. Сводные данные о случае')).toBeInTheDocument();
    });

    test('рендерит все основные разделы', () => {
        render(<SummarySection data={mockData} onChange={mockOnChange} />);
        expect(screen.getByText('Оценка компании')).toBeInTheDocument();
        expect(screen.getByText('Критерии серьезности')).toBeInTheDocument();
        expect(screen.getByText('Причинно-следственная связь')).toBeInTheDocument();
    });

    test('вызывает onChange при вводе кода LLT', async () => {
        render(<SummarySection data={mockData} onChange={mockOnChange} />);
        const input = screen.getByLabelText('Код LLT MedDRA оценки компании');
        await userEvent.type(input, '10019233');
        expect(mockOnChange).toHaveBeenCalled();
    });

    test('вызывает onChange для нарратива', async () => {
        render(<SummarySection data={mockData} onChange={mockOnChange} />);
        const textarea = screen.getByRole('textbox', { name: /Сводное описание случая/ });
        await userEvent.type(textarea, 'Полное описание');
        expect(mockOnChange).toHaveBeenCalled();
    });

    test('показывает поле причины аннулирования при выборе аннулирования', async () => {
        const dataWithNullification = {
            ...mockData,
            reportnullification: '1',
            reportnullificationreason: '',
        };

        render(<SummarySection data={dataWithNullification} onChange={mockOnChange} />);

        const reasonField = screen.getByLabelText('Причина аннулирования');
        expect(reasonField).toBeInTheDocument();
    });

    test('показывает поле источника дубликата при выборе дубликата', async () => {
        const dataWithDuplicate = {
            ...mockData,
            duplicate: '2',
            duplicatesource: '',
        };

        render(<SummarySection data={dataWithDuplicate} onChange={mockOnChange} />);

        const sourceField = screen.getByLabelText('Источник дубликата');
        expect(sourceField).toBeInTheDocument();
    });
});