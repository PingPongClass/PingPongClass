import { css } from '@emotion/react';
import Shuffle from '@mui/icons-material/Shuffle';
import Quiz from '@mui/icons-material/HelpOutline';
import AccessTime from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';

const TeachersToolbar = ({
  display,
  pickRandomStudent,
  randAvailable,
  startStickerEvent,
  stickerAvailable,
  toggleQuiz,
  toggleTeacherMenu,
}) => {
  const onClickRandomPick = () => {
    pickRandomStudent();
    toggleTeacherMenu();
  };

  const onClickStickerEvent = () => {
    startStickerEvent();
    toggleTeacherMenu();
  };

  const onClickToggleQuiz = () => {
    toggleQuiz();
    toggleTeacherMenu();
  };

  return (
    <div css={TotalComponent}>
      <div className={display ? 'openModal' : 'closeModal'}>
        <div className="buttonsContents">
          <IconButton
            color="inherit"
            className="navButton"
            id="navRandButton"
            onClick={onClickRandomPick}
            disabled={!randAvailable}
          >
            <div className="buttonStyle">
              {randAvailable ? (
                <Shuffle />
              ) : (
                <Shuffle
                  color="secondary"
                  style={{ animation: 'cooldown 5s linear 1' }}
                />
              )}
              <p>랜덤 학생 뽑기</p>
            </div>
          </IconButton>

          <IconButton
            color="inherit"
            className="navButton"
            id="navRandButton"
            onClick={onClickStickerEvent}
            disabled={!stickerAvailable}
          >
            <div className="buttonStyle">
              {stickerAvailable ? (
                <AccessTime />
              ) : (
                <AccessTime
                  color="secondary"
                  style={{ animation: 'cooldown 30s linear 1' }}
                />
              )}
              <p>집중 스티커</p>
            </div>
          </IconButton>
          <IconButton
            color="inherit"
            className="navButton"
            id="navRandButton"
            onClick={onClickToggleQuiz}
          >
            <div className="buttonStyle">
              <Quiz />
              <p>퀴즈 열기</p>
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const TotalComponent = css`
  position: absolute;
  z-index: 9999;
  left: 70px;
  width: 250px;

  .openModal {
    z-index: 9999;
    background-color: rgb(62 76 118);
    border-radius: 20px;
    padding-left: 10px;
    animation: modal-bg-show 0.3s;

    .buttonContents {
      background-color: rgb(62 76 118);
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 1fr;
    }
  }

  .closeModal {
    visibility: hidden;
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default TeachersToolbar;
