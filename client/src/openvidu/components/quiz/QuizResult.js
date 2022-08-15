import React, { Component } from 'react';
import './QuizResult.css';
import PieChart from './PieChart';

class QuizResult extends Component {
  state = {
    quiz: this.props.quiz,
    answer: 'A1',
    myAnswer: 'A2',
  };

  componentDidUpdate() {
    if (this.state.quiz !== this.props.quiz) {
      this.setState({
        quiz: this.props.quiz,
      });
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

  convert = (data) => {
    console.log(data);
    if (data) {
      return [
        {
          name: this.state.quiz.A1,
          value: this.state.quiz.answerA1 ? this.state.quiz.answerA1 : 0.2,
        },
        {
          name: this.state.quiz.A2,
          value: this.state.quiz.answerA2 ? this.state.quiz.answerA2 : 0.2,
        },
        {
          name: this.state.quiz.A3,
          value: this.state.quiz.answerA3 ? this.state.quiz.answerA3 : 0.2,
        },
        {
          name: this.state.quiz.A4,
          value: this.state.quiz.answerA4 ? this.state.quiz.answerA4 : 0.2,
        },
      ];
    } else {
      return [
        {
          name: this.state.quiz.A2,
          value: this.state.quiz.answerA2 ? this.state.quiz.answerA2 : 0.2,
        },
        {
          name: this.state.quiz.A1,
          value: this.state.quiz.answerA1 ? this.state.quiz.answerA1 : 0.2,
        },
      ];
    }
  };

  render() {
    return (
      <div className="resultOutsideContainer">
        {!this.state.quiz.type ? (
          <div className="resultContainer">
            <h1 className="resultQuestion">문제: {this.state.quiz.question}</h1>
            <div className="resultContent">
              <div className="resultAnwerContent">
                <div className="answerBox">
                  <p style={{ color: '#029371' }}>O</p>
                  <p>{this.state.quiz.answerA1} 표</p>
                </div>
                <div className="answerBox">
                  <p style={{ color: '#D43959' }}>X</p>
                  <p>{this.state.quiz.answerA2} 표</p>
                </div>
              </div>
              <PieChart data={this.convert(this.state.quiz.type)} />
            </div>
          </div>
        ) : (
          <div className="resultContainer">
            <h1 className="resultQuestion">문제: {this.state.quiz.question}</h1>
            <div className="resultContent">
              <div className="resultAnwerContent">
                <div className="answerBox">
                  <p style={{ color: '#D43959' }}>{this.state.quiz.A1}</p>
                  <p>{this.state.quiz.answerA1} 표</p>
                </div>
                <div className="answerBox">
                  <p style={{ color: '#029371' }}>{this.state.quiz.A2}</p>
                  <p>{this.state.quiz.answerA2} 표</p>
                </div>
                <div className="answerBox">
                  <p style={{ color: '#D28945' }}>{this.state.quiz.A3}</p>
                  <p>{this.state.quiz.answerA3} 표</p>
                </div>
                <div className="answerBox">
                  <p style={{ color: '#2A69A6' }}>{this.state.quiz.A4}</p>
                  <p>{this.state.quiz.answerA4} 표</p>
                </div>
              </div>
              <PieChart data={this.convert(this.state.quiz.type)} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default QuizResult;
