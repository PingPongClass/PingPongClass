/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useState } from 'react';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';

interface PasswordFindProps {
  setTap: Function;
}

const PasswordFind = (props: PasswordFindProps) => {
  const { setTap } = props;
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const InterceptedAxios = setupInterceptorsTo(axios.create());

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };

  const onChangeEmail1 = (e) => {
    setEmail1(e.target.value);
  };
  const onChangeEmail2 = (e) => {
    setEmail2(e.target.value);
  };

  const onClickLogin = (e) => {
    setTap('login');
  };

  const onClickFind = (e) => {
    setEmail(email1 + '@' + email2);
    if (email1 == null) {
      alert('이메일을 입력해주세요.');
    } else {
      InterceptedAxios.post('/users/password', {
        user_id: userId,
        email: userEmail,
      })
        .then(function (response) {
          alert('이메일을 확인해주세요.');
        })
        .catch(function (error) {
          alert('존재하지 않는 회원정보입니다.');
          console.log('실패', error);
        });
    }
  };

  return (
    <div css={totalContainer}>
      <div className="div-title">
        <h2 className="title">비밀번호 찾기</h2>
      </div>
      <div className="div-total">
        <div className="div-main">
          <div className="div-sub">
            <div
              className="title-sub"
              css={css`
                width: 71px;
              `}
            >
              아이디
            </div>
            <input
              onChange={(e) => onChangeId(e)}
              value={userId}
              className="input"
              css={css`
                width: 378px;
              `}
            />
          </div>
          <div className="div-sub">
            <div
              className="title-sub"
              css={css`
                width: 70px;
              `}
            >
              이메일
            </div>
            <input
              className="input input-email"
              onChange={(e) => onChangeEmail1(e)}
              value={email1}
              css={css`
                width: 142px;
              `}
            />
            <div
              className="title-sub"
              css={css`
                width: 0px;
              `}
            >
              @
            </div>
            <select
              className="select"
              onChange={(e) => onChangeEmail2(e)}
              value={email2}
              id="Email2"
            >
              <option selected disabled>
                선택
              </option>
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
        <button className="button gray" onClick={onClickLogin}>
          로그인하러 가기
        </button>
        <button className="button pink" onClick={onClickFind}>
          찾기
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

  .div-title {
    height: 9vh;
  }
  .div-total {
    height: 24vh;
    margin-bottom: 13px;
  }

  .input-email {
    width: 150px;
  }

  button:first-of-type {
    margin-right: 1rem;
  }
`;

export default PasswordFind;
