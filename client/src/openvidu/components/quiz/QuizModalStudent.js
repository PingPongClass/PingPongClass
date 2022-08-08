import React, { Component } from 'react';
import './QuizModal.css';
import QuizComponent from './QuizComponent';
import QuizComponent2 from './QuizComponent2';

class QuizModalStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { display: this.props.display, quiz: this.props.quiz };
  }

  componentDidUpdate() {
    if (this.state.display !== this.props.display) {
      this.setState({ display: this.props.display, quiz: this.props.quiz });
    }
  }

  close = () => {
    this.props.toggleQuizStudent();
  };

  submit = (answer) => {
    this.props.toggleQuizStudent(answer);
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
            {this.state.quiz.type ? (
              <QuizComponent submit={this.submit} quiz={this.state.quiz} />
            ) : (
              <QuizComponent2 submit={this.submit} quiz={this.state.quiz} />
            )}
            <footer>
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

export default QuizModalStudent;
