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
    if (countDown === 0 && intervalId) {
      this.clearTimer();
    }
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
  timeout: PropTypes.func.isRequired,
};
