/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import IosModal from '../../Common/IosModal';
import ProfilImage from '../../../assets/images/profile.png';

const StudentMyInfo = () => (
  <IosModal renderCenter={true} isRelative={true} width="75%" height="80%">
    <div css={ModalCSS}>
      <form>
        <div className="info">
          <div className="profile">
            <img
              src={ProfilImage}
              alt="프로필 기본로고"
              className="profile-logo"
            />
            <p>프로필 수정</p>
          </div>

          <div className="infolist">
            <div>
              <span>이름</span>
              <input id="name" readOnly />
            </div>
            <div>
              <span id="infoname">학생정보</span>
              <input id="grade" type="text" readOnly />
              <span id="gradespan">학년</span>
              <input id="groupNum" type="text" readOnly />
              <span id="groupNumspan">반</span>
              <input id="studentNum" type="text" readOnly />
              <span id="studentNumspan">번</span>
            </div>
            <div>
              <span>학번</span>
              <input id="id" type="text" readOnly />
            </div>
            <div>
              <span>이메일</span>
              <input
                id="email"
                type="email"
                placeholder=" 이메일을 입력하세요."
              />
            </div>
            <div>
              <span>비밀번호</span>
              <input
                id="password"
                type="password"
                placeholder=" 8자리 이상 16자리 이하, 영문자, 숫자 포함."
              />
            </div>
            <div>
              <span>비밀번호 확인</span>
              <input
                id="passwordConfirm"
                type="password"
                placeholder=" 비밀번호를 입력하세요."
              />
            </div>
          </div>
        </div>
        <br />
        <div className="buttons">
          <button type="submit" className="submit">
            수정
          </button>
          <button type="button" className="cancel">
            취소
          </button>
        </div>
      </form>
    </div>
  </IosModal>
);

const ModalCSS = css`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  .profile {
    text-align: center;
    .profile-logo {
      width: 10vw;
      height: auto;
    }
  }

  .info {
    display: flex;
    flex-direction: row;
  }

  .infolist {
    text-align: right;

    div {
      margin-bottom: 0.5rem;
    }
  }

  span {
    margin-right: 4vw;
    font-weight: 700;
  }

  input {
    height: 4vh;
    background-color: #f9f7e9;
    border: 0;
  }

  #name,
  #password,
  #passwordConfirm,
  #email,
  #id {
    width: 25vw;
  }

  #grade,
  #groupNum,
  #studentNum {
    width: 2.85vw;
    cursor: default;
  }

  #name,
  #id {
    cursor: default;
  }

  #gradespan,
  #groupNumspan,
  #studentNumspan {
    margin-right: 2.5vw;
    margin-left: 1.5vw;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;

    button {
      width: 10vw;
      height: 5vh;
      text-align: center;
      color: white;
      border: 0;
      border-radius: 6px;
      font-weight: 700;
    }

    .submit {
      background-color: #f6ac55;
    }

    .cancel {
      background-color: #cbcbcb;
      margin-left: 1rem;
    }
  }
`;

export default StudentMyInfo;
