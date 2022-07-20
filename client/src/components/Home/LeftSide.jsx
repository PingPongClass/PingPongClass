/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MovingLogo from '../../images/movingLogo.gif';

function LeftSide() {
  return (
    <div css={totalContainer}>
      <img src={MovingLogo} alt="움직이는 기본로고" />
    </div>
  );
}

const totalContainer = css`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 400px;
  }
`;

export default LeftSide;
