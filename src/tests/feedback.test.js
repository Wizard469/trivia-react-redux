import Feedback from "../pages/Feedback"
import React from 'react';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks', () => {
  test('Testa se componente renderiza corretamente e botão Play Again', () => {
    renderWithRouterAndRedux(<Feedback />, {
      player: {
        name: 'Teste',
        assertions: 3,
        score: 254,
        gravatarEmail: 'teste@teste.com',
      }
    },
    '/feedback',
    );
    const playAgainBtn = screen.getByTestId('btn-play-again');
    userEvent.click(playAgainBtn);
  });

  test('Testa se botão Ranking funciona corretamente', () => {
    renderWithRouterAndRedux(<Feedback />, {
      player: {
        name: 'Teste',
        assertions: 3,
        score: 254,
        gravatarEmail: 'teste@teste.com',
      }
    },
    '/feedback',
    );
    const btnRanking = screen.getByTestId('btn-ranking');
    userEvent.click(btnRanking);
  })

})