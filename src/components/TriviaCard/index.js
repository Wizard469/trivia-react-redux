import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScoreAction } from '../../Redux/actions';
import getScore from '../../utils/getScore';
import Timer from '../Timer';
import './styles.css';

const half = 0.5;
const basePoints = 10;

class TriviaCard extends Component {
  constructor(props) {
    super(props);
    const { answer } = props;
    this.state = {
      isClicked: false,
      isDisabled: false,
      answerTime: null,
      answersArray: answer.sort(() => Math.random() - half),
      isCorrect: null,
    };
  }

  isCorrect = ({ target }) => {
    this.setState({
      isClicked: true,
    }, () => this.setState({
      isCorrect: target.className === 'correct',
    }));
  }

  timeout = () => {
    this.setState({
      isDisabled: true,
    });
  }

  setAnswerTime = (time) => {
    this.setState({
      answerTime: time,
    }, () => this.calcScore());
  }

  calcScore = () => {
    const { question: { difficulty }, updateScore } = this.props;
    const { answerTime, isCorrect } = this.state;
    if (isCorrect) {
      const points = basePoints + (answerTime * getScore(difficulty));
      updateScore(points);
    }
  }

  render() {
    const {
      question: {
        category,
        question,
      },
    } = this.props;
    const {
      isClicked,
      isDisabled,
      answersArray,
    } = this.state;
    return (
      <div className="trivia-container">
        <Timer
          timeout={ this.timeout }
          isClicked={ isClicked }
          setAnswerTime={ this.setAnswerTime }
        />
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div className="answers" data-testid="answer-options">
          {
            answersArray
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
    difficulty: PropTypes.string,
  }).isRequired,
  updateScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateScore: (payload) => dispatch(updateScoreAction(payload)),
});

export default connect(null, mapDispatchToProps)(TriviaCard);
