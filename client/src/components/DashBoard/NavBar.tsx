/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import mainLogo from '../../assets/images/mainLogo.png';

interface NavBarProps {
  changeContent: Function;
}

const NavBar = ({ changeContent }: NavBarProps) => {
  const onClick = (toGo: string) => {
    changeContent(toGo);
  };
  return (
    <div css={totalContainer}>
      <img src={mainLogo} alt="" />
      <button onClick={() => onClick('mainContent')}>대시보드</button>
      <button onClick={() => onClick('timeTable')}>시간표</button>
      <button onClick={() => onClick('notice')}>공지사항</button>
      <button onClick={() => onClick('shop')}>상점</button>
      <button onClick={() => onClick('myPage')}>마이페이지</button>
    </div>
  );
};

const totalContainer = css`
  width: 210px;
  background: rgb(109, 163, 99);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  gap: 20px;
  padding: 20px 10px;
  margin-top: 25%;

  button {
    width: 90%;
    height: 80px;
  }

  img {
    width: 90%;
  }
`;

NavBar.propTypes = {
  changeContent: PropTypes.func.isRequired,
};

export default NavBar;
