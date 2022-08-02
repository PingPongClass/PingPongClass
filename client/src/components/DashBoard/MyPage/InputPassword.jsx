/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import IosModal from '../../Common/IosModal';
// import Modal from '../components/Common/Modal';

const InputPassword = () => (
  <IosModal renderCenter={true} isRelative={true} width="60%" height="60%">
    <div css={ModalCSS}>
      <form>
        <div>
          <span>비밀번호</span>
          <input type="password" placeholder=" 비밀번호를 입력하세요." />
        </div>
        <br />
        <br />
        <button type="submit">입력</button>
      </form>
    </div>
  </IosModal>
);

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
  }
`;

export default InputPassword;
