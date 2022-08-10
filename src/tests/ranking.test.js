import App from "../App";
import React from 'react';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () => {
  test('Testa se componente renderiza corretamente', () => {
    renderWithRouterAndRedux(<App />, {
      player: {
        name: 'Teste',
        assertions: 3,
        score: 254,
        gravatarEmail: 'teste@teste.com',
      }
    },
    '/ranking',
    );
    const playAgainBtn = screen.getByRole('button', {
      name: /Play Again/i,
    });
    userEvent.click(playAgainBtn);
  });
});
