import React, { Component } from 'react';
import CloseBtn from '@mui/icons-material/Close';
import Send from '../../assets/images/uil_message.png';
import defaultProfile from '@assets/images/defaultProfile.jpeg';
import './ChatComponent.css';

// ChatComponent: 채팅 관련 컴포넌트
export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: '',
      messageTarget: 'all',
    };
    // chatScroll: 현재 스크롤 위치
    this.chatScroll = React.createRef();
    this.chatHeight = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeTarget = this.changeTarget.bind(this);
    this.convert12 = this.convert12.bind(this);
  }

  componentDidMount() {
    // 채팅이 날아올 때 메시지리스트에 들어온 요청 등록하기
    // 전체채팅
    this.props.user
      .getStreamManager()
      .stream.session.on('signal:chat', (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          time: this.convert12(),
          message: data.message,
          type: 'chat',
          levelPng: data.levelPng,
          profile: data.profile,
        });
        const document = window.document;
        setTimeout(() => {
          this.props.messageReceived();
        }, 50);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });

    // 귓속말
    this.props.user
      .getStreamManager()
      .stream.session.on('signal:private-chat', (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          time: this.convert12(),
          message: data.message,
          type: 'private-chat',
          target: data.target,
          levelPng: data.levelPng,
          profile: data.profile,
        });
        const document = window.document;
        setTimeout(() => {
          this.props.messageReceived();
        }, 50);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });
  }

  // handleChange: 메시지를 입력할 때마다 작동하는 현재 작성 메시지 변경 이벤트 핸들러
  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  // handlePressKey: 키를 누를 때 작동하는 이벤트핸들러
  handlePressKey(event) {
    if (event.key === 'Enter') {
      if (this.state.message !== '' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
      if (this.state.message === '') event.preventDefault();
    }
  }

  // sendmessage: 메시지를 보낼 때 작동하는 함수
  sendMessage() {
    console.log(this.props.levelPng);
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, '');
      if (message !== '' && message !== ' ') {
        // 전체전송
        if (this.state.messageTarget === 'all') {
          const data = {
            message: message,
            nickname: this.props.user.getNickname(),
            streamId: this.props.user.getStreamManager().stream.streamId,
            levelPng: this.props.levelPng,
            profile: this.props.profile,
          };
          this.props.user.getStreamManager().stream.session.signal({
            data: JSON.stringify(data),
            type: 'chat',
          });
        }
        // 귓속말
        else {
          const data = {
            message: message,
            nickname: this.props.user.getNickname(),
            streamId: this.props.user.getStreamManager().stream.streamId,
            target: this.state.messageTarget.nickname,
            levelPng: this.props.levelPng,
            profile: this.props.profile,
          };
          this.props.user.getStreamManager().stream.session.signal({
            data: JSON.stringify(data),
            to: [this.state.messageTarget, this.props.user],
            type: 'private-chat',
          });
        }
      }
    }
    this.setState({ message: '' });
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
  // desc: 메시지 전송 대상을 변경하는 함수
  changeTarget(e) {
    if (e.target.value === 'all') this.setState({ messageTarget: 'all' });
    else {
      const target = this.props.subscribers.filter(
        (elem) => elem.nickname === e.target.value,
      );
      this.setState({ messageTarget: target[0] });
    }
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
      <div id="chatContainer" ref={this.chatHeight}>
        <div id="chatComponent" style={styleChat}>
          {/* 툴바 */}
          <div id="chatToolbar">
            <span>채팅창</span>
            <CloseBtn id="closeButton" onClick={this.close} alt="채팅창 닫기" />
          </div>
          {/* 메시지 */}
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  'message' +
                  (data.connectionId !== this.props.user.getConnectionId() ||
                  data.nickname === 'System'
                    ? ' left'
                    : ' right') +
                  (data.type === 'chat' ? '' : ' whisper')
                }
              >
                <img
                  src={
                    data.nickname === 'System'
                      ? '/img/bot.png'
                      : data.profile ===
                          'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ||
                        data.profile ===
                          'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/'
                      ? defaultProfile
                      : data.profile
                  }
                  className="user-img"
                  alt="프로필사진"
                />
                {/* <canvas
                  id={'userImg-' + i}
                  width="60"
                  height="60"
                  className="user-img"
                /> */}
                <div className="msg-detail">
                  <div className="msg-info">
                    <p className="msg-nickname">
                      <span>
                        {data.nickname !== 'System' && (
                          <img
                            src={data.levelPng}
                            alt="레벨짤"
                            className="level-png"
                          />
                        )}
                      </span>
                      {data.target
                        ? data.nickname + ' ▶ ' + data.target
                        : data.nickname}
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
          <div id="whisper">
            <select
              id="demo-simple-select-outlined"
              className="select-box"
              onChange={this.changeTarget}
            >
              <option defaultValue="all" className="menu-item-box">
                all
              </option>
              {this.props.subscribers.map((sub, i) => (
                <option value={sub.nickname} key={i}>
                  {sub.nickname}
                </option>
              ))}
            </select>
          </div>
          {/* 메시지 입력창 */}
          <div id="messageInput">
            <textarea
              placeholder="채팅 메세지를 입력하세요."
              id="chatInput"
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
              maxLength="200"
              value={this.state.message}
            />
            <img
              src={Send}
              id="sendButton"
              alt="전송버튼"
              onClick={this.sendMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}
