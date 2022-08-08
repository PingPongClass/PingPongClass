import React, { Component } from 'react';
import './ShieldModal.css';

const shieldImg = require('../../assets/images/shield.png');

class ShieldModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      countDown: this.props.timeOut,
    };
    this.close = this.close.bind(this);
    this.count = this.count.bind(this);
  }

  componentDidUpdate() {
    if (this.state.display !== this.props.display) {
      this.setState({ display: this.props.display });
      this.setState({ countDown: this.props.timeOut });
      this.count();
    }
  }

  // name: 한준수
  // date: 2022/07/28
  // desc: 지목받은 학생이 방어권을 사용하는 함수
  // todo: 호출 시 현재 수업에 참여 중인 자신을 제외한 학생 중 랜덤한 1명을 지목하고, 추첨 결과를 전체 참여자에게 공유한다.
  useShield = () => {
    this.props.alertToChat(
      this.props.user.nickname + '님이 방어권을 사용했습니다!',
    );
    this.props.pickRandomStudent(this.props.subscribers, true);
    this.close();
  };

  // name: 한준수
  // date: 2022/07/28
  // desc: 지목받은 학생이 방어권을 사용하지 않을 때 호출되는 함수
  // todo: 호출 시 테두리를 변경하고 그 정보를 전체 참여자에게 공유한다.
  notUseShield = () => {
    // this.props.tempFrameChange({ type: "color", value: "Red" });
    this.props.tempFrameChange({
      type: 'style',
      value: {
        animation: 'alertFrame 3s linear 1',
      },
    });
    this.close();
  };

  close() {
    this.props.toggleShield();
  }

  count() {
    let interval = setInterval(() => {
      this.setState({ countDown: this.state.countDown - 1 });
    }, 1000);
    setTimeout(() => {
      if (this.state.display === true) {
        this.notUseShield();
      }
      clearInterval(interval);
    }, this.props.timeOut * 1000);
  }

  render() {
    return (
      <div className={this.state.display ? 'openModal modal' : 'modal'}>
        {this.state.display ? (
          <section>
            <header>{this.props.header}</header>
            <div>
              <div id="content">
                <img id="shieldIcon" src={shieldImg} alt="방어권 이미지" />
                <h1>방어권을 사용 하시겠습니까?</h1>
                <p>({this.state.countDown})초 남음</p>
                <button
                  className="choice"
                  id="shield-yes"
                  onClick={this.useShield}
                >
                  예
                </button>
                <button
                  className="choice"
                  id="shield-no"
                  onClick={this.notUseShield}
                >
                  아니오
                </button>
              </div>
            </div>
            <footer></footer>
          </section>
        ) : null}
      </div>
    );
  }
}

export default ShieldModal;
