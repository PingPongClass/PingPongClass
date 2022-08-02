//SSOCO
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import backgroundImg from '../assets/images/homeBackground.png';
import IosModal from '../components/Common/IosModal';
// import Modal from '../components/Common/Modal';
import LeftSide from '../components/Home/LeftSide';
import RightSide from '../components/Home/RightSide';

/*
모달 사용법
  <IosModal
        renderCenter={true}
        isRelative={true}
        absolutePos={{ top: '0', left: '0' }}
        relativePos={{ top: '0', left: '0' }}
        width="1000px"
        height="300px"
  >
*/

const Home = () => (
  <div css={TotalContainer}>
    <IosModal
      renderCenter={true}
      isRelative={false}
      width="1500px"
      height="800px"
    >
      <div css={ModalCSS}>
        <LeftSide />
        <RightSide />
      </div>
    </IosModal>
  </div>
);

const TotalContainer = css`
  background-image: url(${backgroundImg});
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const ModalCSS = css`
  display: flex;
  flex-direction: row;
`;

export default Home;
