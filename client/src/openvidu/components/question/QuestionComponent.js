import React, { Component } from 'react';
import CloseBtn from '@mui/icons-material/Close';
import Send from '../../assets/images/uil_message.png';
import './QuestionComponent.css';

// QuestionComponent: 질문 관련 컴포넌트
export default class QuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      question: '',
    };
    // chatScroll: 현재 스크롤 위치
    this.chatScroll = React.createRef();
    this.chatHeight = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendQuestion = this.sendQuestion.bind(this);
    this.convert12 = this.convert12.bind(this);
  }

  componentDidMount() {
    // 채팅이 날아올 때 메시지리스트에 들어온 요청 등록하기
    // 전체채팅
    this.props.user
      .getStreamManager()
      .stream.session.on('signal:question', (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        let questionList = this.state.questionList;
        questionList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          time: this.convert12(),
          message: data.message,
          type: 'question',
          levelPng: data.levelPng,
        });
        const document = window.document;
        setTimeout(() => {
          this.props.messageReceived();
        }, 50);
        this.setState({ questionList: questionList });
        this.scrollToBottom();
      });
  }

  // handleChange: 메시지를 입력할 때마다 작동하는 현재 작성 메시지 변경 이벤트 핸들러
  handleChange(event) {
    this.setState({ question: event.target.value });
  }

  // handlePressKey: 키를 누를 때 작동하는 이벤트핸들러
  handlePressKey(event) {
    if (event.key === 'Enter') {
      if (this.state.question !== '' && !event.shiftKey) {
        event.preventDefault();
        this.sendQuestion();
      }
      if (this.state.question === '') event.preventDefault();
    }
  }

  // sendQuestion: 질문을 보낼 때 작동하는 함수
  sendQuestion() {
    if (this.props.user && this.state.question) {
      let question = this.state.question.replace(/ +(?= )/g, '');
      if (question !== '' && question !== ' ') {
        // 전체전송
        const data = {
          message: question,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
          levelPng: this.props.levelPng,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: 'question',
        });
      }
    }
    this.setState({ question: '' });
  }

  // scrollToBottom: 스크롤을 맨 아래로 내리는 함수
  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  // chatHeight: 채팅창의 크기를 인식하는 이벤트 핸들러
  chatHeight() {
    this.scrollToBottom();
  }

  // close: 무언가를 닫는 함수
  close() {
    this.props.close(undefined);
  }

  // name: 오석호
  // date: 2022/08/04
  // desc: 시간 계산용 함수
  convert12() {
    const time = new Date();
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const apm = hours < 12 ? '오전 ' : '오후 ';
    hours = hours % 12 || 12;
    const msg = apm + hours + ':' + minutes;
    return msg;
  }

  // render: 렌더링을 담당하는 함수
  render() {
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="questionContainer" ref={this.chatHeight}>
        <div id="questionComponent" style={styleChat}>
          {/* 툴바 */}
          <div id="chatToolbar">
            <span>익명질문</span>
            <CloseBtn id="closeButton" onClick={this.close} alt="채팅창 닫기" />
          </div>
          {/* 메시지 */}
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.questionList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  'message' +
                  (data.connectionId !== this.props.user.getConnectionId()
                    ? ' left'
                    : ' right')
                }
              >
                <img
                  src={'/img/anonymous1.png'}
                  className={'user-img ' + data.levelPng}
                  alt=""
                ></img>
                {/* <canvas
                  id={'userImg-' + i}
                  width="60"
                  height="60"
                  className="user-img"
                /> */}
                <div className="msg-detail">
                  <div className="msg-info">
                    <p className="msg-nickname">
                      {this.props.whoami === 'teacher' ? data.nickname : '익명'}
                    </p>
                  </div>
                  <div className="msg-content-wrap">
                    <div
                      className={
                        data.nickname === 'System'
                          ? `msg-content system`
                          : `msg-content`
                      }
                    >
                      <span className="triangle" />
                      <p className="text">{data.message}</p>
                    </div>
                    <div className="msg-time">
                      <span>{data.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 메시지 입력창 */}
          <div id="messageInput">
            <textarea
              placeholder="채팅 메세지를 입력하세요."
              id="chatInput"
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
              maxLength="200"
              value={this.state.question}
            />
            <img
              src={Send}
              id="sendButton"
              alt="전송버튼"
              onClick={this.sendQuestion}
            />
          </div>
        </div>
      </div>
    );
  }
}
