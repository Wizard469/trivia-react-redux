const getQuestions = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const questions = await response.json();
      return questions;
    } catch (error) {
      console.log(error);
    }
  }
  return undefined;
};

export default getQuestions;
