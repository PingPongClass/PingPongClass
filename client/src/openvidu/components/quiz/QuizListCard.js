import React, { Component } from 'react';
import './QuizListCard.css';
import QuizResult from './QuizResult';

class QuizListCard extends Component {
  state = {
    quiz: this.props.quiz,
    result: false,
  };

  componentDidUpdate() {
    if (this.state.quiz !== this.props.quiz) {
      this.setState({ quiz: this.props.quiz });
    }
  }

  toggleResult = () => {
    this.setState({ result: true });
  };

  render() {
    console.log(this.state.quiz);
    return (
      <div className="outSideContainer">
        {this.state.result ? (
          <QuizResult quiz={this.state.quiz} />
        ) : (
          <div className="outSideContainer">
            <h1>퀴즈 목록</h1>
            {this.state.quiz.type === undefined ? (
              <h1>퀴즈를 출제해 주세요</h1>
            ) : (
              <div className="outListContainer">
                <div className="quizListContainer">
                  <h1>{this.state.quiz.question}</h1>
                  <button onClick={this.toggleResult}>결과 보기</button>
                </div>
                {!this.state.quiz.type ? (
                  <div className="listItems">
                    <p style={{ color: '#D43959' }}>O</p>
                    <p style={{ color: '#029371' }}>X</p>
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
        )}
      </div>
    );
  }
}

export default QuizListCard;
