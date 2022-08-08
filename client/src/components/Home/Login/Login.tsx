/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useState } from 'react';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';
import { setCookie } from '@utils/cookie';
import { setRefreshToken } from '../../../storage/Cookie';
import { SET_TOKEN } from '../../../store/Auth';
import { saveMember, logIn, logOut } from '@src/store/member';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';

import { ToastContainer, toast } from 'react-toastify';

interface LoginProps {
  tap: string;
  setTap: Function;
  userId: string;
  setUserId: Function;
}

const Login = (props: LoginProps) => {
  const { setTap, userId, setUserId } = props;
  const [userPw, setUserPw] = useState('');
  const [accessToken, setToken] = useState('');
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [toastMsg, setToast] = useState('');

  const dispatch = useAppDispatch();

  const notify = () =>
    toast.success(toastMsg, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  if (toastMsg) {
    notify();
    setToast('');
  }

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePw = (e) => {
    setUserPw(e.target.value);
  };

  const onClickFind = () => {
    setTap('passwordFind');
  };

  const onClickReturn = () => {
    setTap('main');
  };

  const onClickLogin = () => {
    //유효성 검사

    InterceptedAxios.post('/auth/login', {
      id: userId,
      password: userPw,
    })
      .then((response) => {
        //성공
        console.log(response);
        const expires = new Date();
        expires.setMinutes(+expires.getMinutes + 60);
        setToken(response.data.accessToken);
        // localStorage 저장
        if (response.data) {
          setCookie('jwt-accessToken', response.data.accessToken, {
            path: '/',
            // secure: true,
            expires,
            sameSite: 'Lax',
          });
          setCookie('jwt-refreshToken', JSON.stringify(response.data), {
            path: '/',
            // secure: true,
            sameSite: 'Lax',
          });
        }
        //첫 로그인이면,
        if (response.data.first) {
          // setToast('로그인 성공. 첫 로그인시, 정보입력이 필요합니다.');
          notify();
          alert('로그인 성공. 첫 로그인시, 정보입력이 필요합니다.');
          setTap('email');
        } else {
          if (userId.length == 10) {
            alert('로그인 성공');
            location.href = '/student';
          }
          if (userId.length == 7 && userId.charAt(0) === '4') {
            alert('로그인 성공');
            location.href = '/teacher';
          }
          if (userId.length == 7 && userId.charAt(0) === '5') {
            alert('로그인 성공');
            location.href = '/admin';
          }
        }
        dispatch(saveMember(parseInt(props.userId)));
        console.log('로그인 성공', response);
      })
      .catch(function (error) {
        alert('아이디와 비밀번호를 다시 확인해주세요.');
        console.log('로그인 실패', error);
      });
  };

  return (
    <div css={totalContainer}>
      <ToastContainer />
      <div className="div-title">
        <h2 className="title">로그인</h2>
      </div>
      <div className="div-total">
        <div className="div-main">
          <div className="div-sub">
            <div className="title-sub">아이디</div>
            <input
              onChange={(e) => onChangeId(e)}
              value={userId}
              className="input"
            />
          </div>
          <div className="div-sub">
            <div className="title-sub">비밀번호</div>
            <input
              onChange={(e) => onChangePw(e)}
              type="password"
              value={userPw}
              className="input"
              css={css`
                font-family: 'Courier New', Courier, monospace;
              `}
            />
          </div>
        </div>
        <div
          className="text-small hover"
          onClick={onClickFind}
          css={css`
            cursor: pointer;
          `}
        >
          비밀번호 찾기
        </div>
      </div>
      <div className="buttons-div">
        <button className="button gray" onClick={onClickReturn}>
          이전
        </button>
        <button className="button pink" onClick={onClickLogin}>
          로그인
        </button>
        {/* <button onClick={test}>뭐가 적혀있지?</button> */}
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

  .div-title {
    height: 9vh;
  }
  .div-total {
    height: 24vh;
    margin-bottom: 13px;
  }

  button:first-of-type {
    margin-right: 1rem;
  }
`;

export default Login;
