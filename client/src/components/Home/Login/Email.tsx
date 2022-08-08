/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';
import { useState } from 'react';

interface EmailProps {
  setTap: Function;
  setEmailConfirmed: Function;
}

function Email(props: EmailProps) {
  const { setTap } = props;
  const { setEmailConfirmed } = props;
  const [email, setEmail] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('naver.com');
  const [isUse, setUse] = useState(false);
  const InterceptedAxios = setupInterceptorsTo(axios.create());

  const onChangeEmail1 = (e) => {
    setEmail1(e.target.value);
    setEmail(e.target.value + '@' + email2);
  };
  const onChangeEmail2 = (e) => {
    setEmail2(e.target.value);
    setEmail(email1 + '@' + e.target.value);
  };

  const onClickReturn = () => {
    setTap('login');
  };

  //중복체크 클릭시,
  const emailCheck = async () => {
    const mergedEmail = email1 + '@' + email2;
    //유효성검사
    if (email1 == null) {
      alert('이메일을 입력해주세요.');
    } else {
      InterceptedAxios.get(`/users/email/${mergedEmail}`)
        .then(function () {
          console.log('이메일 중복안됨');
          setEmail(email1 + '@' + email2);
          setEmailConfirmed(email);
          setUse(true);
          alert('사용 가능한 이메일입니다.' + email);
        })
        .catch(function (error) {
          alert('중복된 이메일입니다. 다른 이메일을 입력해주세요.');
          setUse(false);
          console.log('중복됨 실패', error);
        });
    }
  };

  const onClickNext = () => {
    if (isUse) {
      //이메일 값 넘겨주기
      setEmailConfirmed(email);
      setTap('passwordSetting');
    } else {
      alert('이메일 중복체크를 해주세요.');
    }
  };

  return (
    <div css={totalContainer}>
      <div className="div-title">
        <h2 className="title">이메일 설정</h2>
      </div>
      <div className="div-total">
        <div className="div-main">
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
          <div>
            <button className="button blue" onClick={emailCheck}>
              중복체크
            </button>
          </div>
        </div>
      </div>

      <div className="buttons-div">
        <button
          className="button gray"
          onClick={onClickReturn}
          css={css`
            margin-right: 1rem;
          `}
        >
          이전
        </button>
        <button className="button pink" onClick={onClickNext}>
          다음
        </button>
      </div>
    </div>
  );
}

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

  .div-main {
    align-items: flex-end;
  }

  .div-sub {
    margin: 20px 0 20px;
  }

  .input-email {
    width: 130px;
  }
`;

export default Email;
