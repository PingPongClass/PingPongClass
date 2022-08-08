import React, { Component } from 'react';
import './QuizForm.css';

class QuizForm extends Component {
  state = {
    type: false,
    question: 'none',
    answerA1: 0,
    answerA2: 0,
  };

  submit = (event) => {
    event.preventDefault();
    this.props.quizCreate(this.state);
  };

  debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  printValue = this.debounce((e) => this.changeState(e), 100);

  changeState = (e) => {
    if (e.name === 'question') {
      this.setState({ question: e.value });
    }
  };

  onChange = (e) => {
    this.printValue(e.target);
  };

  render() {
    return (
      <div className="quizFormContainer">
        <div className="form-style-7">
          <h1>OX 퀴즈</h1>
          <ul>
            <li>
              <label htmlFor="question">질문</label>
              <input
                onChange={this.onChange}
                type="text"
                name="question"
                maxLength="100"
              />
              <span>OX로 대답할 수 있는 문제를 적어주세요</span>
            </li>
            <li>
              <button type="submit" onClick={this.submit}>
                퀴즈 만들기
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizForm;
