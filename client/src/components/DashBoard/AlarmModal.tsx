/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface AlarmModalStyle {
  close: any;
  alarmUpdate: any;
}

const removeAlarm = (idx, card, alarmUpdate) => {
  alarmUpdate();
  const removedAlarms = JSON.parse(localStorage.getItem('removed') as any);
  console.log(card);
  localStorage.setItem(
    'removed',
    JSON.stringify([...removedAlarms, card.sort]),
  );
  const el = document.getElementById(`${idx}card`);
  el?.setAttribute('style', 'display: none');
};

const alarms = localStorage.getItem('alarms') as any;
const parsing = JSON.parse(alarms);

const nthChildCard = ({ offset = 65, multiplier = 220 }) => {
  const styles = {};
  styles[`&:last-of-type`] = {
    top: `${offset + (parsing.length - 1) * multiplier}px`,
  };
  if (parsing) {
    parsing.forEach((_, index) => {
      if (index !== 0) {
        styles[`&:nth-of-type(${index + 1})`] = {
          top: `${offset + (index - 1) * multiplier}px`,
        };
      }
    });
  }
  return styles;
};

const AlarmModal = ({ alarmUpdate, close }: AlarmModalStyle) => {
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
        {parsing.map((card, idx) => {
          return (
            <div key={idx} className="alarmCard" id={`${idx}card`}>
              <div className="alarmCardNav">
                <NotificationsIcon style={{ color: '#ffcc00' }} />
                <div
                  className="closeButton"
                  onClick={() => removeAlarm(idx, card, alarmUpdate)}
                >
                  <CloseIcon fontSize={'small'} />
                </div>
              </div>
              <h3>{card.title}</h3>
              <p>{card.msg}</p>
            </div>
          );
        })}
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
  z-index: 1000;

  .alarmBack {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .alarmNav {
    width: 360px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .alarmCardNav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .alarmModal {
    min-width: 400px;
    width: 400px;
    height: 85%;
    padding: 20px;
    margin-top: 50px;
    background-color: rgba(249, 249, 249);
    box-sizing: border-box;
    border-radius: 20px 0px 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-shadow: 2px 2px 10px -5px;
    animation: fadeIn 0.4s;
    position: relative;
    overflow-y: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .alarmModal::-webkit-scrollbar {
    display: none;
  }

  .closeButton {
    cursor: pointer;
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
    min-height: 200px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: #eaf1fb;
    box-shadow: 2px 2px 10px -5px;
    margin-bottom: 20px;
    ${nthChildCard({ offset: 65, multiplier: 220 })};
  }
`;

export default AlarmModal;
