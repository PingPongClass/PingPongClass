import React, { Component } from "react";
import CloseBtn from "../../assets/images/closeBtn.png";
import Send from "../../assets/images/uil_message.png";
import "./ChatComponent.css";

// ChatComponent: 채팅 관련 컴포넌트
export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
    };
    // chatScroll: 현재 스크롤 위치
    this.chatScroll = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    // 채팅이 날아올 때 메시지리스트에 들어온 요청 등록하기
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        const time = new Date();
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          time: `${String(time.getHours()).padStart(2, "0")}:${String(
            time.getMinutes(),
          ).padStart(2, "0")}`,
          message: data.message,
        });
        const document = window.document;
        setTimeout(() => {
          const userImg = document.getElementById(
            "userImg-" + (this.state.messageList.length - 1),
          );
          if (data.streamId) {
            const video = document.getElementById("video-" + data.streamId);
            const avatar = userImg.getContext("2d");
            avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
          }
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
    if (event.key === "Enter") {
      if (this.state.message !== "" && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
      if (this.state.message === "") event.preventDefault();
    }
  }

  // sendmessage: 메시지를 보낼 때 작동하는 함수
  sendMessage() {
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
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

  // close: 무언가를 닫는 함수
  close() {
    this.props.close(undefined);
  }

  // render: 렌더링을 담당하는 함수
  render() {
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          {/* 툴바 */}
          <div id="chatToolbar">
            <span>채팅창</span>
            <img
              src={CloseBtn}
              id="closeButton"
              alt="채팅창 닫기"
              onClick={this.close}
            />
          </div>
          {/* 메시지 */}
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  "message" +
                  (data.connectionId !== this.props.user.getConnectionId()
                    ? " left"
                    : " right")
                }
              >
                <canvas
                  id={"userImg-" + i}
                  width="60"
                  height="60"
                  className="user-img"
                />
                <div className="msg-detail">
                  <div className="msg-info">
                    <p className="msg-nickname">
                      {data.nickname}
                      <span className="msg-time">{data.time}</span>
                    </p>
                  </div>
                  <div className="msg-content">
                    <span className="triangle" />
                    <p className="text">{data.message}</p>
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
