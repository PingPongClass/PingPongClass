/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useAppSelector } from '@src/store/hooks';

export interface LogProps {
  classId: number;
  classTitle: string;
  subjectName: string;
  timetableId: number;
  attendance: boolean;
  point: number;
  presentCnt: number;
}

const TeacherClassLogList = () => {
  const [value, onChange] = useState(new Date());
  const AXIOS = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const [logList, setLogList] = useState<LogProps[]>([]);
  const [dateList, setDateList] = useState([] as any);
  const [weeklyList, setWeeklyList] = useState([] as any);
  const userId = memberStore.userId;
  const [classes, setClasses] = useState([] as any);
  const [isCalendar, setIsCalendar] = useState(false);

  const loadLogList = async () => {
    const classId = classes.classId;
    console.log(classId);
    await AXIOS.post('/records/log/teacher/' + classId, {
      regDate: moment(value).format('YYYY-MM-DD'),
    })
      .then(function (response) {
        setLogList(response.data);
      })
      .catch(function (error) {
        console.log('실패', error);
      });
  };

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

  const loadLogDate = async () => {
    await AXIOS.get('/records/log/teacher/' + classes.classId)
      .then(function (response) {
        setDateList(response.data);
      })
      .catch(function (error) {
        console.log('실패', error);
      });
  };

  const clickClassId = (data) => {
    setClasses(data);
    setIsCalendar(true);
  };

  useEffect(() => {
    loadLogList();
  }, [value]);

  useEffect(() => {
    loadClassList();
  }, []);

  useEffect(() => {
    loadLogDate();
  }, [classes]);

  return (
    <div css={totalContainer}>
      <div className="calendarContainer">
        <div className="timeTable">
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
                    {list.classEntityList.map((cls) => (
                      <div
                        key={cls.classId}
                        className={'classCard' + cls.classDay}
                        onClick={() => clickClassId(cls)}
                      >
                        {cls.classTitle.slice(-3)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {isCalendar && (
          <Calendar
            onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
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
              if (
                dateList.find((x) => x === moment(date).format('YYYY-MM-DD'))
              ) {
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
        )}
      </div>
      <div className="logContainer">
        <h2>
          {moment(value).format('YYYY년 MM월 DD일')}&nbsp;
          {day[value.getDay() - 1] + '요일'}
        </h2>
        <h3>
          {classes.timetableId + '교시'}&nbsp;
          {classes.classTitle}수업
        </h3>
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
              return (
                <div key={index} className="row logRow">
                  <div className="col classInfo">
                    {log.timetableId}교시 {log.subjectName}
                  </div>
                  <div className="col classTitle">{log.classTitle}</div>
                  {log.attendance ? (
                    <div className="col attendance">출석</div>
                  ) : (
                    <div className="col attendance">결석</div>
                  )}
                  <div className="col point">{log.point}</div>
                  <div className="col presentCnt">{log.presentCnt}</div>
                </div>
              );
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
  }

  .calendarContainer {
    width: 40%;
    margin-right: 40px;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
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
    height: 48%;
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

  .timeTable {
    width: 85%;
    height: 45%;
    background-color: white;
    opacity: 0.95;
    color: #222;
    border-radius: 15px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border: 1px solid gray;
  }

  .upperpart,
  .mainPart {
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .upperpart {
    height: 20%;
  }
  .mainPart {
    margin-left: 3px;
  }
  .blankspace,
  .timeline {
    width: 10px;
    height: 100%;
    margin: 7px;
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
    height: 90%;
  }

  .classday {
    font-size: 14pt;
    align-items: center;
    font-weight: 700;
  }

  .timeline,
  .class {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .timeline {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
  }

  .class {
    width: 100%;
    height: 100%;
    margin: 5px;
  }

  .time {
    margin-bottom: 15px;
  }

  .classCard1 {
    margin-top: -1px;
    height: 15%;
    margin-bottom: 8px;
    background: #d2e2f9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 13pt;
    padding: 3px;
  }

  .classCard2 {
    margin-top: -1px;
    height: 15%;
    margin-bottom: 8px;
    background: #fad6dd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 13pt;
    padding: 3px;
  }

  .classCard3 {
    margin-top: -1px;
    height: 15%;
    margin-bottom: 8px;
    background: #fff1bf;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 13pt;
    padding: 3px;
  }

  .classCard4 {
    margin-top: -1px;
    height: 15%;
    margin-bottom: 8px;
    background: #e9dbff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 13pt;
    padding: 3px;
  }

  .classCard5 {
    margin-top: -1px;
    height: 15%;
    margin-bottom: 8px;
    background: #cee7db;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 13pt;
    padding: 3px;
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

export default TeacherClassLogList;
