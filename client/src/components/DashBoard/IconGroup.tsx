import { css } from '@emotion/react';
import EventIcon from '@mui/icons-material/Event';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import AlarmModal from './AlarmModal';
import MyPageModal from './MyPageModal';

const IconGroup = () => {
  const [toggle, setToggle] = useState('');
  const onClickIcon = (icon: string) => {
    setToggle(icon);
  };

  return (
    <div css={totalContainer}>
      <button onClick={() => onClickIcon('timeTable')}>
        <EventIcon />
      </button>
      <button onClick={() => onClickIcon('alarm')}>
        <NotificationsNoneIcon />
      </button>
      <button onClick={() => onClickIcon('myPage')}>
        <AccountCircleIcon />
      </button>
      {toggle === 'alarm' ? <AlarmModal close={onClickIcon} /> : null}
      {toggle === 'myPage' ? (
        <MyPageModal close={onClickIcon} setToggle={setToggle} />
      ) : null}
    </div>
  );
};

const totalContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;

  button {
    width: 40px;
    height: 40px;
    border: none;
    background-color: #e6e6e6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    background: white;
    box-shadow: 2px 2px 10px -5px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }

  button:hover {
    transform: scale(1.2);
  }
`;
export default IconGroup;
