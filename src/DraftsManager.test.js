import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DraftsManager from './components/DraftsManager';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

describe('DraftsManager', () => {
    const mockOnClose = jest.fn();
    const mockOnLoadDraft = jest.fn();
    const mockCurrentData = {
        admin: { safetyreportid: 'TEST-001' },
        patient: {},
        drugs: [],
        reactions: [],
        tests: [],
        investigation: {},
        summary: {},
    };

    beforeEach(() => {
        jest.clearAllMocks();
        localStorageMock.getItem.mockReset();
        localStorageMock.setItem.mockReset();
        localStorageMock.removeItem.mockReset();
        localStorageMock.clear.mockReset();
        window.confirm = jest.fn(() => true);
        window.alert = jest.fn();
    });

    test('не рендерится когда isOpen=false', () => {
        render(<DraftsManager isOpen={false} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);
        expect(screen.queryByText(/Управление черновиками/i)).not.toBeInTheDocument();
    });

    test('рендерится когда isOpen=true', () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
        render(<DraftsManager isOpen={true} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);
        expect(screen.getByText(/Управление черновиками/i)).toBeInTheDocument();
    });

    test('закрывается по клику на крестик', async () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
        render(<DraftsManager isOpen={true} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);

        const closeButton = screen.getByText('✕');
        await userEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalled();
    });

    test('сохраняет черновик с введенным названием', async () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
        render(<DraftsManager isOpen={true} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);

        const input = screen.getByPlaceholderText(/Введите название черновика/i);
        await userEvent.type(input, 'Мой черновик');

        const saveButton = screen.getByText('Сохранить');
        await userEvent.click(saveButton);

        expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    test('не сохраняет черновик без названия', async () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
        render(<DraftsManager isOpen={true} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);

        const saveButton = screen.getByText('Сохранить');
        await userEvent.click(saveButton);

        expect(window.alert).toHaveBeenCalledWith('Пожалуйста, введите название черновика');
        expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    test('загружает черновик при клике на кнопку Загрузить', async () => {
        const mockDrafts = [{
            id: 'draft_123',
            name: 'Тестовый черновик',
            date: new Date().toISOString(),
            safetyReportId: 'TEST-001',
            data: mockCurrentData
        }];
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDrafts));

        render(<DraftsManager isOpen={true} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);

        const loadButton = screen.getAllByText('Загрузить')[0];
        await userEvent.click(loadButton);

        expect(window.confirm).toHaveBeenCalled();
        expect(mockOnLoadDraft).toHaveBeenCalledWith(mockCurrentData);
        expect(mockOnClose).toHaveBeenCalled();
    });

    test('удаляет черновик при клике на кнопку Удалить', async () => {
        const mockDrafts = [{
            id: 'draft_123',
            name: 'Тестовый черновик',
            date: new Date().toISOString(),
            safetyReportId: 'TEST-001',
            data: mockCurrentData
        }];
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDrafts));

        render(<DraftsManager isOpen={true} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);

        const deleteButton = screen.getAllByText('Удалить')[0];
        await userEvent.click(deleteButton);

        expect(window.confirm).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    test('показывает сообщение об успешном сохранении', async () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
        render(<DraftsManager isOpen={true} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);

        const input = screen.getByPlaceholderText(/Введите название черновика/i);
        await userEvent.type(input, 'Мой черновик');

        const saveButton = screen.getByText('Сохранить');
        await userEvent.click(saveButton);

        const successMessage = await screen.findByText('Черновик успешно сохранен!');
        expect(successMessage).toBeInTheDocument();
    });

    test('показывает пустое состояние когда нет черновиков', () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

        render(<DraftsManager isOpen={true} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);

        expect(screen.getByText(/У вас пока нет сохраненных черновиков/i)).toBeInTheDocument();
    });

    test('форматирует дату корректно', () => {
        const mockDrafts = [{
            id: 'draft_123',
            name: 'Тестовый черновик',
            date: '2026-05-11T12:00:00Z',
            safetyReportId: 'TEST-001',
            data: mockCurrentData
        }];
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDrafts));

        render(<DraftsManager isOpen={true} onClose={mockOnClose} currentData={mockCurrentData} onLoadDraft={mockOnLoadDraft} />);

        const dateElements = screen.getAllByText(/Сохранен:/);
        expect(dateElements.length).toBeGreaterThan(0);
    });
});