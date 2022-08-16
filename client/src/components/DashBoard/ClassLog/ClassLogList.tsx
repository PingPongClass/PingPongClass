/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useAppSelector } from '@src/store/hooks';
import ClassLog from './ClassLog';

export interface LogProps {
  classId: number;
  classTitle: string;
  subjectName: string;
  timetableId: number;
  attendance: boolean;
  point: number;
  presentCnt: number;
}

const ClassLogList = () => {
  const [value, setValue] = useState(new Date());
  const AXIOS = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const [logList, setLogList] = useState<LogProps[]>([]);
  const [dateList, setDateList] = useState([] as any);

  const loadLogList = (regdate) => {
    const studentId = memberStore.userId;
    AXIOS.post(`/records/log/student`, {
      regDate: moment(regdate).format('YYYY-MM-DD'),
      studentId: studentId,
    })
      .then(function (response) {
        setLogList(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('실패', error);
      });
  };

  const loadLogDate = async () => {
    await AXIOS.get('/records/log/student/' + memberStore.userId)
      .then(function (response) {
        setDateList(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('실패', error);
      });
  };

  useEffect(() => {
    loadLogDate();
    loadLogList(value);
  }, []);

  return (
    <div css={totalContainer}>
      <div className="calendarContainer">
        <Calendar
          onChange={(value, event) => {
            setLogList([]);
            setValue(value);
            loadLogList(value);
          }} // useState로 포커스 변경 시 현재 날짜 받아오기
          formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          navigationLabel={null}
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          className="mx-auto w-full text-sm border-b"
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            // let html = [];
            // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            // if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            //   html.push(<div className="dot"></div>);
            // }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            if (dateList.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
              return (
                <>
                  <div className="dotContainer">
                    <div className="dot"></div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="dotContainer">
                    <div className="emptydot"></div>
                  </div>
                </>
              );
            }
          }}
        />
      </div>
      <div className="logContainer">
        <h2>{moment(value).format('YYYY년 MM월 DD일')}</h2>
        <div className="tableArea">
          <div className="row titleRow">
            <div className="col classInfo">수업 시간</div>
            <div className="col classTitle">수업명</div>
            <div className="col attendance">출석여부</div>
            <div className="col point">얻은 퐁퐁</div>
            <div className="col presentCnt">발표횟수</div>
          </div>

          <div className="articleArea">
            {logList.map((log, index) => {
              return <ClassLog key={index} log={log} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  h2 {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .calendarContainer {
    width: 40%;
    margin-right: 40px;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .logContainer {
    width: 60%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: 1px solid gray;
  }

  .react-calendar {
    width: 90%;
    background: white;
    color: #222;
    border-radius: 15px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
    line-height: 1.125em;
    font-family: 'NanumSquareRound';
    padding: 10px;
  }

  .react-calendar__navigation button {
    color: gray;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
    font-size: 13pt;
    font-weight: 600;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e5e5ef;
    border-radius: 12px;
  }

  .react-calendar__navigation button[disabled] {
    background-color: white;
  }

  abbr[title] {
    text-decoration: none;
    font-size: 11pt;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #e5e5ef;
    color: var(--pink);
    border-radius: 20px;
  }

  .react-calendar__tile--now {
    background: #ffed7b;
    border-radius: 20px;
    font-weight: bold;
    color: #3b3776;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #f0db4e;
    border-radius: 20px;
    font-weight: bold;
    color: #3b3776;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #ffed7b;
    border-radius: 20px;
    font-weight: bold;
    color: #3b3776;
  }
  .react-calendar__tile--active {
    background: #eb9748;
    border-radius: 20px;
    font-weight: bold;
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #f4a18a;
    color: white;
    border-radius: 20px;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background: #f4a18a;
    border-radius: 20px;
    font-weight: bold;
    color: #3b3776;
  }

  .react-calendar__tile--range {
    background: #ffda7b;
    border-radius: 20px;
    font-weight: bold;
    color: #3b3776;
  }

  .dotContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .dot {
    height: 6px;
    width: 6px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }

  .emptydot {
    height: 6px;
    width: 6px;
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }

  /* table 영역 */
  .tableArea {
    width: 100%;
    height: 100%;
    /* overflow-y: scroll; */
    text-align: center;
  }

  /* 스크롤 바 숨기기 */
  .tableArea::-webkit-scrollbar {
    display: none;
  }

  .tableArea div {
    display: inline-block;
  }

  .row,
  .log.btn {
    width: 90%;
    height: 100%;
    border: none;
    background-color: transparent;
    font-family: 'NanumSquare';
    font-size: 0.9rem;
    font-weight: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .col {
    overflow: hidden;
    width: 15%;
    line-height: 30px;
  }
  /* 제목 행 */
  .titleRow {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 0.5rem 0;
    background-color: #c0d2e5;
    height: 23px;
    vertical-align: middle;
    font-weight: 400;
    font-size: 1em;
  }

  /* 게시글 항목 영역 */
  .articleArea {
    /* padding: 1% 0; */
    width: -webkit-fill-available;
    max-width: 100%;

    /* 제목줄 1줄 */
    .logRow {
      padding: 0.2rem 0;
      border-bottom: 1px solid gray;
    }

    /* 안 보이는 요소 */
    .hide {
      display: none;
    }

    /*  */
    .detailRow div {
      display: block;
    }

    .detailWriter {
      padding: 0.5rem;
      max-width: -webkit-max-content;
    }

    textarea {
      background-color: rgba(255, 255, 255, 0.7);
      border: none;
      resize: none;
    }
  }

  /* 특정 열 별 설정 */
  .classInfo,
  .classTitle {
    width: 7rem;
  }

  .point,
  .presentCnt,
  .attendance {
    width: 5rem;
  }

  select {
    max-width: 8%;
  }
  a {
    color: white;
    background-color: transparent;
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default ClassLogList;
