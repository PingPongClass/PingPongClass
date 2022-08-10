import { css } from '@emotion/react';
import defaultProfile from '@assets/images/defaultProfile.jpeg';
import { useAppSelector } from '@src/store/hooks';

const TeacherMyinfo = () => {
  const memberStore = useAppSelector((state) => state.member);

  return (
    <div css={totalContainer}>
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
        <h2 className="level">수업 현황 0/{memberStore.classes.length}</h2>
        <div className="stickerContainer">
          <div className="soFarSticker">
            <span>완료된 수업 : 0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
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
    width: 70%;
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
      width: 70%;
    }
  }
`;

export default TeacherMyinfo;
