import { css } from '@emotion/react';
import axios from 'axios';
import { useState } from 'react';

interface EmailProps {
  setTap: Function;
}

const Email = (props: EmailProps) => {
  const { setTap } = props;

  const onClickReturn = () => {
    setTap('main');
  };

  const onClickNext = () => {
    setTap('passwordSetting');
  };

  return (
    <div css={totalContainer}>
      <div className="text-div">
        <h2 className="title">이메일 설정</h2>
      </div>
      <div className="div-total">
        <div className="div-main">
          <div className="div-sub">
            <div className="title-sub">이메일</div>
            <input className="input input-email" />
            <div
              className="title-sub"
              css={css`
                width: 0px;
              `}
            >
              @
            </div>
            <select className="select">
              <option value="1">직접입력</option>
              <option value="naver.com" selected>
                naver.com
              </option>
              <option value="nate.com">nate.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="hotmail.com">hotmail.com</option>
              <option value="gmail.com">gmail.com</option>
            </select>
          </div>
        </div>
      </div>
      <div className="buttons-div">
        <button className="button gray" onClick={onClickReturn}>
          이전
        </button>
        <button className="button pink">다음</button>
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
  padding-right: 5rem;

  .text-div {
    padding: 10px 20px;
  }

  .input-email {
    width: 150px;
  }
  .div-main {
    margin: 70px 0px;
  }

  .buttons-div {
    margin: 1rem 0;
    text-align: right;

    button:first-child {
      margin-right: 1rem;
    }
  }
`;

export default Email;
