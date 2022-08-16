import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InterceptedAxios from '@utils/iAxios';
import './Emoji.css';

const Emoji = (props) => {
  const { display, toggleEmoji, sendEmoji, header, emoji, whoami, id } = props;

  // let emotions = [];
  const [emotions, setEmotions] = useState([]);

  const onClickEmotion = (emoji) => {
    toggleEmoji();
    sendEmoji(emoji);
  };

  useEffect(() => {
    if (display) {
      if (whoami === 'teacher') {
        //선생님이면 모든 리액션
        setEmotions([
          'heart',
          'clap',
          'cry',
          'sweat',
          'laughing',
          'good',
          'fire',
          '100',
          'disappointed',
          'question',
        ]);
      } else {
        //학생이면 보유리액션
        console.log('student');
        InterceptedAxios.get(`/items/reaction/${id}`)
          .then(function (response) {
            setEmotions(response.data);
            console.log(emotions);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, [display]);

  return (
    <div className={display ? 'openModal modal setting-container' : 'modal'}>
      {emotions.map((e, index) => {
        return (
          <img
            key={index}
            src={'../reactions/' + e + '.gif'}
            onClick={() => {
              onClickEmotion(e);
            }}
          />
        );
      })}
    </div>
  );
};

export default Emoji;
