import { css } from '@emotion/react';
import IosModalNew from '@src/components/Common/IosModalNewAdmin';
import ProfilImage from '@assets/images/profile.png';
import React, { useState, useRef, useEffect } from 'react';
import InterceptedAxios from '@utils/iAxios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TeacherProps } from './TeacherBoard';
import { useNavigate } from 'react-router-dom';

interface ModalDefaultType {
  onClickOpenModal: () => void;
  teacherId: number;
}

const EditTeacher = ({ onClickOpenModal, teacherId }: ModalDefaultType) => {
  const [teacher, setTeacher] = useState<TeacherProps>();
  const [email, setEmail] = useState('');
  const [manageGrade, setManageGrade] = useState(0 as number);
  const [password, setPassword] = useState('');
  const [birth, setBirth] = useState('');
  const [passwordconfirm, setPasswordConfirm] = useState('');
  const [isUse, setUse] = useState(true);
  const [preview, setPreview] = useState<any>(
    'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null',
  );
  const navigate = useNavigate();

  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isPreviewReset, setIsPreviewReset] = useState(false); // 리셋했는지 여부 판단용 상태값
  const newImageFile = useRef<HTMLInputElement>(null); // 새로운 사진 보관용

  const getInfo = () => {
    if (teacherId !== undefined && teacherId !== 0) {
      InterceptedAxios.get('/teachers/' + teacherId).then((res) => {
        setTeacher(res.data);
        setPreview(
          res.data?.profile
            ? 'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' +
                res.data?.profile
            : 'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null',
        );
      });
    }
  };
  useEffect(() => {
    getInfo();
  }, [teacherId]);

  useEffect(() => {
    setPreview(teacher?.profileFullPath);
  }, [teacher]);

  const nameChanged = (e) => {
    let newTeacher: TeacherProps = { ...teacher, name: e.target.value };
    setTeacher(newTeacher);
  };

  const onChangeManageGrade = (e) => {
    setManageGrade(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const birthChanged = (e) => {
    setBirth(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== teacher?.email) {
      var re =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (!re.test(e.target.value)) setUse(false);
      else {
        InterceptedAxios.get(`/users/email/${e.target.value}`)
          .then(function () {
            setEmail(e.target.value);
            setUse(true);
          })
          .catch(function (error) {
            setUse(false);
          });
      }
    } else {
      setEmail(e.target.value);
    }
  };

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onChangeFiles = (e) => {
    if (e.target.files[0] > 10 * 1024 * 1024) {
      e.target.value = '';
      alert('업로드 가능한 최대 용량은 10MB입니다. ');
      return;
    }
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

  const onEnroll = (e) => {
    if (email === null) {
      alert('이메일을 확인해주세요.');
    } else if (!(password === passwordconfirm)) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    } else if (!isUse) {
      alert('사용할 수 없는 이메일입니다. 다시 확인해주세요.');
    } else {
      setTeacher({
        teacherId: teacher?.teacherId || 0,
        name: teacher?.name || '',
        email: email,
        password: password,
        manageGrade: manageGrade || 0,
        profile: teacher?.profile || 'null',
        birth: birth || '',
      });
    }

    InterceptedAxios.post('/teachers/', teacher)
      .then(function (response) {
        alert('회원 추가에 성공했습니다.');
        // location.href = '/admin/teachers';
        navigate('/admin/teachers');
      })
      .catch(function (error) {
        console.log(error);
        alert('회원추가에 실패하였습니다.');
      });
  };

  const deleteTeacher = (e) => {
    alert('현재 봉인된 기능입니다.');
    // InterceptedAxios.delete('/teachers/' + teacherId)
    //   .then(function (response) {
    //     alert('회원 삭제에 성공했습니다.');
    //     location.href = '/admin/teachers';
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert('회원 삭제에 실패하였습니다.');
    //   });
  };

  const onEditMyInfo = (e) => {
    if (email === null) {
      alert('이메일을 확인해주세요.');
    } else if (!(password === passwordconfirm)) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    } else if (!isUse) {
      alert('사용할 수 없는 이메일입니다. 다시 확인해주세요.');
    } else {
      const frm = new FormData();
      let teacherData: TeacherProps;
      if (!isPreviewReset) {
        teacherData = {
          teacherId: teacher?.teacherId || 0,
          email: email,
          password: password,
          manageGrade: manageGrade || 0,
        };
      } else {
        teacherData = {
          teacherId: teacher?.teacherId || 0,
          email: email,
          password: password,
          manageGrade: manageGrade || 0,
          profile: 'reset',
        };
      }
      const teacherString = JSON.stringify(teacherData);
      frm.append(
        'teacher',
        new Blob([teacherString], { type: 'application/json' }),
      );

      if (
        !isPreviewReset &&
        newImageFile.current &&
        newImageFile.current.files
      ) {
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
          navigate('/admin/teachers');
          // location.href = '/admin/teachers';
        })
        .catch(function (error) {
          console.error(error);
          alert('정보 수정에 실패하였습니다.');
        });
    }
  };
  return (
    <div css={ModalCSS(isMouseOn)}>
      <div className="commonModal">
        <IosModalNew onClickOpenModal={onClickOpenModal} />
      </div>
      <div className="infoContainer">
        <div className="profileContainer">
          {preview ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ||
          preview ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' ||
          teacherId === 0 ? (
            <img
              src={ProfilImage}
              alt="기본프로필사진"
              className="profile-logo"
              onMouseEnter={() => setIsMouseOn(true)}
              onMouseLeave={() => setIsMouseOn(false)}
            />
          ) : (
            <img
              src={preview}
              alt="지정된프로필사진"
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
          ) : (
            <div
              className="profile-img-button hidden"
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
          )}
        </div>

        <div className="infoListContainer">
          <div className="fieldContainer">
            <span>이름</span>
            <input
              id="name"
              value={teacher?.name || ''}
              onChange={nameChanged}
              placeholder=" 이름을 입력하세요."
              readOnly={teacher?.teacherId !== undefined}
            />
          </div>
          <div className="fieldContainer">
            <span>생년월일</span>
            <input
              id="birth"
              value={teacher?.birth || ''}
              onChange={birthChanged}
              placeholder="생년월일 ex)20220101"
              readOnly={teacher?.teacherId !== undefined}
            />
          </div>
          <div className="fieldContainer">
            <span>담당학년</span>
            <input
              id="managegrade"
              type="text"
              defaultValue={teacher?.manageGrade || ''}
              onChange={(e) => onChangeManageGrade(e)}
              placeholder=" 담당학년을 입력하세요."
            />
          </div>
          <div className="fieldContainer">
            <span>이메일</span>
            <input
              id="email"
              type="email"
              defaultValue={teacher?.email || ''}
              onChange={(e) => onChangeEmail(e)}
              placeholder=" 이메일을 입력하세요."
            />
          </div>
          <div className="fieldContainer">
            <span>비밀번호</span>
            <input
              id="password"
              type="password"
              onChange={(e) => onChangePassword(e)}
              placeholder=" 8자리 이상 16자리 이하, 영문자, 숫자 포함."
            />
          </div>
          <div className="fieldContainer">
            <span>비밀번호 확인</span>
            <input
              id="passwordConfirm"
              type="password"
              onChange={(e) => onChangePasswordConfirm(e)}
              placeholder=" 비밀번호를 입력하세요."
            />
          </div>
        </div>
      </div>
      <div className="buttonsContainer">
        {teacherId ? (
          <>
            <button type="button" className="submit" onClick={onEditMyInfo}>
              수정
            </button>
            <button type="button" className="delete" onClick={deleteTeacher}>
              삭제
            </button>
          </>
        ) : (
          <button type="button" className="submit" onClick={onEnroll}>
            추가
          </button>
        )}
        <button type="button" className="cancel" onClick={onClickOpenModal}>
          취소
        </button>
      </div>
    </div>
  );
};

const ModalCSS = (isMouseOn) => css`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.409);
  z-index: 9999;

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

  .profile-img-button.hidden {
    display: none;
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

  .delete {
    background-color: var(--pink);
  }

  .submit {
    background-color: var(--blue);
  }

  .cancel {
    background-color: var(--gray);
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

  .fieldContainer input,
  .fieldContainer option {
    width: 270px;
    height: 30px;
    background-color: #dddddd;
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

  .teacherContainer {
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
    background-color: #dddddd;
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
    height: 60%;
  }
`;

export default EditTeacher;
