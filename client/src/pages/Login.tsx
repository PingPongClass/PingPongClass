/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { setCookie } from '@src/utils/cookie';
import { useState } from 'react';

const App = () => {
  const [id, setId] = useState(0);
  const [password, setPassword] = useState('');
  const [accessToken, setToken] = useState('');
  const InterceptedAxios = setupInterceptorsTo(axios.create());

  const login = async () => {
    const result = await InterceptedAxios.post('/auth/login', {
      id: id,
      password: password,
    });
    return result;
  };

  const go = async () => {
    const result = await login();
    console.log(result);
    setToken(result.data.accessToken);
    let refreshToken = result.data.refreshToken;
    // localStorage 저장
    // sessionStorage.setItem('jwt-accessToken', accessToken);
    if (result.data) {
      setCookie('jwt-accessToken', result.data.accessToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
      setCookie('jwt-refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
    }
  };

  return (
    <div className="App" css={totalContainer}>
      <div>
        <p>ID: </p>
        <input onChange={(e) => setId(+e.target.value)} type="number" />
      </div>
      <div>
        <p>PASSWORD: </p>
        <input onChange={(e) => setPassword(e.target.value)} type="text" />
      </div>
      <button onClick={go}>로그인</button>
    </div>
  );
};

const totalContainer = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export default App;
