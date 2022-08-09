import { css } from '@emotion/react';
import ProfilImage from '../../../assets/images/profile.png';
import { useAppSelector } from '@src/store/hooks';
import IosModalNew from '@src/components/Common/IosModalNew';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';

const TeacherMyInfo = () => {
  const memberStore = useAppSelector((state) => state.member);
  const [email, setEmail] = useState(memberStore.email);
  const navigate = useNavigate();
  const [manageGrade, setManageGrade] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordConfirm] = useState('');
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [isUse, setUse] = useState(false);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeManageGrade = (e) => {
    setManageGrade(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const emailCheck = async () => {
    //유효성검사
    console.log(email);
    console.log(memberStore.email);
    if (email == null) {
      alert('이메일을 입력해주세요.');
    } else if (email === memberStore.email) {
      console.log('gd');
      setUse(true);
    } else {
      InterceptedAxios.get(`/users/email/${email}`)
        .then(function () {
          setEmail(email);
          setUse(true);
        })
        .catch(function (error) {
          setEmail('');
          setUse(false);
        });
    }
  };

  const onEditMyInfo = (e) => {
    emailCheck();
    if (password == null) {
      alert('비밀번호를 입력해주세요.');
    } else if (isUse === false) {
      alert('사용할 수 없는 이메일입니다. 다시 확인해주세요.');
    } else if (manageGrade === null) {
      alert('담당학년을 입력해주세요.');
    } else if (passwordconfirm == null) {
      alert('비밀번호확인을 입력해주세요.');
    } else if (!(password === passwordconfirm)) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    } else {
      InterceptedAxios.patch('/teachers', {
        teacher: {
          teacherId: memberStore.userId,
          manageGrade: manageGrade,
          email: email,
          password: password,
        },
      })
        .then(function (response) {
          alert('정보가 수정되었습니다.');
          if (memberStore.userId >= 2022000000) {
            navigate('/student/studentmyinfo');
          } else {
            navigate('/teacher/teachermyinfo');
          }
        })
        .catch(function (error) {
          alert('정보 수정에 실패하였습니다.');
        });
    }
  };

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
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' ? (
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
            <span>담당학년</span>
            <input
              id="manageGrade"
              value={memberStore.manageGrade}
              type="text"
              onChange={(e) => onChangeManageGrade(e)}
            />
          </div>
          <div className="fieldContainer">
            <span>이메일</span>
            <input
              id="email"
              type="text"
              value={memberStore.email}
              placeholder=" 이메일을 입력하세요."
              onChange={(e) => onChangeEmail(e)}
            />
          </div>
          <div className="fieldContainer">
            <span>비밀번호</span>
            <input
              id="password"
              type="password"
              placeholder=" 8자리 이상 16자리 이하, 영문자, 숫자 포함."
              onChange={(e) => onChangePassword(e)}
            />
          </div>
          <div className="fieldContainer">
            <span>비밀번호 확인</span>
            <input
              id="passwordConfirm"
              type="password"
              placeholder=" 비밀번호를 입력하세요."
              onChange={(e) => onChangePasswordConfirm(e)}
            />
          </div>
        </div>
      </div>
      <div className="buttonsContainer">
        <button type="button" className="submit" onClick={onEditMyInfo}>
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

  .commonModal {
    position: absolute;
    width: 800px;
    height: 100%;
  }
`;

export default TeacherMyInfo;
