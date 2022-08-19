import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setContent, selectContent } from '@store/content';
import { ClassNames, css } from '@emotion/react';
import TimeTableClassInfo from './TimeTableLine';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import loadingImg from '@src/openvidu/assets/images/loadingimg.gif';
import CloseIcon from '@mui/icons-material/Close';

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
      <div css={totalContainer}>
        <div className="main">
          <div className="nav">
            <h2>시간표</h2>
            <CloseIcon
              fontSize={'large'}
              onClick={close}
              style={{ cursor: 'pointer', textAlign: 'right' }}
            />
          </div>
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
                return (
                  <div key={idx} className="class">
                    <TimeTableClassInfo dayList={list.classEntityList} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{loading ? <div></div> : render()}</div>;
};

const totalContainer = css`
  position: absolute;
  top: 120px;
  right: 200px;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.4s;

  .nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    margin-top: 30px;
    margin-right: 20px;
  }

  h2 {
    margin-right: 170px;
  }

  .main {
    position: absolute;
    width: 500px;
    height: 500px;
    background-color: white;
    opacity: 0.95;
    border-radius: 20px;
    box-shadow: 2px 2px 10px -5px;
  }

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
    margin: 0px;
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
    justify-content: start;
    height: fit-content;
  }

  .timeline {
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
  .time {
    font-size: 20px;
    margin-bottom: 11px;
    margin-top: 10px;
  }
  @keyframes fadeIn {
    from {
      position: absolute;
      opacity: 0;
    }
    to {
      position: absolute;
      opacity: 1;
    }
  }
`;

export default TimeTable;
