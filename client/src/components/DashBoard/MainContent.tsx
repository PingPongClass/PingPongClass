import { css } from '@emotion/react';
import HeatMap from '@components/DashBoard/HeatMap';
import MyInfo from '@components/DashBoard/MyInfo';
import TodaysClass from '@components/DashBoard/TodaysClass';

const MainContent = () => {
  return (
    <div css={totalContainer}>
      <div className="myInfo">
        <MyInfo />
      </div>
      <h2>오늘의 수업</h2>
      <div className="todaysClass">
        <TodaysClass />
      </div>
      <h2>나의 참여도</h2>
      <div className="attandance">
        <HeatMap />
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
  animation: 0.5s ease-in-out loadEffect1;

  .banner {
    height: auto;
    width: 100%;
  }

  .banner img {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    box-shadow: 2px 2px 15px -5px;
  }

  .myInfo {
    height: 450px;
    width: 100%;
    margin-bottom: 30px;
  }

  .todaysClass {
    height: 300px;
    width: 100%;
    box-sizing: border-box;
  }

  .attandance {
    width: 100%;
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
export default MainContent;
