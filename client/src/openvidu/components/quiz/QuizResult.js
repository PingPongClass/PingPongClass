import React, { Component } from 'react';
import './QuizResult.css';

class QuizResult extends Component {
  state = {
    quiz: this.props.quiz,
    answer: 'A1',
    myAnswer: 'A2',
  };

  componentDidUpdate() {
    if (this.state.quiz !== this.props.quiz) {
      this.setState({ quiz: this.props.quiz });
    }
  }

  logic = (num) => {
    let result = '';
    if (num === this.state.answer) {
      result += 'resultAnswer ';
    }
    if (num === this.state.myAnswer) {
      result += 'myAnswer ';
    }
    result += 'progressBar' + num[1];
    return result;
  };

  render() {
    return (
      <div className="resultOutsideContainer">
        {!this.state.quiz.type ? (
          <div className="resultContainer">
            <h1 className="resultQuestion">문제: {this.state.quiz.question}</h1>
            <div>
              <h2 className="myAnswer">내가고른 정답</h2>
              <h2 className="resultAnswer">정답</h2>
            </div>
            <div>
              <h3>O: {this.state.quiz.answerA1}표</h3>
              <div
                className={this.logic('A1')}
                style={{ width: `${this.state.quiz.answerA1 * 20 + 10}px` }}
              ></div>
            </div>
            <div>
              <h3>X: {this.state.quiz.answerA2}표</h3>
              <div
                className={this.logic('A2')}
                style={{ width: `${this.state.quiz.answerA2 * 20 + 10}px` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="resultContainer">
            <h1 className="resultQuestion">문제: {this.state.quiz.question}</h1>
            <div>
              <h2 className="myAnswer">내가고른 정답</h2>
              <h2 className="resultAnswer">정답</h2>
            </div>
            <div>
              <h3>
                {this.state.quiz.A1}: {this.state.quiz.answerA1}표
              </h3>
              <div
                className={this.logic('A1')}
                style={{ width: `${this.state.quiz.answerA1 * 20 + 10}px` }}
              ></div>
            </div>
            <div>
              <h3>
                {this.state.quiz.A2}: {this.state.quiz.answerA2}표
              </h3>
              <div
                className={this.logic('A2')}
                style={{ width: `${this.state.quiz.answerA2 * 20 + 10}px` }}
              ></div>
            </div>
            <div>
              <h3>
                {this.state.quiz.A3}: {this.state.quiz.answerA3}표
              </h3>
              <div
                className={this.logic('A3')}
                style={{ width: `${this.state.quiz.answerA3 * 20 + 10}px` }}
              ></div>
            </div>
            <div>
              <h3>
                {this.state.quiz.A4}: {this.state.quiz.answerA4}표
              </h3>
              <div
                className={this.logic('A4')}
                style={{ width: `${this.state.quiz.answerA4 * 20 + 10}px` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default QuizResult;
