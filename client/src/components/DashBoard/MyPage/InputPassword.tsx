import { css } from '@emotion/react';
import IosModalNew from '@src/components/Common/IosModalNew';
import { useAppSelector } from '@src/store/hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';

const InputPassword = () => {
  const memberStore = useAppSelector((state) => state.member);
  const [password, setPassword] = useState('');
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const navigate = useNavigate();
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickInputPWD = () => {
    if (password == null) {
      alert('비밀번호 입력');
    } else {
      InterceptedAxios.post('/users/myinfo', {
        password: password,
      })
        .then(function (response) {
          if (memberStore.userId >= 2022000000) {
            navigate('/student/studentmyinfo');
          } else {
            navigate('/teacher/teachermyinfo');
          }
        })
        .catch(function (error) {
          alert('비밀번호를 다시 확인해주세요.');
          console.log('실패', error);
        });
    }
  };
  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      onClickInputPWD();
    }
  };

  return (
    <div css={ModalCSS}>
      <div className="commonModal">
        <p
          css={css`
            font-size: 2.1em;
            font-weight: bold;
            margin-bottom: 70px;
          `}
        >
          비밀번호 인증
        </p>
        <div className="passwordContainer">
          <input
            type="password"
            onChange={(e) => onChangePassword(e)}
            placeholder="비밀번호를 입력해주세요."
            onKeyPress={onKeyPress}
            className="input-yellow"
            css={css`
              margin-right: 10px;
              width: 70%;
            `}
          />

          <button className="button-sm yellow" onClick={onClickInputPWD}>
            확인
          </button>
        </div>
      </div>
      <div className="modalSize">
        <IosModalNew />
      </div>
    </div>
  );
};

const ModalCSS = css`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: 0.5s ease-in-out loadEffect1;

  .commonModal {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 999;
  }

  .passwordContainer {
    font-size: 30px;
    width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .passwordContainer p {
    display: inline-block;
  }

  .modalSize {
    width: 70%;
    height: 500px;
  }

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default InputPassword;
