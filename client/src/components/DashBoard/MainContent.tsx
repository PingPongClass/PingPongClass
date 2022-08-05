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
      <div className="attandance">
        <h2>나의 참여도</h2>
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
  gap: 10px;

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
    height: 400px;
    width: 100%;
  }

  .todaysClass {
    height: 300px;
    width: 100%;
  }

  .attandance {
    height: auto;
    width: 100%;
  }
`;
export default MainContent;
