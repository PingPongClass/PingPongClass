/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from '@src/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import { getCookieToken, removeCookieToken } from '../../storage/Cookie';
import { DELETE_TOKEN } from '../../store/Auth';

https: interface MyPageModalStyle {
  close: any;
  setToggle: Function;
}

const MyPageModal = ({ close, setToggle }: MyPageModalStyle) => {
  // const { accessToken } = useSelector((state: any) => state.token);
  // const dispatch = useDispatch();
  // const refreshToken = getCookieToken();

  const onClickLogout = () => {
    // // store에 저장된 Access Token 정보를 받아 온다
    // const { accessToken } = useSelector((state) => state.token);

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // // Cookie에 저장된 Refresh Token 정보를 받아 온다
    // const refreshToken = getCookieToken();

    // async function logout() {
    //   // 백으로부터 받은 응답
    //   const data = await logoutUser(
    //     { refresh_token: refreshToken },
    //     accessToken,
    //   );

    //   if (data.status) {
    //     // store에 저장된 Access Token 정보를 삭제
    //     dispatch(DELETE_TOKEN());ㅞㅡ ㄴㅅㅁㄱ
    //     // Cookie에 저장된 Refresh Token 정보를 삭제
    //     removeCookieToken();
    //     return navigate('/');
    //   } else {
    //     window.location.reload();
    //   }
    // }

    // // 해당 컴포넌트가 요청된 후 한 번만 실행되면 되기 때문에 useEffect 훅을 사용
    // useEffect(() => {
    //   logout();
    // }, []);
    const cookies = new Cookies();

    alert('로그아웃 하시겠습니까?');
    cookies.remove('jwt-refreshToken');
    location.href = '/';
    setToggle('');
  };

  const onClickMyPage = () => {
    location.href = '/teacher/mypage';
    setToggle('');
  };

  return (
    <div css={totalContainer}>
      <div className="settingContainer">
        <div className="myPageModal">
          <div className="myPageNav">
            <CloseIcon
              fontSize={'large'}
              onClick={close}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <h3 onClick={onClickLogout}>로그아웃</h3>

          <Link to="mypage" className="linkButton">
            <h3 onClick={() => close()}>마이페이지</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 999;

  .myPageNav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
  }

  .settingContainer {
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 1250px;
  }

  .myPageModal {
    width: 220px;
    height: 220px;
    padding: 20px;
    margin-top: 120px;
    background-color: rgba(249, 249, 249);
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-shadow: 2px 2px 10px -5px;
    animation: fadeIns 0.4s;
  }

  .myPageModal h3 {
    cursor: pointer;
  }

  .linkButton {
    text-decoration: none;
    color: black;
  }

  @keyframes fadeIns {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default MyPageModal;
