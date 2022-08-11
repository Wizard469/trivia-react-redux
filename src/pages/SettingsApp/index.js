import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setConfigAction } from '../../Redux/actions';
import { checkQuestions, getCategories } from '../../utils/triviaQuestions';
import './styles.css';

class SettingsApp extends Component {
  constructor(props) {
    super(props);
    const { category, difficulty, questionType } = props;
    this.state = {
      categories: [],
      category,
      difficulty,
      questionType,
      isValid: true,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  submitChanges = async (id) => {
    const { setConfig } = this.props;
    const {
      category,
      difficulty,
      questionType,
    } = this.state;
    const isConfigValid = await checkQuestions({
      category,
      difficulty,
      questionType,
    });

    if (isConfigValid === 1) {
      return this.setState({
        isValid: false,
        [id]: '',
      });
    }

    setConfig({
      category,
      difficulty,
      questionType,
    });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    }, () => this.submitChanges(id));
  }

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories: categories.trivia_categories,
    });
  }

  render() {
    const {
      categories,
      category,
      difficulty,
      questionType,
      isValid } = this.state;
    const { history } = this.props;
    return (
      <div className="Settings">
        {
          !isValid && (
            <div className="validation-msg">
              <div className="validation-content">
                <p>
                  Não Existem perguntas para as Configurações selecionadas.
                </p>
                <button
                  type="button"
                  onClick={ () => {
                    this.setState({
                      isValid: true,
                    });
                  } }
                >
                  Voltar
                </button>
              </div>
            </div>
          )
        }
        <h1 data-testid="settings-title">Configurações</h1>
        {
          categories.length === 0
            ? <h1>Carregando...</h1>
            : (
              <div className="settings-content">
                <label htmlFor="category">
                  <span>Categoria </span>
                  <select
                    id="category"
                    value={ category }
                    onChange={ this.handleChange }
                  >
                    <option value="">Todas</option>
                    { categories.map(({ id, name }) => (
                      <option key={ id } value={ id }>{ name }</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="difficulty">
                  <span>Dificuldade </span>
                  <select
                    id="difficulty"
                    value={ difficulty }
                    onChange={ this.handleChange }
                  >
                    <option value="">Todas</option>
                    <option value="easy">Fácil</option>
                    <option value="medium">Media</option>
                    <option value="hard">Difícil</option>
                  </select>
                </label>
                <label htmlFor="questionType">
                  <span>Tipo de Questão </span>
                  <select
                    id="questionType"
                    value={ questionType }
                    onChange={ this.handleChange }
                  >
                    <option value="">Todas</option>
                    <option value="multiple">Multipla Escolha</option>
                    <option value="boolean">Certo/Errado</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={ () => history.push('/') }
                >
                  Voltar
                </button>
              </div>
            )
        }
      </div>
    );
  }
}

SettingsApp.propTypes = {
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questionType: PropTypes.string.isRequired,
  setConfig: PropTypes.func.isRequired,
};

const mapStateToProps = ({ settings: {
  category,
  difficulty,
  questionType,
} }) => ({
  category,
  difficulty,
  questionType,
});

const mapDispatchToProps = (dispatch) => ({
  setConfig: (payload) => dispatch(setConfigAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsApp);
