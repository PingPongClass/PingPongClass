/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import LeftSide from '../components/Home/LeftSide';
import RightSide from '../components/Home/RightSide';

function Home() {
  return (
    <div css={totalContainer}>
      <LeftSide />
      <RightSide />
    </div>
  );
}

const totalContainer = css`
  position: absolute;
  width: 90vw;
  height: 90vh;
  left: 5vw;
  top: 5vh;

  background: linear-gradient(
    185.82deg,
    rgba(127, 192, 228, 0.7) 0%,
    rgba(94, 103, 190, 0.357) 95.83%
  );
  border-radius: 20px;
  display: flex;
  flex-direction: row;
`;

export default Home;
