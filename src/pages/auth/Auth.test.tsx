import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Auth } from './index';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../entities/auth/api/authApi', () => {
  const actual = jest.requireActual('../../entities/auth/api/authApi');
  return {
    ...actual,
    useRegistrationMutation: () => [
      jest.fn(() => Promise.resolve({ unwrap: () => Promise.resolve({ token: 'fake-token' }) })),
    ],
  };
});

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
}));

describe('Auth (Registration)', () => {
  function setup() {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );
  }

  it('renders registration form fields', () => {
    setup();
    expect(screen.getByLabelText(/Введите имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Введите отчество/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Электронный адрес/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Подтвердить/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Подтвердить/i }));
    await waitFor(() => {
      expect(screen.getByText(/Имя обязательно/i)).toBeInTheDocument();
      expect(screen.getByText(/Отчество обязательно/i)).toBeInTheDocument();
      expect(screen.getByText(/Электронная почта обязательно/i)).toBeInTheDocument();
      expect(screen.getByText(/Пароль должен быть введен/i)).toBeInTheDocument();
    });
  });

  it('shows email and password validation errors', async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Электронный адрес/i), { target: { value: 'not-an-email' } });
    fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Подтвердить/i }));
    await waitFor(() => {
      expect(screen.getByText(/Некорректный адрес электронной почты/i)).toBeInTheDocument();
      expect(screen.getByText(/Минимум 8 символов/i)).toBeInTheDocument();
    });
  });
}); 