import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setContent, selectContent } from '@store/content';
import { ClassNames, css } from '@emotion/react';
import TimeTableClassInfo from './TimcTableLine';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';

const TimeTable = () => {
  const memberStore = useAppSelector((state) => state.member);
  const AXIOS = setupInterceptorsTo(axios.create());
  const [weeklyList, setWeeklyList] = useState([] as any);
  const userId = memberStore.userId;

  useEffect(() => {
    loadClassList();
  }, []);

  const loadClassList = async () => {
    const result = await AXIOS.get(`/classes/today/${userId}`);
    console.log(result.data);
    setWeeklyList(result.data);
  };

  const day = ['월', '화', '수', '목', '금'];
  const timeline = [1, 2, 3, 4, 5, 6, 7];
  const array = [1, 2, 3, 4, 5];
  return (
    <div css={totalContainer}>
      <div className="upperpart">
        <div className="blankspace" />
        <div className="classday">
          {day.map(function (value, idx) {
            return (
              <div className="day" key={idx}>
                {value}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mainPart">
        <div className="timeline">
          {timeline.map(function (value) {
            return (
              <div className="time" key={value}>
                {value}
              </div>
            );
          })}
        </div>
        <div className="column">
          {!weeklyList
            ? null
            : weeklyList.map(function (list, idx) {
                return (
                  <div key={idx} className="class">
                    <TimeTableClassInfo dayList={list} />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .upperpart {
    margin-top: 20px;
    width: 80%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-space-between;
  }
  .blankspace {
    width: 5%;
    height: 100%;
    margin: 5px;
  }

  .classday {
    width: 85%;
    height: 60px;
    font-size: 30px;
    display: flex;
    justify-content: space-around;
  }
  .day {
    height: 70px;
    margin-bottom: 10px;
  }
  .mainPart {
    margin: 10px;
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-space-between;
  }
  .timeline {
    width: 5%;
    height: 100%;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 25px;
  }

  .column {
    width: 85%;
    height: 100%;
    margin: 5px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
  }
  .class {
    width: 100%;
    height: 100%;
    margin: 5px;
  }
`;

export default TimeTable;
