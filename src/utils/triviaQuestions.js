import store from '../Redux/store';

const generateApiUrl = (token) => {
  const {
    settings: {
      category,
      difficulty,
      questionType,
    },
  } = store.getState();
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

export const getCategories = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_category.php');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const checkQuestions = async ({
  category,
  difficulty,
  questionType,
}) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${questionType}`);
    const questions = await response.json();
    return questions.response_code;
  } catch (error) {
    console.log(error);
  }

  return undefined;
};
