import { css } from '@emotion/react';
import EventIcon from '@mui/icons-material/Event';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import AlarmModal from './AlarmModal';
import MyPageModal from './MyPageModal';

const IconGroup = () => {
  const [toggle, setToggle] = useState('');
  const onClick = (method: any) => {
    setToggle(method);
  };

  return (
    <div css={totalContainer}>
      <button onClick={() => onClick('timeTable')}>
        <EventIcon />
      </button>
      <button onClick={() => onClick('alarm')}>
        <NotificationsNoneIcon />
      </button>
      <button onClick={() => onClick('myPage')}>
        <AccountCircleIcon />
      </button>
      {toggle === 'alarm' ? <AlarmModal close={onClick} /> : null}
      {toggle === 'myPage' ? <MyPageModal close={onClick} /> : null}
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
    width: 30px;
    height: 30px;
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
  }
`;
export default IconGroup;
