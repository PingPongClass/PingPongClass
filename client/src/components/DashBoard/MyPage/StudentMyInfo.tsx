import { css } from '@emotion/react';
import IosModalNew from '@src/components/Common/IosModalNew';
import ProfilImage from '../../../assets/images/profile.png';
import { useAppSelector } from '@src/store/hooks';

const StudentMyInfo = () => {
  const memberStore = useAppSelector((state) => state.member);
  return (
    <div css={ModalCSS}>
      <div className="commonModal">
        <IosModalNew />
      </div>
      <div className="infoContainer">
        <div className="profileContainer">
          {memberStore.profileFullPath ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ||
          memberStore.profileFullPath ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' ||
          memberStore.profileFullPath === '' ? (
            <img src={ProfilImage} alt="프로필사진" className="profile-logo" />
          ) : (
            <img
              src={memberStore.profileFullPath}
              alt="프로필사진"
              className="profile-logo"
            />
          )}
          <p>프로필 수정</p>
        </div>

        <div className="infoListContainer">
          <div className="fieldContainer">
            <span>이름</span>
            <input id="name" value={memberStore.name} readOnly />
          </div>
          <div className="fieldContainer">
            <span id="infoname">학생정보</span>
            <div className="studentContainer">
              <div className="stuinfoContainer">
                <input
                  id="grade"
                  type="text"
                  value={memberStore.grade}
                  readOnly
                />
                <p id="gradespan">학년</p>
              </div>
              <div className="stuinfoContainer">
                <input
                  id="groupNum"
                  type="text"
                  value={memberStore.classNum}
                  readOnly
                />
                <p id="groupNumspan">반</p>
              </div>
              <div className="stuinfoContainer">
                <input
                  id="studentNum"
                  type="text"
                  value={memberStore.studentNum}
                  readOnly
                />
                <p id="studentNumspan">번</p>
              </div>
            </div>
          </div>
          <div className="fieldContainer">
            <span>아이디</span>
            <input id="id" type="text" value={memberStore.userId} readOnly />
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
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .infoContainer {
    position: relative;
    width: 80%;
    height: 60%;
    min-height: 100px;
    max-height: 250px;
    display: flex;
    margin-top: 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    z-index: 3;
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
    margin-top: 30px;
    gap: 40px;
    z-index: 3;
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
    font-size: 15pt;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
  }

  .fieldContainer input {
    width: 270px;
    height: 30px;
    background-color: #f9f7e9;
    border: solid 1px #d7d7d7;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: 'NanumSquareRound';
    font-size: 15pt;
  }

  .fieldContainer span {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
  }

  .studentContainer {
    display: flex;
    flex-direction: row;
    width: 270px;
    justify-content: space-evenly;
  }

  .stuinfoContainer {
    display: flex;
    flex-direction: row;
    width: 90px;
    align-items: center;
    justify-content: start;
  }

  .stuinfoContainer input {
    width: 30px;
    height: 30px;
    text-align: center;
    background-color: #f9f7e9;
    border: solid 1px #d7d7d7;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: 'NanumSquareRound';
    font-size: 15pt;
    justify-content: center;
    align-items: center;
  }

  .stuinfoContainer p {
    margin: auto;
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
    height: 100%;
  }
`;

export default StudentMyInfo;
