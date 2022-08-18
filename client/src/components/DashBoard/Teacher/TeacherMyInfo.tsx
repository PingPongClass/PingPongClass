import { css } from '@emotion/react';
import defaultProfile from '@assets/images/defaultProfile.jpeg';
import { useAppSelector } from '@src/store/hooks';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useEffect, useState } from 'react';

const TeacherMyinfo = () => {
  const memberStore = useAppSelector((state) => state.member);
  const AXIOS = setupInterceptorsTo(axios.create());
  const [classList, setClassList] = useState([] as any);
  const [finClassNum, setFinClassNum] = useState<number>(0);
  const dt = new Date();

  const loadClassList = async () => {
    const teacherId = memberStore.userId;
    const classDay = dt.getDay();
    const result = await AXIOS.get(`/classes`, {
      params: { id: teacherId, day: classDay },
    });
    setClassList(result.data.content);
  };

  useEffect(() => {
    loadClassList();
  }, []);

  useEffect(() => {
    const now = new Date();
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();
    let nowClassTime = 0;

    // 시간체크
    if (nowHour > 9 || (nowHour >= 9 && nowMinute >= 45)) nowClassTime = 1;
    if (nowHour > 10 || (nowHour >= 10 && nowMinute >= 40)) nowClassTime = 2;
    if (nowHour > 11 || (nowHour >= 11 && nowMinute >= 35)) nowClassTime = 3;
    if (nowHour > 12 || (nowHour >= 12 && nowMinute >= 30)) nowClassTime = 4;
    if (nowHour > 14 || (nowHour >= 14 && nowMinute >= 10)) nowClassTime = 5;
    if (nowHour > 15 || (nowHour >= 15 && nowMinute >= 5)) nowClassTime = 6;
    if (nowHour > 16 || (nowHour >= 16 && nowMinute >= 0)) nowClassTime = 7;

    let finClassCnt = 0;
    classList.forEach((elem) => {
      if (elem.timetableId <= nowClassTime) ++finClassCnt;
    });
    setFinClassNum(finClassCnt);
  }, [classList]);

  return (
    <div
      css={totalContainer({
        finPercent: `${(finClassNum / classList.length) * 100}%`,
      })}
    >
      <div className="infoContainer">
        {memberStore.profileFullPath ===
          'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ||
        memberStore.profileFullPath ===
          'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' ? (
          <img
            src={defaultProfile}
            alt="기본프로필사진"
            className="profile-logo"
          />
        ) : (
          <img
            src={memberStore.profileFullPath}
            alt="지정된프로필사진"
            className="profile-logo"
          />
        )}
        <div className="nameContainer">
          <h2>{memberStore.name} 선생님</h2>
        </div>
      </div>
      <div className="levelContainer">
        <h2 className="level">
          수업 현황 {finClassNum}/{classList.length}
        </h2>
        <div className="stickerContainer">
          {classList.length ? (
            !finClassNum ? (
              <>
                <span>완료된 수업 : 0</span>
              </>
            ) : (
              <div className="soFarSticker">
                <span>완료된 수업 : {finClassNum}</span>
              </div>
            )
          ) : (
            <span>오늘은 수업이 없습니다!</span>
          )}
        </div>
      </div>
    </div>
  );
};

const totalContainer = ({ finPercent }) => css`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 2px 2px 15px -5px;
  box-sizing: border-box;

  .infoContainer {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
  }
  .infoContainer img {
    display: inline-block;
    height: 80px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }
  .infoContainer img:hover {
    transform: scale(1.2);
  }
  .nameContainer {
    margin-left: 20px;
  }
  .rankBox {
    width: 50px;
  }
  .myBio {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .nameBox {
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .levelContainer {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .level {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
  }

  .stickerContainer {
    position: relative;
    width: 100%;
    height: 30px;
    border-radius: 20px;
    background-color: #d1d1d1;
  }
  .soFarSticker {
    position: relative;
    width: ${finPercent};
    height: 100%;
    background-color: #ffe790;
    border-radius: 20px;
    z-index: 1;
    animation: barIn2 0.6s;
    text-align: right;

    span {
      padding-right: 20px;
    }
  }
  img {
    border: 1px solid gray;
    border-radius: 100px;
    width: 80px;
    height: 30%;
  }

  @keyframes barIn {
    from {
      width: 0%;
    }
    to {
      width: 50%;
    }
  }

  @keyframes barIn2 {
    from {
      width: 0%;
    }
    to {
      width: ${finPercent};
    }
  }
`;

export default TeacherMyinfo;
