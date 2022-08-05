const getTriviaToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    return token;
  } catch (error) {
    console.log(error);
  }
};

export default getTriviaToken;
