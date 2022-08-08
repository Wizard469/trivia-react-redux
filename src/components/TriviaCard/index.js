import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Timer from '../Timer';
import './styles.css';

const half = 0.5;

export default class TriviaCard extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      isDisabled: false,
    };
  }

  isCorrect = () => {
    this.setState({
      isClicked: true,
    });
  }

  timeout = () => {
    this.setState({
      isDisabled: true,
    });
  }

  render() {
    const {
      question: {
        category,
        question,
      },
      answer,
    } = this.props;
    const {
      isClicked,
      isDisabled,
    } = this.state;
    return (
      <div className="trivia-container">
        <Timer
          timeout={ this.timeout }
        />
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div className="answers" data-testid="answer-options">
          {
            answer
              .sort(() => Math.random() - half)
              .map(({ text, testId, className }, answerIndex) => (
                <button
                  key={ answerIndex }
                  type="button"
                  data-testid={ testId }
                  className={ isClicked ? className : null }
                  onClick={ this.isCorrect }
                  disabled={ isDisabled }
                >
                  { text }
                </button>
              ))
          }
        </div>
      </div>
    );
  }
}

TriviaCard.propTypes = {
  answer: PropTypes.arrayOf(PropTypes.object).isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};
