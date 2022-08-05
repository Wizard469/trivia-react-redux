import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import md5 from 'crypto-js/md5';

class Game extends Component {
  getEmailHash = () => {
    const { gravatarEmail } = this.props;

    return md5(gravatarEmail).toString();
  }

  render() {
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
      </div>
    );
  }
}

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
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
