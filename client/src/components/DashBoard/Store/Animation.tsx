/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import BobkkiCapsule from '../../../assets/images/bobkkiCapsule.png';
import CapsuleBox from '../../../assets/images/capsuleBox.png';
import ItemBackground from '../../../assets/images/splash2.png';
import ItemTicket from '../../../assets/images/itemTicket.png';
import { CenterFocusStrong } from '@mui/icons-material';

interface ModalDefaultType {
  onClickOpenModal: () => void;
}

const Animation = ({
  onClickOpenModal,
}: PropsWithChildren<ModalDefaultType>) => {
  return (
    <div css={totalContainer}>
      <div
        style={{
          position: 'relative',
          width: '16.5%',
          height: '20%',
          animation: 'vibration .1s',
          animationIterationCount: '15',
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1, 1, 1],
            background: 'var(--action)',
            transitionEnd: {
              animation: '0.5s ease-in-out unloadEffect',
              opacity: '0',
            },
          }}
          transition={{ duration: 2, repeat: 0 }}
          style={{
            position: 'absolute',
          }}
        >
          <img
            src={CapsuleBox}
            alt="뽑기캡슐"
            style={{ width: '100%', height: 'auto', margin: 'auto' }}
          />
        </motion.div>

        <motion.div
          animate={{
            scale: [0, 0, 0, 0, 0, 0, 2, 2, 1, 0.5],
            rotate: [0, 0, 0, 0, 0, 0, -15, 15, -15, 360],
            background: 'var(--action)',
          }}
          transition={{ duration: 4, repeat: 0 }}
          style={{
            margin: 'auto',
            position: 'absolute',
            top: '3vh',
          }}
        >
          <img src={BobkkiCapsule} alt="뽑기캡슐" />
        </motion.div>

        <motion.div
          animate={{
            scale: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5],
            background: 'var(--action)',
          }}
          transition={{ duration: 5, repeat: 0 }}
          style={{
            position: 'absolute',
          }}
        >
          <img
            src={ItemBackground}
            alt="뽑기배경"
            style={{
              width: '450px',
              marginBottom: '60vh',
              marginRight: '32vw',
            }}
          />
        </motion.div>

        <motion.div
          animate={{
            scale: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5],
            background: 'var(--action)',
          }}
          transition={{ duration: 5, repeat: 0 }}
          style={{
            margin: 'auto',
            position: 'absolute',
            top: '3vh',
          }}
        >
          <img src={BobkkiCapsule} alt="뽑기캡슐" />
        </motion.div>

        <motion.div
          animate={{
            scale: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5],
            background: 'var(--action)',
          }}
          transition={{ duration: 5, repeat: 0 }}
          style={{
            margin: 'auto',
            position: 'absolute',
            top: '8vh',
          }}
        >
          <img src={ItemTicket} alt="아이템" style={{ width: '70%' }} />
        </motion.div>

        <motion.div
          animate={{
            scale: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5],
            background: 'var(--action)',
          }}
          transition={{ duration: 5, repeat: 0 }}
          style={{
            margin: 'auto',
            position: 'absolute',
            top: '27vh',
            left: '8vh',
          }}
        >
          <p
            style={{
              textShadow:
                '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
              fontWeight: 700,
              color: 'white',
            }}
          >
            발표프리패스권~!
          </p>
        </motion.div>
      </div>
      <br />
      <motion.button
        className="button pink"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClickOpenModal}
        style={{
          zIndex: '10000',
          marginTop: '13vh',
          animation: ' 0.7s ease-in-out loadEffect1',
          animationDelay: '5s',
          animationFillMode: 'backwards',
        }}
      >
        확인{' '}
      </motion.button>
    </div>
  );
};

const totalContainer = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes vibration {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(-1deg);
    }
  }

  @keyframes unloadEffect {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }
    100% {
      transform: translateX(-30px);
      opacity: 0;
    }
  }
`;

export default Animation;
