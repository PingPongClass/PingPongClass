import React, { Component } from 'react';
import axios from 'axios';
import InterceptedAxios from '@utils/iAxios';
import './VideoRoomComponent.css';
import { OpenVidu } from 'openvidu-browser';
import StreamComponent from './stream/StreamComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import ChatComponent from './chat/ChatComponent';
import ParticipantComponent from './participant/ParticipantComponent';
import FaceDetection from '../FaceDetection';
import EmojiFilter from './items/EmojiFilter';
import QuizModal from './quiz/QuizModal';
import QuizModalStudent from './quiz/QuizModalStudent';
import ShieldModal from './items/ShieldModal';
import ShieldModalLoading from './items/ShieldModalLoading';
import Sticker from './pointClickEvent/PointSticker';

import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';
import Setting from './settings/Setting';

var localUser = new UserModel();

// VideoRoomComponent: 비디오룸 전체를 담당하는 컴포넌트
class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    // OPENVIDU_SERVER_URL: 오픈비두 서버쪽 URL (포트번호는 변경될 수 있음)
    // this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
    //     ? this.props.openviduServerUrl
    //     : 'https://' + window.location.hostname + ':4443';
    this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
      ? this.props.openviduServerUrl
      : process.env.REACT_APP_OPENVIDU_SERVER_URL;
    // OPENVIDU_SERVER_SECRET: 서버 비밀번호 - 변경할 필요 없음
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : process.env.REACT_APP_OPENVIDU_SERVER_SECRET;
    // hasBeenUpdated: 업데이트 여부 판단하는 변수
    this.hasBeenUpdated = false;
    // layout: 현재 레이아웃 (openvidu-layout.js와 연결)
    this.layout = new OpenViduLayout();
    // sessionName: 세션 이름을 담은 변수 (기본값 SessionA)
    let sessionName = this.props.code;
    // userName: 유저의 이름 (기본 OpenVidu_User + 0부터 99까지의 랜덤한 숫자)
    let userName = this.props.memberStore.name;
    if (this.props.whoami === 'teacher') userName += ' (선생님)';
    // remotes:
    this.remotes = [];
    // localUserAccessAllowed:
    this.localUserAccessAllowed = false;
    // 스마일 유저값
    let smile = this.props.smile;
    // 유저 out of angle
    let outAngle = this.props.outAngle;
    // 상태값들 (mySessionId: 접속중인 세션이름, myUserName: 내 이름, session: 세션에 대한 정보, localUser: 내 정보, subscribers: 같이 접속한 사람들, chatDisplay: 채팅창 on 여부, currentVideoDevice: 현재 비디오 출력장치)
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'none',
      participantDisplay: 'none',
      quizDisplay: false,
      quizDisplayStudent: false,
      shieldDisplay: false,
      shieldLoadingDisplay: false,
      shieldLoadingDisplay: false,
      videos: this.props.setDevices.videos,
      audios: this.props.setDevices.audios,
      speakers: this.props.setDevices.speakers,
      currentVideoDevice: this.props.setDevices.selectedVideoTrack,
      currentAudioDevice: this.props.setDevices.selectedAudioTrack,
      currentVideoDeviceId: this.props.setDevices.selectedVideo,
      currentAudioDeviceId: this.props.setDevices.selectedAudio,
      currentSpeakerDeviceId: this.props.setDevices.selectedSpeaker,
      randPick: undefined,
      smile: smile,
      outAngle: outAngle,
      loading: true,
      totalHeight: 0,
      totalWidth: 0,
      stickers: [],
      quiz: {},
      settingDisplay: false,
    };

    // 메서드 바인딩 과정
    // joinSession: 세션 접속
    this.joinSession = this.joinSession.bind(this);
    // leaveSession: 세션 접속해제
    this.leaveSession = this.leaveSession.bind(this);
    // selfLeaveSession: 학생 혼자 세션 나갔을 때
    this.selfLeaveSession = this.selfLeaveSession.bind(this);
    // onbeforeunload: 접속 종료 전에 일어나는 일들을 처리하는 함수
    this.onbeforeunload = this.onbeforeunload.bind(this);
    // updateLayout: 레이아웃 업데이트
    this.updateLayout = this.updateLayout.bind(this);
    // camStatusChanged: 캠 상태 변경 함수
    this.camStatusChanged = this.camStatusChanged.bind(this);
    // micStatusChanged: 마이크 상태 변경 함수
    this.micStatusChanged = this.micStatusChanged.bind(this);
    // pickRandomStudent: 랜덤 학생 찍어주는 함수
    this.pickRandomStudent = this.pickRandomStudent.bind(this);
    // upPoint, downPoint : 포인트 변경 함수
    this.upPointChanged = this.upPointChanged.bind(this);
    this.downPointChanged = this.downPointChanged.bind(this);
    // toggleFullscreen: 전체화면 처리 함수
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    // switchCamera: 카메라 변경 함수
    this.switchCamera = this.switchCamera.bind(this);
    // screenShare: 화면 공유 함수
    this.screenShare = this.screenShare.bind(this);
    // stopScreenShare: 화면 공유 중지 함수
    this.stopScreenShare = this.stopScreenShare.bind(this);
    // closeDialogExtension?: 익스텐션 설치 알림창 닫을 때 작동하는 함수
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    // toggleChat: 채팅 토글 버튼 함수
    this.toggleChat = this.toggleChat.bind(this);
    // toggleParticipant: 참가자 목록 토글 버튼 함수
    this.toggleParticipant = this.toggleParticipant.bind(this);
    // toggleSetting: 설정 토글 버튼 함수
    this.toggleSetting = this.toggleSetting.bind(this);
    // checkNotification: 알림 확인 함수
    this.checkNotification = this.checkNotification.bind(this);
    // checkSize: 화면 크기 체크 함수
    this.checkSize = this.checkSize.bind(this);
    // smile: 웃는 이모지 체크 함수
    this.smile = this.smile.bind(this);
    // outAngle: 화상인식 가능 여부 체크 함수
    this.outAngle = this.outAngle.bind(this);
    // frameChanged: 테두리 색깔 변경 함수
    this.frameChanged = this.frameChanged.bind(this);
    // toggleQuiz: 퀴즈창 토글 버튼 함수
    this.toggleQuiz = this.toggleQuiz.bind(this);
    // toggleShield: 방어권창 토글 버튼 함수
    this.toggleShield = this.toggleShield.bind(this);
    // checkUserHasItem: 유저의 아이템 정보 체크 함수
    this.checkUserHasItem = this.checkUserHasItem.bind(this);
    // startStickerEvent: 칭찬스티커 클릭이벤트를 발생시키는 함수
    this.startStickerEvent = this.startStickerEvent.bind(this);
    // answerUpdate: 퀴즈 정답 수신해서 통계에 적용하는 함수
    this.answerUpdate = this.answerUpdate.bind(this);
    // 설정용 함수
    this.setMyVideos = this.setMyVideos.bind(this);
    this.setMyAudios = this.setMyAudios.bind(this);
    this.setMySpeakers = this.setMySpeakers.bind(this);
    this.setVideo = this.setVideo.bind(this);
    this.setAudio = this.setAudio.bind(this);
    this.setSpeaker = this.setSpeaker.bind(this);
  }

  // componentDidMount: 컴포넌트가 마운트 되었을 때 작동하는 리액트 컴포넌트 생명주기함수
  componentDidMount() {
    console.log('-------------', this.props.code);
    // openViduLayoutOptions: 화면 레이아웃 설정
    const openViduLayoutOptions = {
      maxRatio: 9 / 16, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: true, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    // 초기 화면 설정
    this.layout.initLayoutContainer(
      document.getElementById('layout'),
      openViduLayoutOptions,
    );

    // 화면 크기 변경 및 종료시 발생하는 이벤트핸들러 달아두기
    window.addEventListener('beforeunload', this.onbeforeunload);
    window.addEventListener('resize', this.updateLayout);
    window.addEventListener('resize', this.checkSize);

    // 세션에 조인하기
    this.joinSession();
  }

  // componentWillUnmount: 컴포넌트가 언마운트 됐을 때 작동하는 리액트 컴포넌트 생명주기함수
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    window.removeEventListener('resize', this.updateLayout);
    window.removeEventListener('resize', this.checkSize);
    this.leaveSession();
  }

  // onbeforeunload: 페이지를 떠나기 직전에 작동하는 함수
  onbeforeunload(event) {
    this.leaveSession();
  }

  // joinSession: 세션에 접속할 때 작동하는 함수
  joinSession() {
    this.OV = new OpenVidu();

    // setState: 1st 매개변수 - 상태값 설정, 2nd 매개변수 - 콜백함수
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();
        this.connectToSession();
      },
    );
  }

  // connectToSession: 세션 연결을 위한 토큰을 받아서 연결을 처리하는 함수
  connectToSession() {
    if (this.props.token !== undefined) {
      // console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      this.getToken()
        .then((token) => {
          // console.log(token);
          this.connect(token);
        })
        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log(
            'There was an error getting the token:',
            error.code,
            error.message,
          );
          alert('There was an error getting the token:', error.message);
        });
    }
  }

  // connect: 토큰을 매개변수로 받아서 실제 세션에 접속하게 해주는 함수
  connect(token) {
    // name: 오석호
    // date: 2022/07/28
    // desc: 입장 시간을 저장해주는 로직
    const time = new Date();
    let attTime =
      String(time.getHours()).padStart(2, '0') +
      ':' +
      String(time.getMinutes()).padStart(2, '0') +
      ':' +
      String(time.getSeconds()).padStart(2, '0');
    localUser.setAttendenceTime(attTime);

    // 시작할 때 장치 상태를 localUser에 저장
    localUser.setAudioActive(this.props.setDevices.isAudioOn);
    localUser.setVideoActive(this.props.setDevices.isVideoOn);

    // 유저끼리 데이터 교환
    this.state.session
      .connect(token, {
        clientData: this.state.myUserName,
        attTime: localUser.attendenceTime,
        randPick: this.state.randPick,
      })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            message: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert('There was an error connecting to the session:', error.message);
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message,
        );
      });
  }

  // connectWebCam: 웹캠을 연결하는 함수 (실제 WebRTC와 연관된 내부 메서드들과 유사)
  async connectWebCam() {
    // 현재 연결된 디바이스를 받음
    // var devices = await this.OV.getDevices();
    // 연결된 디바이스 중에서 비디오 디바이스를 필터링
    // var videoDevices = devices.filter((device) => device.kind === "videoinput");

    // publisher 초기설정(자기자신)
    let publisher = this.OV.initPublisher(undefined, {
      audioSource: this.state.currentAudioDevice,
      videoSource: this.state.currentVideoDevice,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '1280x720',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    // 접근 허용되었을 때 설정 변경
    if (this.state.session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }

    // 로컬 유저(자신)의 정보 및 환경설정
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);

    // 이벤트 등록
    if (this.props.whoami !== 'teacher') this.subscribeToSessionClosed();
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();

    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      {
        currentVideoDevice: this.state.currentVideoDevice,
        currentAudioDevice: this.state.currentAudioDevice,
        currentSpeakerDeviceId: this.state.currentSpeakerDeviceId,
        localUser: localUser,
      },
      () => {
        this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove(
            'custom-class',
          );
        });
      },
    );
  }

  // updateSubscribers: 자신의 정보를 구독하고 있는(받고 있는) 유저들의 정보를 업데이트
  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            point: this.state.localUser.getPoint(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
        this.updateLayout();
      },
    );
  }

  // 학생이 자기혼자 나간경우
  selfLeaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    // 모든 설정들 초기화
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: '퇴장한 유저',
      localUser: undefined,
    });
    if (this.props.selfLeaveSession) {
      this.props.selfLeaveSession();
    }

    return this.props.navigate('/student');
  }

  // leaveSession: 세션을 빠져나가는 함수
  async leaveSession() {
    const mySession = this.state.session;
    this.props.setMyData(this.state.localUser);
    this.props.setOthersData(this.state.subscribers);

    if (this.props.whoami === 'teacher') {
      console.log('나는 선생님', this.props.classId);
      try {
        const result = await InterceptedAxios.patch(
          `/classes/${this.props.classId}/close`,
          {
            classId: this.props.classId,
          },
        );
        console.log(result);
      } catch (e) {
        console.error(e);
      }

      this.state.localUser.getStreamManager().stream.session.signal({
        type: 'classClosed',
      });
    }

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    // 모든 설정들 초기화
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: '퇴장한 유저',
      localUser: undefined,
    });

    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
    this.props.setTap('result');

    // if (this.props.whoami === 'teacher') {
    //   this.props.user.getStreamManager().stream.session.signal({
    //     type: 'private-chat',
    //   });
    //   // await axios.delete(
    //   //   `https://i7a403.p.ssafy.io/openvidu/api/sessions/${this.props.code}`,
    //   //   {
    //   //     headers: {
    //   //       Authorization:
    //   //         `Basic ` +
    //   //         btoa(
    //   //           unescape(
    //   //             encodeURIComponent(
    //   //               `OPENVIDUAPP:${process.env.REACT_APP_OPENVIDU_SERVER_SECRET}`,
    //   //             ),
    //   //           ),
    //   //         ),
    //   //     },
    //   //   },
    //   // );
    //   if (this.props.leaveSession) {
    //     this.props.leaveSession();
    //   }
    //   this.props.setTap('result');
    // } else {
    //   console.log('wow');
    //   if (this.props.leaveSession) {
    //     this.props.leaveSession();
    //   }
    //   this.props.setTap('result');
    // }
  }

  // camStatusChanged: 캠 설정 변경
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  // micStatusChanged: 마이크 설정 변경
  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  // name: 오석호
  // date: 2022/08/04
  // 포인트 조작 함수
  upPointChanged() {
    let localUser = this.state.localUser;
    localUser.upPoint();
    this.sendSignalUserChanged({ point: localUser.getPoint() });
    this.setState({ localUser: localUser });
  }

  downPointChanged() {
    let localUser = this.state.localUser;
    localUser.downPoint();
    this.sendSignalUserChanged({ point: localUser.getPoint() });
    this.setState({ localUser: localUser });
  }

  // deleteSubscriber: 매개변수로 받은 stream을 가진 유저를 구독자 명단에서 제거하는 함수
  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream,
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  // subscribeToStreamCreated: 새롭게 접속한 사람의 스트림을 구독하는 함수
  subscribeToStreamCreated() {
    this.state.session.on('streamCreated', (event) => {
      // 새롭게 등장한 구독할 객체를 subscriber에 저장
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;

      subscriber.on('streamPlaying', (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          'custom-class',
        );
      });
      // 새로운 유저 껍데기를 만들어서 거기에 이벤트로 받은 stream정보를 넣은 후에 내 remotes에 등록
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      newUser.setAudioActive(event.stream.audioActive);
      newUser.setVideoActive(event.stream.videoActive);

      newUser.setAttendenceTime(
        JSON.parse(event.stream.connection.data).attTime,
      );
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  // subscribeToStreamDestroyed: streamDestoryed 이벤트가 들어왔을 때 해당하는 stream요소를 구독 목록에서 제거하는 함수
  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      this.updateLayout();
    });
  }

  // subscribeToUserChanged: 구독한 유저중에 닉네임, 비디오, 오디오, 화면공유, 포인트 상태가 변경되었을 때 감지해서 화면을 바꿔주는 함수
  subscribeToUserChanged() {
    this.state.session.on('signal:userChanged', (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log('EVENTO REMOTE: ', event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.point !== undefined) {
            user.setPoint(data.point);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
          if (data.picked !== undefined) {
            user.setPicked(data.picked);
          }
          if (data.randPick !== undefined) {
            if (
              data.randPick ===
              this.state.localUser.getStreamManager().stream.streamId
            ) {
              // alert(this.state.myUserName + "님이 뽑혔습니다!");
              this.alertToChat(this.state.myUserName + '님이 뽑혔습니다!');
              if (!data.picked) {
                this.toggleShield();
              } else {
                // this.tempFrameChange({ type: "color", value: "Red" });
                this.tempFrameChange({
                  type: 'style',
                  value: {
                    animation: 'alertFrame 2s linear 1',
                  },
                });
              }
            } else if (
              data.randPick !==
              this.state.localUser.getStreamManager().stream.streamId
            ) {
              // this.toggleShieldLoading();
              if (!data.picked) {
                this.toggleShieldLoading();
              }
            }
          }
          if (data.isSmileActive !== undefined) {
            user.setSmileActive(data.isSmileActive);
          }
          if (data.isOutAngleActive !== undefined) {
            user.setOutAngleActive(data.isOutAngleActive);
          }
          if (data.frameColor !== undefined) {
            user.setFrameColor(data.frameColor);
          }
          if (data.clickEvent !== undefined) {
            this.addNewStickers(data.clickEvent);
          }
          if (data.quizCreated !== undefined) {
            this.popUpQuiz(data.quizCreated);
          }
          if (data.quizAnswerCreated !== undefined) {
            this.answerUpdate(data.quizAnswerCreated);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen(),
      );
    });
  }

  subscribeToSessionClosed() {
    this.state.session.on('signal:classClosed', (event) => {
      console.log('닫힘');
      this.leaveSession();
    });
  }

  // updateLayout: 레이아웃을 업데이트 하는 함수
  updateLayout() {
    this.setState({
      totalHeight: this.layout.getHeight(document.getElementById('layout')),
      totalWidth: this.layout.getWidth(document.getElementById('layout')),
    });
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  // sendSignalUserChanged: 유저 정보가 변경되었음을 알려주는 함수
  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }

  // toggleFullscreen: 전체화면을 토글하는 함수
  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById('container');
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  // 디바이스들 갱신하기
  setMyVideos(videos) {
    this.setState({ videos: videos });
  }

  // 디바이스들 갱신하기
  setMyAudios(audios) {
    this.setState({ audios: audios });
  }

  // 디바이스들 갱신하기
  setMySpeakers(speakers) {
    this.setState({ speakers: speakers });
  }

  async setVideo(deviceId, devices) {
    try {
      const newVideoDevice = devices.filter(
        (device) => deviceId === device.deviceId,
      );

      // 새로운 디바이스가 존재한다면
      if (newVideoDevice.length > 0) {
        // Creating a new publisher with specific videoSource
        // In mobile devices the default and first camera is the front one
        // Publisher를 새롭게 설정
        const newPublisher = this.OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: newVideoDevice[0].deviceId,
          publishAudio: localUser.isAudioActive(),
          publishVideo: localUser.isVideoActive(),
          mirror: true,
        });

        //newPublisher.once("accessAllowed", () => {
        // 현재 스트림매니저가 관리하는 값들을 publish 해제하고 위에서 만든 새로운 Publisher를 발행 후 localUser에 등록
        await this.state.session.unpublish(
          this.state.localUser.getStreamManager(),
        );
        await this.state.session.publish(newPublisher);
        this.state.localUser.setStreamManager(newPublisher);
        // 현재 컴포넌트의 상태값 변경
        this.setState({
          currentVideoDevice: newVideoDevice[0],
          currentVideoDeviceId: newVideoDevice[0].deviceId,
          localUser: localUser,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async setAudio(deviceId, devices) {
    try {
      const newAudioDevice = devices.filter(
        (device) => deviceId === device.deviceId,
      );

      // 새로운 디바이스가 존재한다면
      if (newAudioDevice.length > 0) {
        // Creating a new publisher with specific videoSource
        // In mobile devices the default and first camera is the front one
        // Publisher를 새롭게 설정
        const newPublisher = this.OV.initPublisher(undefined, {
          audioSource: newAudioDevice[0].deviceId,
          videoSource: undefined,
          publishVideo: localUser.isVideoActive(),
          publishAudio: localUser.isAudioActive(),
          mirror: true,
        });

        //newPublisher.once("accessAllowed", () => {
        // 현재 스트림매니저가 관리하는 값들을 publish 해제하고 위에서 만든 새로운 Publisher를 발행 후 localUser에 등록
        await this.state.session.unpublish(
          this.state.localUser.getStreamManager(),
        );
        await this.state.session.publish(newPublisher);
        this.state.localUser.setStreamManager(newPublisher);
        // 현재 컴포넌트의 상태값 변경
        this.setState({
          currentAudioDevice: newAudioDevice[0],
          currentAudioDeviceId: newAudioDevice[0].deviceId,
          localUser: localUser,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  setSpeaker(deviceId) {
    this.setState({
      currentSpeakerDeviceId: deviceId,
    });
  }

  // switchCamera: 카메라를 변경할 때 작동하는 함수 (주의 - async!!!)
  async switchCamera() {
    try {
      // 오픈비두에 연결된 장치를 devices에 저장
      const devices = await this.OV.getDevices();
      // 비디오 인풋만 videoDevices에 저장
      var videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      // 비디오 디바이스가 존재하고, 비디오 장치가 1개 초과인 경우
      if (videoDevices && videoDevices.length > 1) {
        // 현재 디바이스가 아닌 장치를 저장
        var newVideoDevice = videoDevices.filter(
          (device) =>
            device.deviceId !== this.state.currentVideoDevice.deviceId,
        );

        // 새로운 디바이스가 존재한다면
        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          // Publisher를 새롭게 설정
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          // 현재 스트림매니저가 관리하는 값들을 publish 해제하고 위에서 만든 새로운 Publisher를 발행 후 localUser에 등록
          await this.state.session.unpublish(
            this.state.localUser.getStreamManager(),
          );
          await this.state.session.publish(newPublisher);
          this.state.localUser.setStreamManager(newPublisher);
          // 현재 컴포넌트의 상태값 변경
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // screenShare: 화면 공유를 도와주는 함수
  screenShare() {
    // 파폭만.. 이상해..
    const videoSource =
      navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';

    // 화면 공유 하는 사람의 상태 확인
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
          alert('Your browser does not support screen sharing');
        } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
          alert('You need to enable screen sharing extension');
        } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
          alert('You need to choose a window or application to share');
        }
      },
    );

    // 접근 허용이 되어있다면 스크린쉐어를 위한 상태값 변경
    publisher.once('accessAllowed', () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });

    // 다른 사람의 streamPlaying이 발생했을 때 내 화면을 다시 초기화
    publisher.on('streamPlaying', () => {
      this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove('custom-class');
    });
  }

  // closeDialogExtension: 다이얼로그창 닫기 함수
  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  // stopScreenShare: 스크린쉐어 중지 함수
  stopScreenShare() {
    // 현재 내용 발행 중지
    this.state.session.unpublish(localUser.getStreamManager());
    // 웹캠 재연결
    this.connectWebCam();
  }

  // checkSomeoneShareScreen: 다른사람이 스크린쉐어를 하고있는지 확인
  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 2 / 3,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    this.layout.setLayoutOptions(openviduLayoutOptions);
    this.updateLayout();
  }

  // toggleChat: 채팅 토글 버튼, none면 채팅창 꺼짐, block이면 채팅창 켜짐
  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      // notify도 여기서 관리
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }

  // name: 오석호
  // date: 2022/07/27
  // desc: Participant를 확인하기 위한 버튼을 토글하는 기능
  // todo: 버튼을 누르면 this.state.participantDisplay가 현재와 반대 상태가 된다.
  toggleParticipant(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.participantDisplay === 'none' ? 'block' : 'none';
    }
    this.setState({ participantDisplay: display });
    this.updateLayout();
  }

  // checkNotification: 채팅 안내 확인
  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === 'none',
    });
  }

  // checkSize: 반응형 채팅창을 위한 사이즈체크
  checkSize() {
    if (
      document.getElementById('layout').offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat('none');
      this.toggleParticipant('none');
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById('layout').offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

  // name: 한준수
  // date: 2022/07/28
  // desc: 선생님이 랜덤한 학생을 지목하는 기능
  // todo: 호출 시 현재 참여자 중 랜덤한 1명을 지목하고, 추첨 결과를 전체 참여자에게 공유한다.
  // Hack: 선생님 계정 체크
  pickRandomStudent(list, bool) {
    if (list.length > 0) {
      let studentList = [];
      // 선생님이거나 관리자가 아닌 계정(체크 방식 변경 예정)
      list.forEach((elem) => {
        if (!elem.nickname.includes('(선생님)')) {
          studentList.push(elem);
        }
      });
      if (studentList.length > 0) {
        let pickedStudent =
          studentList[Math.floor(Math.random() * studentList.length)];
        this.setState({ randPick: pickedStudent }, () => {
          if (this.state.randPick) {
            this.sendSignalUserChanged({
              randPick: this.state.randPick.streamManager.stream.streamId,
              picked: bool,
            });
            this.setState({ localUser: localUser });
          }
        });
      }
    }
  }

  // smile: 유저 웃는얼굴 체크
  smile(event) {
    if (event !== localUser.isSmileActive()) {
      localUser.setSmileActive(!localUser.isSmileActive());
      localUser.getStreamManager().publishVideo(localUser.isVideoActive());
      this.sendSignalUserChanged({ isSmileActive: localUser.isSmileActive() });
      this.setState({ localUser: localUser });
    }
  }

  // outAngle: 유저 화면내에 화상인식 여부
  outAngle(event) {
    if (event !== localUser.isOutAngleActive()) {
      localUser.setOutAngleActive(!localUser.isOutAngleActive());
      localUser.getStreamManager().publishVideo(localUser.isVideoActive());
      this.sendSignalUserChanged({
        isOutAngleActive: localUser.isOutAngleActive(),
      });
      this.setState({ localUser: localUser });
    }
  }

  // name: 한준수
  // date: 2022/07/26
  // desc: frameChanged: 테두리 색깔 설정 변경
  // todo: {type: "color", value: "#F8CBD3"} 형식으로 전달받은 값대로 현재 유저의 frameColor 값을 변경하고, 다른 유저들에게도 변경 사실을 전달한다.
  frameChanged(frameColor) {
    let localUser = this.state.localUser;
    localUser.setFrameColor(frameColor);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      frameColor: this.state.localUser.getFrameColor(),
    });
  }

  // name: 한준수
  // date: 2022/07/27
  // desc: alertToChat: 채팅 창에 메세지를 보내는 기능
  // todo: String 형식으로 전달받은 값대로 시스템 명의를 사용해서 채팅을 전송한다.
  alertToChat(message) {
    if (localUser && message) {
      if (message !== '' && message !== ' ') {
        const data = {
          message: message,
          nickname: 'System',
        };
        localUser.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: 'chat',
        });
      }
    }
  }

  toggleShield() {
    this.setState({ shieldDisplay: !this.state.shieldDisplay });
    this.updateLayout();
  }

  toggleShieldLoading = () => {
    this.setState({ shieldLoadingDisplay: !this.state.shieldLoadingDisplay });
    this.updateLayout();
  };

  // name: 한준수
  // date: 2022/07/28
  // desc: checkUserHasItem: 아이템 소지 여부를 체크하는 함수
  // todo: int 형식으로 전달받은 itemId값을 바탕으로 현재 유저의 아이템 소지여부를 확인해서 localUser에 저장하고 공유하는 함수
  checkUserHasItem(itemId) {
    if (itemId !== -1) {
      // axios 요청으로 아이템 정보 획득
    } else {
      // 잘못된 itemId값 입력
    }
  }

  // name: 한준수
  // date: 2022/07/28
  // desc: startStickerEvent: 칭찬스티커 클릭이벤트를 발생시키는 함수
  // todo: subscribers에게 sendSignal을 통해 클릭이벤트를 발생시키는 함수
  startStickerEvent = () => {
    this.state.subscribers.forEach((subs) => {
      this.sendSignalUserChanged({
        clickEvent: 3,
      });
    });
  };

  // addNewStickers: 호출 시 int값으로 주어진 multiple개 만큼의 칭찬스티커를 전체 화면에 생성하는 함수
  addNewStickers = (multiple) => {
    this.removeAllStickers();
    for (let i = 1; i <= multiple; i++) {
      this.addNewSticker(i);
    }
    setTimeout(() => {
      this.removeAllStickers();
    }, 4 * 1000);
  };

  // addNewSticker: 호출 시 int값으로 주어진 cur을 키값으로 가지는 칭찬스티커를 전체 화면에 생성하는 함수
  // name: 오석호
  // date: 2022/07/29
  // desc: 로직 일부 수정 - 채팅창이나 참여자 목록을 켰을 때 발생할 수 있는 30% 및 하단 툴바 고려
  addNewSticker = (current) => {
    let imgSize = 100;
    let margin = 8;
    let xStart = margin + 140;
    let xEnd = this.state.totalWidth * 0.7 - imgSize * 2;
    let yStart = margin;
    let yEnd = this.state.totalHeight - 80 - imgSize * 2;

    let newSticker = {
      key: current,
      point: 5,
      top: this.between(yStart, yEnd),
      left: this.between(xStart, xEnd),
    };
    this.setState({ stickers: [...this.state.stickers, newSticker] });
  };

  // removeAllStickers: 호출 시 현재 화면에 생성된 모든 칭찬스티커를 제거하는 함수
  removeAllStickers = () => {
    this.setState({ stickers: [] });
  };

  // removeSticker: 호출 시 int값으로 주어진 current을 키값으로 가지는 칭찬스티커를 제거하는 함수
  removeSticker = (current) => {
    this.setState({
      stickers: this.state.stickers.filter(
        (sticker) => sticker.key !== current,
      ),
    });
  };

  // between: min과 max 사이의 랜덤한 int값을 반환하는 함수
  between = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  tempFrameChange = (tempColor) => {
    let myFrameColor = this.state.localUser.frameColor;
    if (tempColor.type === 'color') {
      let styleColor = tempColor.value;
      tempColor = {
        type: 'style',
        value: {
          border: '8px solid ' + styleColor,
        },
      };
    }
    this.frameChanged(tempColor);
    localUser.setFrameColor(tempColor);
    setTimeout(() => {
      this.frameChanged(myFrameColor);
      this.sendSignalUserChanged({
        picked: false,
      });
    }, 1.5 * 1000);
  };

  // name: 오석호
  // date: 2022/08/05
  // desc: 설정창 켜고끄기
  toggleSetting() {
    console.log(this.state.settingDisplay);
    this.setState({ settingDisplay: !this.state.settingDisplay });
  }

  // name: 원재호
  // date: 2022/08/02
  // desc: 퀴즈 관련 함수 모아놓음
  toggleQuiz = (quiz) => {
    if (quiz) {
      this.sendSignalUserChanged({ quizCreated: quiz });
      this.setState({ quiz: quiz });
    } else {
      this.setState({ quizDisplay: !this.state.quizDisplay });
    }
  };

  toggleQuizStudent = (answer) => {
    if (answer) {
      this.sendSignalUserChanged({ quizAnswerCreated: answer });
    }
    this.setState({ quizDisplayStudent: !this.state.quizDisplayStudent });
  };

  popUpQuiz = (newQuiz) => {
    if (newQuiz) {
      this.setState({ quiz: newQuiz, quizDisplayStudent: true });
    }
  };

  answerUpdate = (answer) => {
    console.log(answer);
    if (answer === 'a1') {
      this.setState({
        ...this.state,
        quiz: { ...this.state.quiz, answerA1: this.state.quiz.answerA1 + 1 },
      });
    } else if (answer === 'a2') {
      this.setState({
        ...this.state,
        quiz: { ...this.state.quiz, answerA2: this.state.quiz.answerA2 + 1 },
      });
    } else if (answer === 'a3') {
      this.setState({
        ...this.state,
        quiz: { ...this.state.quiz, answerA3: this.state.quiz.answerA3 + 1 },
      });
    } else if (answer === 'a4') {
      this.setState({
        ...this.state,
        quiz: { ...this.state.quiz, answerA4: this.state.quiz.answerA4 + 1 },
      });
    }
    console.log(this.state.quiz);
  };

  // render: 렌더링을 담당setMy하는 함수
  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    const subscribers = this.state.subscribers;
    const chatDisplay = { display: this.state.chatDisplay };
    const participantDisplay = { display: this.state.participantDisplay };

    return (
      <>
        <div className="container" id="container">
          <Setting
            display={this.state.settingDisplay}
            toggleSetting={this.toggleSetting}
            header="Setting"
            setMyVideos={this.setMyVideos}
            setMyAudios={this.setMyAudios}
            setMySpeakers={this.setMySpeakers}
            videos={this.state.videos}
            audios={this.state.audios}
            speakers={this.state.speakers}
            setVideo={this.setVideo}
            setAudio={this.setAudio}
            setSpeaker={this.setSpeaker}
            currentVideoDeviceId={this.state.currentVideoDeviceId}
            currentAudioDeviceId={this.state.currentAudioDeviceId}
            currentSpeakerDeviceId={this.state.currentSpeakerDeviceId}
          />

          <QuizModal
            display={this.state.quizDisplay}
            toggleQuiz={this.toggleQuiz}
            header="Quiz Modal"
            quiz={this.state.quiz}
          />
          <QuizModalStudent
            display={this.state.quizDisplayStudent}
            toggleQuizStudent={this.toggleQuizStudent}
            header="Quiz Modal"
            quiz={this.state.quiz}
          />
          <ShieldModalLoading
            display={this.state.shieldLoadingDisplay}
            toggleShieldLoading={this.toggleShieldLoading}
            timeOut={2.5}
            header="방어권 구경"
          />
          <ShieldModal
            display={this.state.shieldDisplay}
            user={localUser}
            toggleShield={this.toggleShield}
            alertToChat={this.alertToChat}
            pickRandomStudent={this.pickRandomStudent}
            tempFrameChange={this.tempFrameChange}
            subscribers={subscribers}
            timeOut={3}
            header="방어권 사용"
          />

          {/* 다이얼로그 */}
          <DialogExtensionComponent
            showDialog={this.state.showExtensionDialog}
            cancelClicked={this.closeDialogExtension}
          />

          {/* 칭찬스티커 */}
          {this.state.stickers.map((stickerKey) => (
            <Sticker
              key={stickerKey.key}
              point={stickerKey.point}
              top={stickerKey.top}
              removeSticker={this.removeSticker}
              left={stickerKey.left}
              localUser={localUser}
            ></Sticker>
          ))}

          {/* 유저 카메라 화면 */}
          <div
            id="layout"
            className={
              this.state.chatDisplay === 'block' ||
              this.state.participantDisplay === 'block'
                ? 'sth_on_bounds'
                : 'bounds'
            }
          >
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <div
                  className="OT_root OT_publisher custom-class"
                  id="localUser"
                >
                  <StreamComponent
                    user={localUser}
                    currentSpeakerDeviceId={this.state.currentSpeakerDeviceId}
                  />
                  <FaceDetection
                    autoPlay={localUser.isScreenShareActive() ? false : true}
                    camera={localUser.isVideoActive() ? false : true}
                    smile={this.smile}
                    outAngle={this.outAngle}
                  />
                </div>
              )}
            {this.state.subscribers.map((sub, i) => (
              <div
                key={i}
                className="OT_root OT_publisher custom-class"
                id="remoteUsers"
              >
                <StreamComponent
                  user={sub}
                  streamId={sub.streamManager.stream.streamId}
                  currentSpeakerDeviceId={this.state.currentSpeakerDeviceId}
                />
                <EmojiFilter user={sub} />
              </div>
            ))}
          </div>
          <div
            className={
              'sth_component ' +
              (this.state.chatDisplay === 'none' &&
              this.state.participantDisplay === 'none'
                ? 'display_none'
                : '')
            }
          >
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <div
                  className={
                    'OT_root custom-class ' +
                    (this.state.chatDisplay === 'block' &&
                    this.state.participantDisplay === 'block'
                      ? 'double_parti'
                      : 'parti')
                  }
                  style={participantDisplay}
                >
                  <ParticipantComponent
                    whoami={this.props.whoami}
                    user={localUser}
                    subscribers={subscribers}
                    participantDisplay={this.state.participantDisplay}
                    close={this.toggleParticipant}
                    upPointChanged={this.upPointChanged}
                    downPointChanged={this.downPointChanged}
                  />
                </div>
              )}
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <div
                  className={
                    'OT_root custom-class ' +
                    (this.state.participantDisplay === 'block' &&
                    this.state.chatDisplay === 'block'
                      ? 'double_chat'
                      : 'chat')
                  }
                  style={chatDisplay}
                >
                  <ChatComponent
                    user={localUser}
                    subscribers={subscribers}
                    chatDisplay={this.state.chatDisplay}
                    close={this.toggleChat}
                    messageReceived={this.checkNotification}
                  />
                </div>
              )}
          </div>
          {/* 하단 툴바 */}
          <div className="toolbar">
            <ToolbarComponent
              teacherName={this.props.teacherName}
              classTitle={this.props.classTitle}
              whoami={this.props.whoami}
              sessionId={mySessionId}
              user={localUser}
              showNotification={this.state.messageReceived}
              camStatusChanged={this.camStatusChanged}
              micStatusChanged={this.micStatusChanged}
              pickRandomStudent={this.pickRandomStudent}
              subscribers={subscribers}
              screenShare={this.screenShare}
              stopScreenShare={this.stopScreenShare}
              toggleFullscreen={this.toggleFullscreen}
              switchCamera={this.switchCamera}
              leaveSession={this.leaveSession}
              selfLeaveSession={this.selfLeaveSession}
              toggleChat={this.toggleChat}
              toggleParticipant={this.toggleParticipant}
              toggleQuiz={this.toggleQuiz}
              toggleSetting={this.toggleSetting}
              startStickerEvent={this.startStickerEvent}
            />
          </div>
        </div>
      </>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  // getToken: 현재 내 세션아이디를 이용해서 세션을 생성하고 토큰을 발급하는 함수
  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId),
    );
  }

  // createSession: 세션 생성 함수 (주의! promise를 반환!!) - 서버에 세션아이디를 요청해서 세션을 생성해서 id값을 받아오는 함수
  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESSION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                this.OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  }

  // createToken: 특정 sessionId에 대해서 오픈비두 서버에 토큰을 요청해서 받아오는 함수 (주의! Promise 반환!)
  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}
export default VideoRoomComponent;
