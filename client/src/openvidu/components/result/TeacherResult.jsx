import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const TeacherResult = ({
  teacherName,
  classTitle,
  whoami,
  myData,
  othersData,
  finTime,
}) => {
  const [totalStudentNum, setTotalStudentNum] = useState(0);
  const [attStudentNum, setAttStudentNum] = useState(0);
  const [totalSticker, setTotalSticker] = useState(0);

  useEffect(() => {
    setTotalStudentNum(othersData.length); // 우선 임시로
    setAttStudentNum(othersData.length); // 참여자 수
    setTotalSticker(othersData.reduce((acc, cur) => (acc += cur.point), 0)); // 총 부여 스티커 계산식

    console.log(totalSticker);
  }, [whoami, myData, othersData, totalSticker]);

  // 스크롤 처리 해야함

  return (
    <div css={TotalContainer}>
      <h2>TeacherResult</h2>
      <p>고생하셨습니다 {teacherName} 선생님!</p>
      <div css={ClassStatistic}>
        <h3>수업 통계</h3>
        <div className="teacher index">
          <div className="t-classname">수업 이름</div>
          <div className="t-nickname">선생님 이름</div>
          <div className="t-attendence-time">수업 개설 시간</div>
          <div className="t-fin-time">수업 종료 시간</div>
          <div className="t-point">총 부여 상점</div>
          <div className="t-student-number">전체 학생 수</div>
          <div className="t-att-student-number">참여 학생 수</div>
        </div>
        <div className="teacher">
          <div className="t-classname">{classTitle}</div>
          <div className="t-nickname">{teacherName}</div>
          <div className="t-attendence-time">{myData.attendenceTime}</div>
          <div className="t-fin-time">{finTime}</div>
          <div className="t-point">{totalSticker}</div>
          <div className="t-student-number">{attStudentNum}</div>
          <div className="t-att-student-number">{totalStudentNum}</div>
        </div>
      </div>
      <div css={TotalResult}>
        <h3>학생 통계</h3>
        <div className="person index">
          <div className="s-nickname">닉네임</div>
          <div className="s-attendence-time">최종 출석 시간</div>
          <div className="s-point">상점</div>
        </div>
        {othersData.map((other, i) => (
          <div key={i} className="person">
            <div className="s-nickname">{other.nickname}</div>
            <div className="s-attendence-time">{other.attendenceTime}</div>
            <div className="s-point">{other.point}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TotalContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ClassStatistic = css`
  display: flex;
  flex-direction: column;
  margin: 2rem;

  h3 {
    text-align: center;
  }

  .teacher {
    display: flex;
    flex-direction: row;

    & > div {
      display: flex;
      margin: 1rem;
      height: 1rem;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    & > .t-classname {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }

    & > .t-nickname {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }

    & > .t-attendence-time,
    .t-fin-time {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }

    & > .t-point,
    .t-student-number,
    .t-att-student-number {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }
  }
`;

const TotalResult = css`
  display: flex;
  flex-direction: column;
  margin: 2rem;

  h3 {
    text-align: center;
  }

  .person {
    display: flex;
    flex-direction: row;

    & > div {
      display: flex;
      margin: 1rem;
      height: 1rem;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    & > .s-nickname {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }

    & > .s-attendence-time {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }

    & > .s-point {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default TeacherResult;
