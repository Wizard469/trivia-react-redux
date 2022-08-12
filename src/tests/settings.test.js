import App from "../App";
import React from 'react';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { questionsResponse } from "../../cypress/mocks/questions";
import { getCategories } from '../utils/configQuestions';

beforeEach(() => {
  jest.clearAllMocks();
})
describe('Testa a Rota de Configurações', () => {
  test('Testa se componente renderiza corretamente', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        trivia_categories: [
          {id: 1, name: 'test'}
        ]
      })
    });
    // jest.mock('../utils/configQuestions', () => ({ getCategories: jest.fn() }))

    // getCategories.mockImplementation(() => Promise.resolve({
    //   trivia_categories: [
    //     {id: 1, name: 'test'}
    //   ]
    // }))
    // getCategories.mockResolvedValue({
    //   trivia_categories: [
    //     {id: 1, name: 'test'}
    //   ]
    // })
    const { store } = renderWithRouterAndRedux(<App />, {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
      settings: {
        category: '',
        difficulty: '',
        questionType: '',            }
    },
    '/settings',
    );
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const categorySelect = screen.getByRole('combobox', {
      name: /categoria/i
    });
    userEvent.selectOptions(categorySelect, '1');
  });
});
