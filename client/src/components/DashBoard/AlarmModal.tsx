/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface AlarmModalStyle {
  close: any;
}

const AlarmModal = ({ close }: AlarmModalStyle) => {
  return (
    <div css={totalContainer}>
      <div className="alarmBack" onClick={close}></div>
      <div className="alarmModal">
        <div className="alarmNav">
          <h2>알림</h2>
          <CloseIcon
            fontSize={'large'}
            onClick={close}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <h3>모두삭제</h3>
        <div className="alarmCard">
          <div className="alarmCardNav">
            <NotificationsIcon style={{ color: '#ffcc00' }} />
            <CloseIcon fontSize={'small'} />
          </div>
          <h3>Card</h3>
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  z-index: 999;

  .alarmBack {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .alarmNav {
    width: 340px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .alarmCardNav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .alarmModal {
    width: 400px;
    height: 1100px;
    padding: 20px;
    margin-top: 100px;
    background-color: rgba(249, 249, 249);
    box-sizing: border-box;
    border-radius: 20px 0px 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-shadow: 2px 2px 10px -5px;
    animation: fadeIn 0.4s;
  }

  @keyframes fadeIn {
    from {
      position: absolute;
      right: -420px;
      opacity: 0;
    }
    to {
      position: absolute;
      right: -0px;
      opacity: 1;
    }
  }

  .alarmCard {
    width: 360px;
    height: 200px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: #eaf1fb;
    box-shadow: 2px 2px 10px -5px;
  }
`;

export default AlarmModal;
