import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logUserAction } from '../../Redux/actions';
import getTriviaToken from '../../utils/triviaToken';
import './styles.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handlePlay = async () => {
    const { history, logUser } = this.props;
    const { token } = await getTriviaToken();
    localStorage.setItem('token', token);
    logUser(this.state);
    history.push('/game');
  }

  validateBtn = () => {
    const { name, email } = this.state;
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email) && name) return false;

    return true;
  }

  handleSettings = () => {

  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div className="login-container">
        <form>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.validateBtn() }
            onClick={ this.handlePlay }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  logUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logUser: (payload) => dispatch(logUserAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
