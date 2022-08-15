import React, { Component } from 'react';
import './QuizModal.css';
import QuizForm from './QuizForm';
import QuizForm2 from './QuizForm2';
import QuizListCard from './QuizListCard';
import QuizResult from './QuizResult';

class QuizModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      content: 'two',
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
    this.setState({ quiz: quiz, content: 'results' });
  };

  contentChange = (e) => {
    this.setState({ content: e });
  };

  render() {
    return (
      <div className={this.state.display ? 'openModal modal' : 'modal'}>
        {this.state.display ? (
          <section>
            <header>
              {this.props.header}
              <button className="close" onClick={() => this.close}>
                &times;
              </button>
            </header>
            <div className="quizSection">
              {
                {
                  two: <QuizForm2 quizCreate={this.quizCreate} />,
                  four: <QuizForm quizCreate={this.quizCreate} />,
                  list: (
                    <QuizListCard
                      quiz={this.state.quiz}
                      contentChange={this.contentChange}
                    />
                  ),
                  results: <QuizResult quiz={this.state.quiz} />,
                }[this.state.content]
              }
            </div>
            <footer>
              <button
                onClick={() => this.contentChange('two')}
                className="current"
              >
                OX 퀴즈
              </button>
              <button
                className="current"
                onClick={() => this.contentChange('four')}
              >
                4지선다 퀴즈
              </button>
              <button onClick={() => this.contentChange('list')}>
                퀴즈 목록
              </button>
              <button className="close" onClick={() => this.close}>
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
