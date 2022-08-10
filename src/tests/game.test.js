import App from "../App";
import React from 'react';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { invalidTokenQuestionsResponse, questionsResponse } from "../../cypress/mocks/questions";

const CORRECT_ALTERNATIVE = 'correct-answer';
const INCORRECT_ALTERNATIVE = 'wrong-answer-0';

beforeEach(() => {
  jest.clearAllMocks();
})
describe('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () => {
  test('Testa se componente renderiza corretamente', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse)
    });
    // const getQuestions = jest.fn().mockResolvedValue(questionsResponse);
    const { history } = renderWithRouterAndRedux(<App />, {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      }
    },
    '/',
    );

    const nameInput = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(nameInput, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');

    const playBtn = screen.getByTestId('btn-play');
    userEvent.click(playBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    // await waitForElementToBeRemoved(loading).catch(err =>
    //   console.log(err),
    // );

    let correctAnswer = screen.getByTestId(CORRECT_ALTERNATIVE);
    userEvent.click(correctAnswer);
    let nextQuestion = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion);


    correctAnswer = screen.getByTestId(CORRECT_ALTERNATIVE);
    userEvent.click(correctAnswer);
    nextQuestion = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion);


    correctAnswer = screen.getByTestId(CORRECT_ALTERNATIVE);
    userEvent.click(correctAnswer);
    nextQuestion = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion);

    correctAnswer = screen.getByTestId(CORRECT_ALTERNATIVE);
    userEvent.click(correctAnswer);
    nextQuestion = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion);

    correctAnswer = screen.getByTestId(CORRECT_ALTERNATIVE);
    userEvent.click(correctAnswer);
    nextQuestion = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion);

    expect(screen.getByTestId('feedback-text')).toBeDefined();
    const rankingBtn = screen.getByTestId('btn-ranking');
    userEvent.click(rankingBtn);

    });

    test('Testa se componente renderiza corretamente', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(questionsResponse)
      });
      // const getQuestions = jest.fn().mockResolvedValue(questionsResponse);
      const { history } = renderWithRouterAndRedux(<App />, {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        }
      },
      '/',
      );
  
      const nameInput = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
  
      userEvent.type(nameInput, 'teste2');
      userEvent.type(inputEmail, 'teste2@teste.com');
  
      const playBtn = screen.getByTestId('btn-play');
      userEvent.click(playBtn);
  
      await waitFor(() => expect(fetch).toHaveBeenCalled());
      // await waitForElementToBeRemoved(loading).catch(err =>
      //   console.log(err),
      // );
  
      let incorrectAnswer = screen.getByTestId(INCORRECT_ALTERNATIVE);
      userEvent.click(incorrectAnswer);
      let nextQuestion = screen.getByTestId('btn-next');
      userEvent.click(nextQuestion);
  
  
      incorrectAnswer = screen.getByTestId(INCORRECT_ALTERNATIVE);
      userEvent.click(incorrectAnswer);
      nextQuestion = screen.getByTestId('btn-next');
      userEvent.click(nextQuestion);
  
  
      incorrectAnswer = screen.getByTestId(INCORRECT_ALTERNATIVE);
      userEvent.click(incorrectAnswer);
      nextQuestion = screen.getByTestId('btn-next');
      userEvent.click(nextQuestion);
  
      incorrectAnswer = screen.getByTestId(INCORRECT_ALTERNATIVE);
      userEvent.click(incorrectAnswer);
      nextQuestion = screen.getByTestId('btn-next');
      userEvent.click(nextQuestion);
  
      incorrectAnswer = screen.getByTestId(INCORRECT_ALTERNATIVE);
      userEvent.click(incorrectAnswer);
      nextQuestion = screen.getByTestId('btn-next');
      userEvent.click(nextQuestion);
  
      expect(screen.getByTestId('feedback-text')).toBeDefined();
      const rankingBtn = screen.getByTestId('btn-ranking');
      userEvent.click(rankingBtn);
  
      });
  
    test('Se redireciona para a página de login quando o token é inválido.', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse)
      });
      // const getQuestions = jest.fn().mockResolvedValue(invalidTokenQuestionsResponse);
      const { history } = renderWithRouterAndRedux(<App />, {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        }
      },
      '/',
      );
  
      const nameInput = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
  
      userEvent.type(nameInput, 'teste');
      userEvent.type(inputEmail, 'teste@teste.com');
  
      const playBtn = screen.getByTestId('btn-play');
      userEvent.click(playBtn);
  
      await waitFor(() => expect(fetch).toHaveBeenCalled());
  
    })
});
