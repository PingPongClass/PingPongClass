import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoRoomComponent from './components/VideoRoomComponent';
import registerServiceWorker from './registerServiceWorker';

// HTML파일에서 root를 찾아서 그 곳에 VideoRoomComponent를 삽입
ReactDOM.render(
  <VideoRoomComponent />, document.getElementById('root')
);
registerServiceWorker();
