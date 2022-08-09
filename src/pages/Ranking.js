import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetScoreAction } from '../Redux/actions';
import '../styles/Ranking.css';

class Ranking extends Component {
  handleClick = () => {
    const { resetScore, history } = this.props;
    resetScore();
    history.push('/');
  }

  render() {
    return (
      <div className="Ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScoreAction()),
});

export default connect(null, mapDispatchToProps)(Ranking);
