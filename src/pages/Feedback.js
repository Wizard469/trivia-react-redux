import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetScoreAction } from '../Redux/actions';

const three = 3;

class Feedback extends Component {
  handleClick = () => {
    const { resetScore, history } = this.props;
    resetScore();
    history.push('/');
  }

  render() {
    const {
      score,
      assertions,
    } = this.props;
    return (
      <div className="Feedback">
        <Header />
        <div className="feedback-content">
          <p data-testid="feedback-text">Feedback</p>
          <p>
            Placar Final:
            <span data-testid="feedback-total-score">
              { score }
            </span>
          </p>
          <p>
            Número de acertos:
            <span data-testid="feedback-total-question">
              { assertions }
            </span>
          </p>
          <p>
            Desempenho:
            <span data-testid="feedback-text">
              { assertions >= three ? 'Well Done!' : 'Could be better...' }
            </span>
          </p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClick }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: {
  assertions,
  score,
} }) => ({
  assertions,
  score,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScoreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
