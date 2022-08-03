import { useState } from 'react';
// import axios from 'axios';

interface LoginProps {
  tap: string;
  setTap: Function;
}

const Login = (props: LoginProps) => {
  const { tap, setTap } = props;
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePw = (e) => {
    setUserPw(e.target.value);
  };

  const onClickReturn = () => {
    setTap('main');
  };

  const onClickEmail = async () => {
    setTap('email');
    // const res = await axios.post('http://localhost:8080/api/login', {
    //   id: +userId,
    //   password: userPw,
    // });

    /*
      {
        "accessToken": "string",
        "accessTokenExpiresIn": 0,
        "grantType": "string",
        "refreshToken": "string"
      }
    */

    // console.log(res);
  };

  const test = () => {
    console.log('유저아이디:', userId, '유저비밀번호', userPw);
  };

  return (
    <div>
      <div>
        <h2>{tap === 'studentLogin' ? 'STUDENT' : 'TEACHER'}</h2>
      </div>
      <div>
        <div>
          아이디 <input onChange={(e) => onChangeId(e)} value={userId} />
          비밀번호 <input onChange={(e) => onChangePw(e)} value={userPw} />
        </div>
        <div>비밀번호 찾기</div>
      </div>
      <div>
        <button onClick={onClickEmail}>로그인</button>
        <button onClick={onClickReturn}>돌아가기</button>
        <button onClick={test}>뭐가 적혀있지?</button>
      </div>
    </div>
  );
};

export default Login;
