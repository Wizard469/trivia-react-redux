import PropTypes from 'prop-types';
import React, { Component } from 'react';

const second = 1000;

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      countDown: 30,
      intervalId: null,
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate() {
    const { countDown, intervalId } = this.state;
    const { isClicked, shouldReset, resetTimer } = this.props;
    if (shouldReset) {
      this.setTimer();
      resetTimer();
    }
    if (isClicked && intervalId) {
      this.sendTime();
    }
    if (countDown === 0 && intervalId) {
      this.clearTimer();
    }
  }

  sendTime = () => {
    const { intervalId, countDown } = this.state;
    const { setAnswerTime } = this.props;
    clearInterval(intervalId);
    setAnswerTime(countDown);
    this.setState({
      intervalId: null,
    });
  }

  clearTimer = () => {
    const { intervalId } = this.state;
    const { timeout } = this.props;
    clearInterval(intervalId);
    timeout();
    this.setState({
      intervalId: null,
    });
  }

  setTimer = () => {
    const intervalId = setInterval(() => {
      this.setState(({ countDown: prevCount }) => ({
        countDown: prevCount - 1,
      }));
    }, second);
    this.setState({
      intervalId,
      countDown: 30,
    });
  }

  render() {
    const { countDown } = this.state;
    return (
      <div className="Timer">
        <p>{ countDown }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  setAnswerTime: PropTypes.func.isRequired,
  timeout: PropTypes.func.isRequired,
  shouldReset: PropTypes.bool.isRequired,
  resetTimer: PropTypes.func.isRequired,
};
