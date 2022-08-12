import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetScoreAction } from '../Redux/actions';
import '../styles/Ranking.css';
import { getScoreFromLocalStorage } from '../utils/scoreLocalStorage';

class Ranking extends Component {
  handleClick = () => {
    const { resetScore, history } = this.props;
    resetScore();
    history.push('/');
  }

  getEmailHash = (picture) => MD5(picture).toString()

  render() {
    return (
      <div className="Ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="ranking-list">
          {
            getScoreFromLocalStorage().map(({ name, score, picture }, index) => (
              <div key={ `${picture}${index}` } className="player-ranking">
                <div>
                  <p>{`${index + 1} - `}</p>
                  <img src={ `https://www.gravatar.com/avatar/${this.getEmailHash(picture)}` } alt="Player Avatar" />
                  <p data-testid={ `player-name-${index}` }>
                    { name }
                  </p>

                </div>
                <p data-testid={ `player-score-${index}` }>
                  { score }
                </p>
              </div>
            ))
          }
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ this.handleClick }
          >
            Play Again
          </button>
        </div>
        <h4>Feito por Renato Mendes, Edvaldo José, Jonathan Rodrigues e Diogo Camilo</h4>
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
