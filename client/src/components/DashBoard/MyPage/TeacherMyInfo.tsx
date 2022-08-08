import { css } from '@emotion/react';
import ProfilImage from '../../../assets/images/profile.png';
import { useAppSelector } from '@src/store/hooks';
import IosModalNew from '@src/components/Common/IosModalNew';

const TeacherMyInfo = () => {
  const memberStore = useAppSelector((state) => state.member);
  return (
    <div css={ModalCSS}>
      <div className="commonModal">
        <IosModalNew />
      </div>
      <div className="infoContainer">
        <div className="profileContainer">
          {memberStore.profileFullPath === '' ? (
            <img src={ProfilImage} alt="프로필사진" className="profile-logo" />
          ) : (
            <img
              src={memberStore.profileFullPath}
              alt="프로필사진"
              className="profile-logo"
            />
          )}
          <a>프로필 수정</a>
        </div>

        <div className="infoListContainer">
          <div className="fieldContainer">
            <span>이름</span>
            <input id="name" value={memberStore.name} readOnly />
          </div>
          <div className="fieldContainer">
            <span>아이디</span>
            <input id="id" value={memberStore.userId} type="text" readOnly />
          </div>
          <div className="fieldContainer">
            <span>이메일</span>
            <input
              id="email"
              type="email"
              value={memberStore.email}
              placeholder=" 이메일을 입력하세요."
            />
          </div>
          <div className="fieldContainer">
            <span>비밀번호</span>
            <input
              id="password"
              type="password"
              placeholder=" 8자리 이상 16자리 이하, 영문자, 숫자 포함."
            />
          </div>
          <div className="fieldContainer">
            <span>비밀번호 확인</span>
            <input
              id="passwordConfirm"
              type="password"
              placeholder=" 비밀번호를 입력하세요."
            />
          </div>
        </div>
      </div>
      <div className="buttonsContainer">
        <button type="submit" className="submit">
          수정
        </button>
        <button type="button" className="cancel">
          취소
        </button>
      </div>
    </div>
  );
};

const ModalCSS = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .infoContainer {
    position: relative;
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    z-index: 999;
  }

  .profileContainer {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  .profileContainer img {
    height: 200px;
  }

  .infoListContainer {
    width: 480px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .buttonsContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    gap: 40px;
    z-index: 999;
  }

  .buttonsContainer button {
    background-color: #f6ac55;
    color: white;
    border: 0;
    padding: 10px 30px;
    border-radius: 20px;
    font-size: 20px;
    box-shadow: 2px 2px 10px -5px;
    box-sizing: border-box;
    font-family: 'NanumSquareRound';
    cursor: pointer;
  }

  .fieldContainer {
    width: 100%;
    font-size: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .fieldContainer input {
    width: 270px;
    height: 30px;
    background-color: #f9f7e9;
    border: solid 1px #d7d7d7;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .fieldContainer span {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
  }

  .commonModal {
    position: absolute;
    width: 800px;
    height: 600px;
  }
`;

export default TeacherMyInfo;
