import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScheduleTable from './index';

describe('ScheduleTable', () => {
  const mockHandleSelectWeek = jest.fn();
  const mockScheduleData = {
    table: {
      name: 'КТбо1-1',
      week: 1,
      table: [
        ['День/Пара', '1 пара', '2 пара'],
        ['', '08:00-09:30', '09:40-11:10'],
        ['Понедельник, 01.01', 'Лекция Математика Иванов И.И. А-101', ''],
        ['Вторник, 02.01', '', 'Практика Физика Петров П.П. Б-202'],
      ],
    },
    weeks: [1, 2],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders schedule table with data', () => {
    render(
      <ScheduleTable scheduleData={mockScheduleData} handleSelectWeek={mockHandleSelectWeek} />
    );
    expect(screen.getByText('Расписание группы КТбо1-1')).toBeInTheDocument();
    expect(screen.getByText(/Понедельник/)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Математика'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Иванов И.И.'))).toBeInTheDocument();
    expect(screen.getByText('А-101')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Практика'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Физика'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Петров П.П.'))).toBeInTheDocument();
    expect(screen.getByText('Б-202')).toBeInTheDocument();
  });

  it('calls handleSelectWeek when week is changed', () => {
    render(
      <ScheduleTable scheduleData={mockScheduleData} handleSelectWeek={mockHandleSelectWeek} />
    );
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    const week2 = screen.getByText('2 неделя');
    fireEvent.click(week2);
    expect(mockHandleSelectWeek).toHaveBeenCalledWith(2);
  });

  it('shows message if scheduleData is missing', () => {
    render(
      <ScheduleTable scheduleData={null} handleSelectWeek={mockHandleSelectWeek} />
    );
    expect(screen.getByText('Данные расписания не загружены')).toBeInTheDocument();
  });
}); 