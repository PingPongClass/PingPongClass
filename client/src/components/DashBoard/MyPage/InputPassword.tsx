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
  const onClickInputPWD = (e) => {
    if (password == null) {
      alert('비밀번호를 입력해주세요.');
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

  return (
    <div css={ModalCSS}>
      <div className="commonModal">
        <div className="passwordContainer">
          <p>비밀번호:</p>
          <input
            type="password"
            onChange={(e) => onChangePassword(e)}
            placeholder="비밀번호를 입력하세요."
          />
        </div>
        <button onClick={onClickInputPWD}>입력</button>
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

  .passwordContainer input {
    width: 70%;
    height: 50px;
    margin-left: 20px;
    padding: 0px 10px;
    font-size: 20px;
    background-color: #f9f7e9;
    border: solid 1px #d7d7d7;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .commonModal button {
    text-align: center;
    background-color: #f6ac55;
    color: white;
    border: 0;
    padding: 10px 20px;
    border-radius: 20px;
    font-family: 'NanumSquareRound';
    font-size: 20px;
    box-shadow: 2px 2px 10px -5px;
    cursor: pointer;
  }

  input::placeholder {
    font-family: 'NanumSquareRound';
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
