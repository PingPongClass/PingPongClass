import { css } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';
import { useState } from 'react';
import MyPageModal from '../MyPageModal';

const AdminIconGroup = () => {
  const [toggle, setToggle] = useState('');
  const onClickIcon = (icon: string) => {
    // alert(icon + ',' + toggle);
    if (toggle === icon) {
      setToggle('');
    } else {
      setToggle(icon);
    }
  };

  return (
    <div css={totalContainer}>
      <button onClick={() => onClickIcon('myPage')}>
        <AccountCircleIcon />
      </button>
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
export default AdminIconGroup;
