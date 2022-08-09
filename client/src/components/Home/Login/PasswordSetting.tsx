/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';
import { useNavigate } from 'react-router-dom';
interface PasswordProps {
  setTap: Function;
  email: String;
  userId: String;
}
const navigate = useNavigate();
const PasswordSetting = (props: PasswordProps) => {
  const { setTap, email, userId } = props;
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [emailCheckMsg, setMsg] = useState('');
  const [nextAvailable, setNextAvailable] = useState(false);
  const InterceptedAxios = setupInterceptorsTo(axios.create());

  const onClickReturn = () => {
    setTap('email');
  };

  useEffect(() => {
    // 리렌더링을 위한 함수
    if (password1 != '' && password1 == password2) {
      setMsg('비밀번호가 일치합니다.');
      setNextAvailable(true);
    } else {
      setMsg('비밀번호가 일치하지 않습니다.');
      setNextAvailable(false);
    }
  }, [password1, password2]);

  const onChangePassword1 = (e) => {
    setPassword1(e.target.value);
  };

  const onChangePassword2 = async (e) => {
    setPassword2(e.target.value);
  };

  const onClickSetting = (e) => {
    if (!nextAvailable) {
      alert('비밀번호를 확인해주세요.');
    } else {
      if (userId.length == 10) {
        //학생, 선생님 나눠서
        InterceptedAxios.patch('/students', {
          studentId: userId,
          email: email,
          password: password1,
        })
          .then(function (response) {
            navigate('/student');
          })
          .catch(function (error) {
            alert('회원수정 실패.');
            console.log('실패', error);
          });
      } else {
        InterceptedAxios.patch('/teachers', {
          teacherId: userId,
          email: email,
          password: password1,
        })
          .then(function (response) {
            alert('로그인 성공');
            navigate('/teacher');
          })
          .catch(function (error) {
            alert('회원수정 실패.');
            console.log('실패', error);
          });
      }
    }
  };

  return (
    <div css={totalContainer}>
      <div className="div-title">
        <h2 className="title">비밀번호 설정</h2>
      </div>
      <div className="div-total">
        <div
          className="div-main"
          css={css`
            padding-top: 26px;
          `}
        >
          <div className="div-sub">
            <div className="title-sub">비밀번호</div>
            <input
              onChange={(e) => onChangePassword1(e)}
              type="password"
              value={password1}
              className="input"
              css={css`
                font-family: 'Courier New', Courier, monospace;
              `}
            />
          </div>
          <div
            className="div-sub"
            css={css`
              margin-bottom: 3px;
            `}
          >
            <div
              className="title-sub"
              css={css`
                width: 150px;
              `}
            >
              비밀번호 확인
            </div>
            <input
              onChange={(e) => onChangePassword2(e)}
              type="password"
              value={password2}
              className="input"
              css={css`
                font-family: 'Courier New', Courier, monospace;
              `}
            />
          </div>
          <div className="text-small">{emailCheckMsg}</div>
        </div>
      </div>

      <div className="buttons-div">
        <button className="button gray" onClick={onClickReturn}>
          이전
        </button>
        <button className="button pink" onClick={onClickSetting}>
          설정
        </button>
      </div>
    </div>
  );
};

const totalContainer = css`
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 7rem;

  .title-sub {
    width: 130px;
  }

  .div-title {
    height: 9vh;
  }
  .div-total {
    height: 24vh;
  }

  .input-email {
    width: 150px;
  }

  button:first-of-type {
    margin-right: 1rem;
  }
`;

export default PasswordSetting;
