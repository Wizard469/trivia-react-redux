import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import React from 'react';
import App from '../App';
import { tokenResponse } from "../../cypress/mocks/token";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
  it('Testa se o o componente renderiza corretamente', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(tokenResponse)
    })
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'User Test');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.click(playBtn);
  });

  it('Testa o botão de configurações', () => {
    renderWithRouterAndRedux(<App />);
    const settingsBtn = screen.getByTestId('btn-settings');
    userEvent.click(settingsBtn);
  })
})