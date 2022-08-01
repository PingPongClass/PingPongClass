/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MainLogo from '../../images/image1.png';

function LeftSide() {
  return (
    <div css={totalContainer}>
      <img src={MainLogo} alt="로고" />
    </div>
  );
}

const totalContainer = css`
  margin-left: 4vw;
  width: 40%;
  align-items: center;
  display: flex;
  justify-content: center;
  img {
    max-width: 100%;
    min-width: 40%;
    height: auto;
  }
`;

export default LeftSide;
