import React, { Component } from 'react';
import './QuizListCard.css';
import QuizResult from './QuizResult';

class QuizListCard extends Component {
  state = {
    quiz: this.props.quiz,
  };

  componentDidUpdate() {
    if (this.state.quiz !== this.props.quiz) {
      this.setState({ quiz: this.props.quiz });
    }
  }

  render() {
    return (
      <div className="outSideContainer">
        <div className="outSideContainer">
          <h1>퀴즈 목록</h1>
          {this.state.quiz.type === undefined ? (
            <h1>퀴즈를 출제해 주세요</h1>
          ) : (
            <div className="outListContainer">
              <div className="quizListContainer">
                <h1>{this.state.quiz.question}</h1>
                <button onClick={() => this.props.contentChange('results')}>
                  결과 보기
                </button>
              </div>
              {!this.state.quiz.type ? (
                <div className="listItems">
                  <p style={{ color: '#029371' }}>O</p>
                  <p style={{ color: '#D43959' }}>X</p>
                </div>
              ) : (
                <div className="listItems">
                  <p style={{ color: '#D43959' }}>{this.state.quiz.A1}</p>
                  <p style={{ color: '#D28945' }}>{this.state.quiz.A2}</p>
                  <p style={{ color: '#029371' }}>{this.state.quiz.A3}</p>
                  <p style={{ color: '#2A69A6' }}>{this.state.quiz.A4}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default QuizListCard;
