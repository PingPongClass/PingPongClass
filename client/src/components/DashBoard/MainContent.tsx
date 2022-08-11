import { css } from '@emotion/react';
import HeatMap from '@components/DashBoard/HeatMap';
import MyInfo from '@components/DashBoard/MyInfo';
import TodaysClass from '@components/DashBoard/TodaysClass';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@src/store/hooks';

const MainContent = () => {
  const AXIOS = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const [classList, setClassList] = useState([] as any);
  var dt = new Date();
  const loadClassList = async () => {
    const studentId = memberStore.userId;
    const classDay = dt.getDay();
    const result = await AXIOS.get(`/classes`, {
      params: { id: studentId, day: classDay },
    });
    setClassList(result.data.content);
  };

  useEffect(() => {
    if (memberStore.userId !== -1) {
      loadClassList();
    }
  }, []);
  return (
    <div css={totalContainer}>
      <div className="myInfo">
        <MyInfo />
      </div>
      <h2>오늘의 수업</h2>
      <div className="todaysClass">
        <TodaysClass classList={classList} />
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
