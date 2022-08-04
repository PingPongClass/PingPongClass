/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useState } from 'react';

const App = () => {
  const [id, setId] = useState(0);
  const [password, setPassword] = useState('');
  const [accessToken, setToken] = useState('');

  const login = async () => {
    const result = await axios.post('/auth/login', {
      id: id,
      password: password,
    });
    return result;
  };

  const go = async () => {
    const result = await login();
    console.log(result);
    setToken(result.data.accessToken);
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
