/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import HeatMap from './HeatMap';
import banner from '../../assets/images/banner.png';
import MyInfo from './MyInfo';
import TodaysClass from './TodaysClass';

const MainContent = () => {
  return (
    <div css={totalContainer}>
      <div className="banner">
        <img src={banner} alt="" />
      </div>
      <h1>내 정보</h1>
      <div className="myInfo">
        <MyInfo />
      </div>
      <h1>오늘의 수업</h1>
      <div className="todaysClass">
        <TodaysClass />
      </div>
      <div className="attandance">
        <h1>나의 참여도</h1>
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
    box-shadow: 3px 3px 10px -5px;
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
