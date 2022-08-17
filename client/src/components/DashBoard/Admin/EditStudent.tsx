import { css } from '@emotion/react';
import IosModalNew from '@src/components/Common/IosModalNewAdmin';
import ProfilImage from '@assets/images/profile.png';
import React, { useState, useRef, useEffect } from 'react';
import InterceptedAxios from '@utils/iAxios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface ModalDefaultType {
  onClickOpenModal: () => void;
  studentId: number;
}

const EditStudent = ({ onClickOpenModal, studentId }: ModalDefaultType) => {
  const [student, setStudent] = useState<StudentProps>();
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState(0);
  const [classNum, setClassNum] = useState(0);
  const [studentNum, setStudentNum] = useState(0);
  const [introduce, setIntroduce] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordConfirm] = useState('');
  const [isUse, setUse] = useState(true);
  const [preview, setPreview] = useState<any>(
    'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null',
  );
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isPreviewReset, setIsPreviewReset] = useState(false); // 리셋했는지 여부 판단용 상태값
  const newImageFile = useRef<HTMLInputElement>(null); // 새로운 사진 보관용

  interface StudentProps {
    studentId?: number;
    email?: string;
    profileFullPath?: string;
    profile?: string;
    password?: string;
    name?: string;
    grade?: number;
    classNum?: number;
    studentNum?: number;
    introduce?: string;
  }

  const getInfo = () => {
    if (studentId !== undefined && studentId !== 0) {
      InterceptedAxios.get('/students/' + studentId).then((res) => {
        setStudent(res.data);
      });
    }
  };

  useEffect(() => {
    getInfo();
  }, [studentId]);

  const nameChanged = (e) => {
    let newStudent: StudentProps = { ...student, name: e.target.value };
    setStudent(newStudent);
  };

  const gradeChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(parseInt(e.target.value));
  };

  const classNumChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassNum(parseInt(e.target.value));
  };

  const studentNumChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentNum(parseInt(e.target.value));
  };

  const introduceChanged = (e) => {
    setIntroduce(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== student?.email) {
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
      setStudent({
        studentId: student?.studentId || 0,
        email: email,
        password: password,
        grade: grade || 0,
        classNum: classNum || 0,
        studentNum: studentNum || 0,
      });
    }

    InterceptedAxios.post('/students/', student)
      .then(function (response) {
        alert('회원 추가에 성공했습니다.');
        location.href = '/admin/students';
      })
      .catch(function (error) {
        console.log(error);
        alert('회원추가에 실패하였습니다.');
      });
  };

  const deleteStudent = (e) => {
    alert('현재 봉인된 기능입니다.');
    // InterceptedAxios.delete('/students/' + studentId)
    //   .then(function (response) {
    //     alert('회원 삭제에 성공했습니다.');
    //     location.href = '/admin/students';
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
      let studentData: StudentProps;
      if (!isPreviewReset) {
        studentData = {
          studentId: student?.studentId || 0,
          email: email,
          password: password,
          grade: grade || 0,
          classNum: classNum || 0,
          studentNum: studentNum || 0,
          introduce: introduce || '',
        };
      } else {
        studentData = {
          studentId: student?.studentId || 0,
          email: email,
          password: password,
          grade: grade || 0,
          classNum: classNum || 0,
          studentNum: studentNum || 0,
          introduce: introduce || '',
          profile: 'reset',
        };
      }
      const teacherString = JSON.stringify(studentData);
      frm.append(
        'student',
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

      InterceptedAxios.post('/students/modify', frm, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
        .then(function (response) {
          alert('정보가 수정되었습니다.');
          location.href = '/admin/students';
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
        <IosModalNew onClickOpenModal={onClickOpenModal} />
      </div>
      <div className="infoContainer">
        <div className="profileContainer">
          {preview ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ||
          preview ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' ||
          studentId === 0 ? (
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
          ) : null}
        </div>

        <div className="infoListContainer">
          <div className="fieldContainer">
            <span>이름</span>
            <input
              id="name"
              value={student?.name || ''}
              onChange={nameChanged}
              placeholder=" 이름을 입력하세요."
              readOnly={student?.studentId !== undefined}
            />
          </div>
          <div className="fieldContainer">
            <span id="infoname">학생정보</span>
            <div className="studentContainer">
              <div className="stuinfoContainer">
                <input
                  id="grade"
                  type="text"
                  defaultValue={student?.grade || ''}
                  onChange={gradeChanged}
                />
                <p id="gradespan">학년</p>
              </div>
              <div className="stuinfoContainer">
                <input
                  id="groupNum"
                  type="text"
                  defaultValue={student?.classNum || ''}
                  onChange={classNumChanged}
                />
                <p id="groupNumspan">반</p>
              </div>
              <div className="stuinfoContainer">
                <input
                  id="studentNum"
                  type="text"
                  defaultValue={student?.studentNum || ''}
                  onChange={studentNumChanged}
                />
                <p id="studentNumspan">번</p>
              </div>
            </div>
          </div>
          {student?.studentId !== undefined ? (
            <div className="fieldContainer">
              <span>아이디</span>
              <input id="id" type="text" value={studentId} readOnly />
            </div>
          ) : (
            <></>
          )}
          <div className="fieldContainer">
            <span>이메일</span>
            <input
              id="email"
              type="email"
              defaultValue={student?.email || ''}
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
          <div className="fieldContainer">
            <span>자기소개</span>
            <input
              id="introduceConfirm"
              type="text"
              onChange={(e) => introduceChanged(e)}
              placeholder=" 자기소개를 입력하세요."
            />
          </div>
        </div>
      </div>
      <div className="buttonsContainer">
        {studentId ? (
          <>
            <button type="button" className="submit" onClick={onEditMyInfo}>
              수정
            </button>
            <button type="button" className="delete" onClick={deleteStudent}>
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
    width: 90%;
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
    background-color: #dddddd;
    border: solid 1px #d7d7d7;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: 'NanumSquareRound';
    font-size: 13pt;
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

export default EditStudent;
