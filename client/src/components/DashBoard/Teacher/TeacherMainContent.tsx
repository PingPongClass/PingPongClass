import { css } from '@emotion/react';
import TeacherMyInfo from '@components/DashBoard/Teacher/TeacherMyInfo';
import TeacherTodaysClass from '@components/DashBoard/Teacher/TeacherTodaysClass';
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
    const teacherId = memberStore.userId;
    const classDay = dt.getDay();
    const result = await AXIOS.get(`/classes`, {
      params: { id: teacherId, day: classDay },
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
        <TeacherMyInfo />
      </div>
      <div className="todaysClass">
        <h2>오늘의 수업</h2>
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
  animation: 0.5s ease-in-out loadEffect1;

  .myInfo {
    width: 100%;
    height: auto;
    margin-bottom: 30px;
  }

  .todaysClass {
    margin-top: 30px;
    height: 300px;
    width: 100%;
  }
`;
export default MainContent;
