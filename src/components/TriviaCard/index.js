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
  constructor() {
    super();
    this.state = {
      isClicked: false,
      isDisabled: false,
      answerTime: null,
      answersArray: [],
      isCorrect: null,
      shouldReset: false,
    };
  }

  static getDerivedStateFromProps({ answer }, { answersArray }) {
    const answerMap = answer.map(({ text }) => text);
    const answersArrayMap = answersArray.map(({ text }) => text);
    if (!answerMap.every((el) => answersArrayMap.includes(el))) {
      return {
        answersArray: answer.sort(() => Math.random() - half),
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  isCorrect = ({ target }) => {
    this.setState({
      isClicked: true,
    }, () => this.setState({
      isCorrect: target.className === 'correct',
    }));
  }

  resetTimer = () => {
    this.setState(({ shouldReset: prevReset }) => ({
      shouldReset: !prevReset,
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

  handleNext = () => {
    const { updateQuestion } = this.props;
    this.setState({
      isClicked: false,
      isDisabled: false,
      answerTime: null,
      isCorrect: null,
    }, () => this.resetTimer());
    updateQuestion();
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
      shouldReset,
    } = this.state;
    return (
      <div className="trivia-container">
        <Timer
          timeout={ this.timeout }
          isClicked={ isClicked }
          setAnswerTime={ this.setAnswerTime }
          shouldReset={ shouldReset }
          resetTimer={ this.resetTimer }
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
        {
          isClicked && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNext }
            >
              Next
            </button>
          )
        }
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
  updateQuestion: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateScore: (payload) => dispatch(updateScoreAction(payload)),
});

export default connect(null, mapDispatchToProps)(TriviaCard);