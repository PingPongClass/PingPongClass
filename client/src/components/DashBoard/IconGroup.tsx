import { css } from '@emotion/react';
import EventIcon from '@mui/icons-material/Event';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import AlarmModal from './AlarmModal';
import MyPageModal from './MyPageModal';
import TimeTable from './TimeTable/TimeTable';
import loadAlarm from '@src/utils/loadAlarm';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';

const IconGroup = () => {
  const memberStore = useAppSelector((state) => state.member);
  const [toggle, setToggle] = useState('');
  const [alarm, setAlarm] = useState('');
  const onClickIcon = (icon: string) => {
    // alert(icon + ',' + toggle);
    if (toggle === icon) {
      setToggle('');
    } else {
      setToggle(icon);
    }
  };

  useEffect(() => {
    alarmUpdate();
  }, []);

  const alarmUpdate = () => {
    const timer = () => {
      setTimeout(() => {
        const alarms = localStorage.getItem('alarms') as any;
        const parsing = JSON.parse(alarms);
        setAlarm(parsing.length);
      }, 500);
    };
    loadAlarm({ id: memberStore.userId, name: memberStore.name });
    timer();
  };

  const notification = () => {
    return <div className="alarmCount">{alarm}</div>;
  };

  return (
    <div css={totalContainer}>
      <button onClick={() => onClickIcon('timetable')}>
        <EventIcon />
      </button>

      <button onClick={() => onClickIcon('alarm')}>
        <NotificationsNoneIcon className="alarmIcon" />
        {alarm ? notification() : null}
      </button>

      <button onClick={() => onClickIcon('myPage')}>
        <AccountCircleIcon />
      </button>

      {toggle === 'timetable' ? <TimeTable close={onClickIcon} /> : null}
      {toggle === 'alarm' ? (
        <AlarmModal alarmUpdate={alarmUpdate} close={onClickIcon} />
      ) : null}

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

  .alarmIcon {
    position: absolute;
  }

  .alarmCount {
    display: flex;
    flex: row;
    align-items: center;
    justify-content: center;
    top: -14px;
    right: -14px;
    width: 10px;
    height: 10px;
    position: relative;
    background-color: tomato;
    padding: 3px;
    border-radius: 20px;
    color: white;
  }

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
