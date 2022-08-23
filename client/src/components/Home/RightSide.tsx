import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import InterceptedAxios from '@utils/iAxios';
import { setCookie } from '@utils/cookie';
import { saveMember, getClasses } from '@src/store/member';
import { useNavigate } from 'react-router-dom';

interface RightSideProps {
  setTap: Function;
}

function RightSide(props: RightSideProps) {
  const { setTap } = props;
  const [userId, setUserID] = useState(0);
  const [userPw, setUserPw] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //컴포넌트마운트/업데이트/컴포넌트마운트직후
  useEffect(() => {
    if (userPw !== '') {
      goRealLogin(status);
    }
  }, [userPw]);

  const onClickLogin = () => {
    setTap('login');
  };

  const goLogin = (params) => {
    setStatus(params);
    if (params === 'student') {
      setUserID(2022000017);
      setUserPw('ssafy2022000017');
      alert('테스트용 학생 로그인');
    } else if (params === 'teacher') {
      setUserID(4030004);
      setUserPw('ssafy4030004');
      alert('테스트용 선생님 로그인');
    } else {
      setUserID(5030001);
      setUserPw('ssafy5030001');
      alert('테스트용 관리자 로그인');
    }
  };

  function goRealLogin(params) {
    InterceptedAxios.post('/auth/login', {
      id: userId,
      password: userPw,
    })
      .then((response) => {
        //성공
        let expires = new Date();
        expires.setDate(expires.getDate() + 1);

        // localStorage 저장
        if (response.data) {
          setCookie('jwt-accessToken', response.data.accessToken, {
            path: '/',
            expires,
            sameSite: 'Lax',
          });
          expires = new Date();
          expires.setDate(expires.getDate() + 7);
          setCookie('jwt-refreshToken', response.data.refreshToken, {
            path: '/',
            // secure: true,
            expires,
            sameSite: 'Lax',
          });
        }

        if (params === 'student') {
          navigate('/student');
        } else if (params === 'teacher') {
          navigate('/teacher');
        } else {
          navigate('/admin');
        }

        dispatch(saveMember());
        dispatch(getClasses(userId));
      })
      .catch(function (error) {
        alert('로그인 에러.');
        console.log('로그인 실패', error);
      });
  }

  return (
    <div css={totalContainer}>
      <div className="title-div">
        <div className="title">인터렉티브 화상 교육</div>
        <div className="title-highlight">&nbsp;핑퐁클래스&nbsp;</div>
      </div>
      <div className="text text-div">
        핑퐁클래스는 20년간의 노하우가 담긴
        <br />
        선생님들과 학생분들의 각종 요청들을 받아서
        <br />
        모두가 꿈꾸는 온라인 교육 세상을
        <br />
        만들기 위해 제작했어요.
      </div>
      <div className="buttons-div">
        <button className="button blue" onClick={onClickLogin}>
          로그인
        </button>
        {/* <div
        // css={css`
        //   display: none;
        // `}
        >
          <button
            className="button-xsm gray"
            onClick={(e) => {
              goLogin('student');
            }}
          >
            학생(임시)
          </button>
          <button
            className="button-xsm gray"
            onClick={(e) => {
              goLogin('teacher');
            }}
          >
            선생님(임시)
          </button>
          <button
            className="button-xsm gray"
            onClick={(e) => {
              goLogin('admin');
            }}
          >
            관리자(임시)
          </button>
        </div> */}
      </div>
    </div>
  );
}

const totalContainer = css`
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  padding-right: 7rem;

  .title-div {
    height: 17vh;
    padding: 0 0 30px 0;
  }
  .button-xsm {
    padding: 7px 24px;
    font-size: 1em;
    font-weight: 400;
    margin-left: 10px;
    margin-top: 10px;
  }

  .text-div {
    height: 16vh;
  }

  .text-div {
    height: 12vh;
    padding-bottom: 43px;
  }
  .buttons-div {
    margin-top: 4px;
    text-align: right;
  }

  .text {
    color: #332757;
    text-align: right;
    font-size: calc(1.2vw);
  }

  .title-highlight,
  .title {
    font-weight: 800;
  }
`;

RightSide.propTypes = {
  setTap: PropTypes.func.isRequired,
};

export default RightSide;
