/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import backgroundImg from '../assets/images/homeBackground.png';
import IosModal from '../components/Common/IosModal';
import LeftSide from '../components/Home/LeftSide';
import RightSide from '../components/Home/RightSide';

function Home() {
  return (
    <div css={totalContainer}>
      <IosModal>
        <LeftSide />
        <RightSide />
      </IosModal>
    </div>
  );
}

const totalContainer = css`
  background-image: url(${backgroundImg});
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export default Home;
