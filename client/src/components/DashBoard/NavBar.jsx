/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const NavBar = ({ changeContent }) => {
  const onClick = (toGo) => {
    changeContent(toGo);
  };
  return (
    <div css={totalContainer}>
      <h1>Logo</h1>
      <button onClick={() => onClick('mainContent')}>대시보드</button>
      <button onClick={() => onClick('timeTable')}>시간표</button>
      <button onClick={() => onClick('notice')}>공지사항</button>
      <button onClick={() => onClick('shop')}>상점</button>
      <button onClick={() => onClick('myPage')}>마이페이지</button>
    </div>
  );
};

const totalContainer = css`
  width: 80%;
  background: rgb(109, 163, 99);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  gap: 20px;
  padding: 40px 0px;

  button {
    width: 90%;
    height: 80px;
  }
`;

NavBar.propTypes = {
  changeContent: PropTypes.func.isRequired,
};

export default NavBar;
