import React, { Component } from 'react';
import './QuizModal.css';
import QuizForm from './QuizForm';
import QuizForm2 from './QuizForm2';
import QuizListCard from './QuizListCard';

class QuizModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      form: true,
      list: false,
      quiz: this.props.quiz,
    };
  }

  componentDidUpdate() {
    if (this.state.display !== this.props.display) {
      this.setState({ display: this.props.display });
    }
    if (this.state.quiz !== this.props.quiz) {
      this.setState({ quiz: this.props.quiz });
    }
  }

  close = () => {
    this.props.toggleQuiz();
  };

  quizCreate = (quiz) => {
    this.props.toggleQuiz(quiz);
    this.setState({ quiz: quiz });
  };

  quizChange = (e) => {
    this.setState({ form: e, list: false });
  };

  toggleList = () => {
    this.setState({ list: true });
  };

  render() {
    return (
      <div className={this.state.display ? 'openModal modal' : 'modal'}>
        {this.state.display ? (
          <section>
            <header>
              {this.props.header}
              <button className="close" onClick={this.close}>
                &times;
              </button>
            </header>
            <div className="quizSection">
              {this.state.list ? (
                <QuizListCard quiz={this.state.quiz} />
              ) : this.state.form ? (
                <QuizForm quizCreate={this.quizCreate} />
              ) : (
                <QuizForm2 quizCreate={this.quizCreate} />
              )}
            </div>
            <footer>
              <button
                onClick={(e) => this.quizChange(false)}
                className="current"
              >
                OX 퀴즈
              </button>
              <button
                className="current"
                onClick={(e) => this.quizChange(true)}
              >
                4지선다 퀴즈
              </button>
              <button onClick={this.toggleList}>퀴즈 목록</button>
              <button className="close" onClick={this.close}>
                닫기
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  }
}

export default QuizModal;
