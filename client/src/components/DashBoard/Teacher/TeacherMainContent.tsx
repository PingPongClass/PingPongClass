import { css } from '@emotion/react';
import TeacherMyInfo from '@components/DashBoard/Teacher/TeacherMyInfo';
import TeacherTodaysClass from '@components/DashBoard/Teacher/TeacherTodaysClass';

const MainContent = () => {
  return (
    <div css={totalContainer}>
      <div className="myInfo">
        <TeacherMyInfo />
      </div>
      <h2>오늘의 수업</h2>
      <div className="todaysClass">
        <TeacherTodaysClass />
      </div>
    </div>
  );
};

const totalContainer = css`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
  flex-direction: column;
  justify-content: start;
  box-sizing: border-box;
  gap: 10px;

  .myInfo {
    width: 100%;
    height: auto;
  }

  .todaysClass {
    height: 300px;
    width: 100%;
  }

  .attandance {
    width: 100%;
  }
`;
export default MainContent;
