import PropTypes from 'prop-types';
import React, { Component } from 'react';

const half = 0.5;

export default class TriviaCard extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
    };
  }

  isCorrect = () => {
    this.setState({
      isClicked: true,
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
    const { isClicked } = this.state;
    return (
      <div className="trivia-container">
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
