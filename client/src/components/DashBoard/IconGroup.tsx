import { css } from '@emotion/react';
import EventIcon from '@mui/icons-material/Event';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import AlarmModal from './AlarmModal';

const IconGroup = () => {
  const [toggle, setToggle] = useState(false);
  const onClick = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  return (
    <div css={totalContainer}>
      <button>
        <EventIcon />
      </button>
      <button onClick={onClick}>
        <NotificationsNoneIcon />
      </button>
      <button>
        <AccountCircleIcon />
      </button>
      {toggle ? <AlarmModal close={onClick} /> : null}
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
    border: 1px solid;
    width: 40px;
    height: 40px;
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
