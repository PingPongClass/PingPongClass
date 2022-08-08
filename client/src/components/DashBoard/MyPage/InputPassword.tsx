import { css } from '@emotion/react';
import IosModalNew from '@src/components/Common/IosModalNew';
import { useAppSelector } from '@src/store/hooks';
import { Link } from 'react-router-dom';

const InputPassword = () => {
  const memberStore = useAppSelector((state) => state.member);
  return (
    <div css={ModalCSS}>
      <div className="commonModal">
        <div className="passwordContainer">
          <p>비밀번호:</p>
          <input type="password" placeholder="비밀번호를 입력하세요." />
        </div>
        {memberStore.userId.length == 10 ? (
          <Link to="/student/studentmyinfo">
            <button>입력</button>
          </Link>
        ) : (
          <Link to="/teacher/teachermyinfo">
            <button>입력</button>
          </Link>
        )}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
`;

export default InputPassword;
