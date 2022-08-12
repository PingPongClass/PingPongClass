import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setContent, selectContent } from '@store/content';
import { ClassNames, css } from '@emotion/react';
import TimeTableClassInfo from './TimcTableLine';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import loadingImg from '@src/openvidu/assets/images/loadingimg.gif';
interface TimeTableModalStyle {
  close: any;
}

const TimeTable = ({ close }: TimeTableModalStyle) => {
  const memberStore = useAppSelector((state) => state.member);
  const AXIOS = setupInterceptorsTo(axios.create());
  const [weeklyList, setWeeklyList] = useState([] as any);
  const userId = memberStore.userId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClassList().then(() => setLoading(false));
  }, []);

  const loadClassList = async () => {
    try {
      const result = await AXIOS.get(`/classes/today/${userId}`);
      setWeeklyList(result.data);
    } catch (e) {
      console.log(e);
    }
  };
  const day = ['월', '화', '수', '목', '금'];
  const timeline = [1, 2, 3, 4, 5, 6, 7];
  const array = [1, 2, 3, 4, 5];

  const render = () => {
    return (
      <div css={totalContainer} onClick={close}>
        <div className="upperpart">
          <div className="blankspace"></div>
          <div className="classday">
            {day.map((value, idx) => {
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
            {timeline.map((value) => {
              return (
                <div className="time" key={value}>
                  {value}
                </div>
              );
            })}
          </div>
          <div className="column">
            {weeklyList.map((list, idx) => {
              console.log(list);
              return (
                <div key={idx} className="class">
                  <TimeTableClassInfo dayList={list.classEntityList} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <div className="loadingImgBox">
          <h1>로딩중...</h1>
        </div>
      ) : (
        render()
      )}
    </div>
  );
};

const totalContainer = css`
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 999;
  width: 450px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 20px;

  .upperpart,
  .mainPart {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-space-between;
  }
  .upperpart {
    margin-top: 20px;
    height: 50px;
  }
  .mainPart {
  }
  .blankspace,
  .timeline {
    width: 50px;
    height: 100%;
    margin: 5px;
  }
  .classday,
  .column {
    width: 85%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
  }
  .column {
    height: 100%;
  }

  .classday {
    height: 50px;
    font-size: 25px;
    align-items: center;
  }

  .timeline,
  .class {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .timeline {
    height: 100%
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 23px;
  }

  .class {
    width: 100%;
    height: 100%;
    margin: 5px;
  }

  .day {
    height: 30px;
  }
  .time{
    margin-bottom:10px;
  }
  @keyframes fadeIn {
    from {
      position: absolute;
      right: -420px;
      opacity: 0;
    }
    to {
      position: absolute;
      right: -0px;
      opacity: 1;
    }
  }

`;

export default TimeTable;
