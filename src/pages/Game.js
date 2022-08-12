import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Game.css';
import { Redirect } from 'react-router-dom';
import getQuestions from '../utils/triviaQuestions';
import TriviaCard from '../components/TriviaCard';
import Header from '../components/Header';
import { saveScoreToLocalStorage } from '../utils/scoreLocalStorage';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questions: [],
      answers: [],
      isClicked: false,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  getAnswers = () => {
    const { questions } = this.state;
    const answers = [];
    questions.forEach((question) => {
      const answersArray = [];
      answersArray.push({
        text: question.correct_answer,
        testId: 'correct-answer',
        className: 'correct',
      });
      question.incorrect_answers.forEach((answer, answerIndex) => {
        answersArray.push({
          text: answer,
          testId: `wrong-answer-${answerIndex}`,
          className: 'incorrect',
        });
      });
      answers.push(answersArray);
    });
    this.setState({
      answers,
    });
  }

  fetchQuestions = async () => {
    const { history } = this.props;
    const invalidToken = 3;
    const triviaResponse = await getQuestions();
    if (!triviaResponse || triviaResponse.response_code === invalidToken) {
      localStorage.removeItem('token');

      return history.push('/');
    }
    this.setState({
      questions: triviaResponse.results,
    }, () => this.getAnswers());
  }

  updateQuestion = () => {
    this.setState(({ index: prevIndex }) => ({
      index: prevIndex + 1,
    }));
  }

  render() {
    const {
      questions,
      index,
      answers,
      isClicked,
    } = this.state;

    if (questions.length === 0 || answers.length === 0) {
      return (
        <h1>Carregando...</h1>
      );
    }

    if (index === questions.length) {
      saveScoreToLocalStorage();
      return <Redirect to="/feedback" />;
    }

    return (
      <div className="game-container">
        <Header />

        <TriviaCard
          question={ questions[index] }
          isClicked={ isClicked }
          answer={ answers[index] }
          updateQuestion={ this.updateQuestion }
        />
        <h4>Feito por Renato Mendes, Edvaldo José, Jonathan Rodrigues e Diogo Camilo</h4>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
