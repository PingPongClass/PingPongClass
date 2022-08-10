import { css } from '@emotion/react';
import ProfilImage from '../../../assets/images/profile.png';
import { useAppSelector } from '@src/store/hooks';
import IosModalNew from '@src/components/Common/IosModalNew';
import { useState, useRef } from 'react';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// import { getCookie } from '../../../utils/cookie';

interface TeacherDataInterface {
  teacherId: number;
  manageGrade: number;
  email: string;
  password: string;
  profile?: string;
}

const TeacherMyInfo = () => {
  const memberStore = useAppSelector((state) => state.member);
  const [email, setEmail] = useState(memberStore.email);
  const [manageGrade, setManageGrade] = useState(memberStore.manageGrade);
  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordConfirm] = useState('');
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [isUse, setUse] = useState(false);
  const [preview, setPreview] = useState<any>(memberStore.profileFullPath);
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isPreviewReset, setIsPreviewReset] = useState(false); // 리셋했는지 여부 판단용 상태값
  const newImageFile = useRef<HTMLInputElement>(null); // 새로운 사진 보관용

  // const accessToken = getCookie('jwt-accessToken');
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

  // 이미지 프리뷰 업로드 함수
  const onChangeFiles = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file = reader.result;
      if (file) {
        setPreview(file);
        setIsPreviewReset(false);
      }
    };
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onDeleteFiles = (e) => {
    setIsPreviewReset(true);
    setPreview('https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null');
  };

  const emailCheck = async () => {
    //유효성검사
    if (email === null) {
      console.log('email null~~');
      setUse(false);
    } else if (email === memberStore.email) {
      console.log('email 같음!');
      setUse(true);
    } else {
      console.log(email);
      console.log(memberStore.email);
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
    if (email === null) {
      alert('이메일을 확인해주세요.');
    } else if (manageGrade === null) {
      alert('담당학년을 입력해주세요.');
    } else if (!(password === passwordconfirm)) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    } else {
      const frm = new FormData();
      let teacher: TeacherDataInterface;
      if (!isPreviewReset && password) {
        teacher = {
          teacherId: memberStore.userId,
          manageGrade: manageGrade,
          email: email,
          password: password,
        };
      } else {
        teacher = {
          teacherId: memberStore.userId,
          manageGrade: manageGrade,
          email: email,
          password: password,
          profile: 'reset',
        };
      }
      const teacherString = JSON.stringify(teacher);
      frm.append(
        'teacher',
        new Blob([teacherString], { type: 'application/json' }),
      );

      if (
        !isPreviewReset &&
        newImageFile.current &&
        newImageFile.current.files
      ) {
        console.log('파일넣음');
        frm.append('file', newImageFile.current.files[0]);
        // else frm.append('file', null);
        // 만약 file이 빈거 (기본사진으로 초기화)라면? 어떻게 처리할 것인지에 대해서 잘 몰라서 우선 주석처리
      }

      InterceptedAxios.post('/teachers/modify', frm, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
        .then(function (response) {
          alert('정보가 수정되었습니다.');
          location.href = '/student/mypage';
        })
        .catch(function (error) {
          console.log(error);
          alert('정보 수정에 실패하였습니다.');
        });
    }
  };

  return (
    <div css={ModalCSS(isMouseOn)}>
      <div className="commonModal">
        <IosModalNew />
      </div>
      <div className="infoContainer">
        <div className="profileContainer">
          {preview ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ||
          preview ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' ? (
            <img
              src={ProfilImage}
              alt="프로필사진"
              className="profile-logo"
              onMouseEnter={() => setIsMouseOn(true)}
              onMouseLeave={() => setIsMouseOn(false)}
            />
          ) : (
            <img
              src={preview}
              alt="프로필사진"
              className="profile-logo"
              onMouseEnter={() => setIsMouseOn(true)}
              onMouseLeave={() => setIsMouseOn(false)}
            />
          )}
          {isMouseOn ? (
            <div
              className="profile-img-button"
              onMouseEnter={() => setIsMouseOn(true)}
            >
              <div className="editbtn">
                <label htmlFor="profile-image">
                  <EditIcon className="edit-icon-btn" />
                </label>
                <input
                  ref={newImageFile}
                  type="file"
                  id="profile-image"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={onChangeFiles}
                />
              </div>
              <DeleteIcon className="delete-icon-btn" onClick={onDeleteFiles} />
            </div>
          ) : null}
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
              value={manageGrade}
              type="text"
              onChange={onChangeManageGrade}
            />
          </div>
          <div className="fieldContainer">
            <span>이메일</span>
            <input
              id="email"
              type="text"
              value={email}
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

const ModalCSS = (isMouseOn) => css`
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
    position: relative;
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    border-radius: 200px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  .profileContainer .profile-logo {
    position: absolute;
    border-radius: 200px;
    width: 200px;
    height: 200px;
    filter: ${isMouseOn ? 'brightness(70%); ' : ''};
  }

  .profileContainer .profile-img-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;
  }

  .profileContainer .profile-img-button .editbtn {
    height: 30px;
    width: 30px;
    margin: 1rem;
  }

  .profileContainer .profile-img-button .editbtn .edit-icon-btn {
    width: 30px;
    height: 30px;
    color: white;
    cursor: pointer;
  }

  .profileContainer .profile-img-button .editbtn input {
    display: none;
  }

  .profileContainer .profile-img-button .delete-icon-btn {
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: red;
    margin: 1rem;
  }

  .profileContainer .infoListContainer {
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
    margin: 1rem;
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
