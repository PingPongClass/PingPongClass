import { css } from '@emotion/react';
import IosModal from '../../Common/IosModal';
// import Modal from '../components/Common/Modal';
import { useAppSelector } from '@src/store/hooks';
import { Link } from 'react-router-dom';

const InputPassword = () => {
  const memberStore = useAppSelector((state) => state.member);
  return (
    <IosModal renderCenter={true} isRelative={true} width="60%" height="60%">
      <div css={ModalCSS}>
        <form>
          <div>
            <span>비밀번호</span>
            <input type="password" placeholder=" 비밀번호를 입력하세요." />
          </div>
          <br />
          <br />
          {memberStore.userId.length == 10 ? (
            <Link to="/student/studentmyinfo">
              <button>입력</button>
            </Link>
          ) : (
            <Link to="/teacher/teachermyinfo">
              <button>입력</button>
            </Link>
          )}
        </form>
      </div>
    </IosModal>
  );
};

const ModalCSS = css`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  span {
    margin-right: 3rem;
    font-weight: 700;
    font-size: calc(0.6rem + 1vw);
  }

  input {
    width: 25vw;
    height: 5vh;
    background-color: #f9f7e9;
    border: 0;
    font-size: calc(0.5rem + 1vw);
  }

  input::placeholder {
    font-family: 'NanumSquareRound';
  }

  button {
    width: 15vw;
    height: 5vh;
    text-align: center;
    background-color: #f6ac55;
    color: white;
    border: 0;
    border-radius: 6px;
    margin-left: 8.5rem;
    font-size: calc(0.5rem + 1vw);
    font-family: 'NanumSquareRound';
  }
`;

export default InputPassword;
