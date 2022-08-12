import store from '../Redux/store';

const generateApiUrl = (token) => {
  const {
    settings: {
      category,
      difficulty,
      questionType,
    },
  } = store.getState();

  if (!category && !difficulty && !questionType) {
    return `https://opentdb.com/api.php?amount=5&token=${token}`;
  }
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}&category=${category}&difficulty=${difficulty}&type=${questionType}`;
  return URL;
};

const getQuestions = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch(generateApiUrl(token));
      const questions = await response.json();
      return questions;
    } catch (error) {
      console.log(error);
    }
  }
  return undefined;
};

export default getQuestions;
