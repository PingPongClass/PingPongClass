import { css } from '@emotion/react';
import IosModal from '../../Common/IosModal';
import ProfilImage from '../../../assets/images/profile.png';
import { useAppSelector } from '@src/store/hooks';

const StudentMyInfo = () => {
  const memberStore = useAppSelector((state) => state.member);
  return (
    <div css={ModalCSS}>
      <div className="info">
        <div className="profile">
          {memberStore.profileFullPath === '' ? (
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

        <div className="infolist">
          <div>
            <span>이름</span>
            <input id="name" value={memberStore.name} readOnly />
          </div>
          <div>
            <span id="infoname">학생정보</span>
            <input id="grade" type="text" value={memberStore.grade} readOnly />
            <span id="gradespan">학년</span>
            <input
              id="groupNum"
              type="text"
              value={memberStore.classNum}
              readOnly
            />
            <span id="groupNumspan">반</span>
            <input
              id="studentNum"
              type="text"
              value={memberStore.studentNum}
              readOnly
            />
            <span id="studentNumspan">번</span>
          </div>
          <div>
            <span>아이디</span>
            <input id="id" type="text" value={memberStore.userId} readOnly />
          </div>
          <div>
            <span>이메일</span>
            <input
              id="email"
              type="email"
              value={memberStore.email}
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
    </div>
  );
};

const ModalCSS = css`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: tomato;
`;

export default StudentMyInfo;
