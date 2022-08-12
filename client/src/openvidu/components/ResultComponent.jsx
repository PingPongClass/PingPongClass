import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import TeacherResult from './result/TeacherResult';
import StudentResult from './result/StudentResult';
import './SetupComponent.css';
import { getAudios, getVideos } from './utils/customUseDevice';

const Result = (props) => {
  const { teacherName, classTitle, whoami, myData, othersData } = props;

  // 결과창 나온 시간
  const time = new Date();
  const finTime =
    String(time.getHours()).padStart(2, '0') +
    ':' +
    String(time.getMinutes()).padStart(2, '0') +
    ':' +
    String(time.getSeconds()).padStart(2, '0');

  // // 장치 중지시키기
  // const stopDevices = async () => {
  //   const audios = await getAudios();
  //   const videos = await getVideos();
  //   console.log(audios);
  // };
  // stopDevices();

  return (
    <>
      <div css={TotalContainer}>
        {whoami === 'teacher' ? (
          <>
            <TeacherResult
              whoami={whoami}
              myData={myData}
              othersData={othersData}
              teacherName={teacherName}
              classTitle={classTitle}
              finTime={finTime}
            />
          </>
        ) : (
          <>
            <StudentResult
              whoami={whoami}
              myData={myData}
              othersData={othersData}
              teacherName={teacherName}
              classTitle={classTitle}
              finTime={finTime}
            />
          </>
        )}
      </div>
    </>
  );
};

const TotalContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  .btn-items {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Result;
