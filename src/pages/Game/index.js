import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import md5 from 'crypto-js/md5';
import getQuestions from '../../utils/triviaQuestions';
import TriviaCard from '../../components/TriviaCard';

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
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      return history.push('/');
    }
    this.setState({
      questions: triviaResponse.results,
    }, () => this.getAnswers());
  }

  getEmailHash = () => {
    const { gravatarEmail } = this.props;

    return md5(gravatarEmail).toString();
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
    const {
      name,
      score,
    } = this.props;

    return (
      <div className="game-container">
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${this.getEmailHash()}` }
            alt="User Avatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <TriviaCard
          question={ questions[index] }
          isClicked={ isClicked }
          answer={ answers[index] }
        />
        {/* <div className="trivia-container">
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
          <div className="answers" data-testid="answer-options">
            {
              answers[index]
                .sort(() => Math.random() - half)
                .map(({ text, testId, className }, answerIndex) => (
                  <button
                    key={ answerIndex }
                    type="button"
                    data-testid={ testId }
                    className={ isClicked ? className : null }
                    onClick={ this.isCorrect }
                  >
                    { escapeHtml(text) }
                  </button>
                ))
            }
          </div>
        </div> */}
      </div>
    );
  }
}

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: {
  name,
  gravatarEmail,
  score,
} }) => ({
  name,
  gravatarEmail,
  score,
});

export default connect(mapStateToProps)(Game);
