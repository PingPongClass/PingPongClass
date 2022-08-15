import { css } from '@emotion/react';
import mainLogo from '@assets/images/mainLogo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TeacherNavBar = () => {
  const [isDashboard, setIsDashboard] = useState(true);
  const [isClasses, setIsClasses] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const [isNotices, setIsNotices] = useState(false);

  const onClickDashboard = () => {
    setIsDashboard(true);
    setIsClasses(false);
    setIsLog(false);
    setIsNotices(false);
  };

  const onClickClasses = () => {
    setIsDashboard(false);
    setIsClasses(true);
    setIsLog(false);
    setIsNotices(false);
  };

  const onClickLog = () => {
    setIsDashboard(false);
    setIsClasses(false);
    setIsLog(true);
    setIsNotices(false);
  };

  const onClickNotices = () => {
    setIsDashboard(false);
    setIsClasses(false);
    setIsLog(false);
    setIsNotices(true);
  };

  return (
    <div css={totalContainer}>
      <img src={mainLogo} alt="" />
      <Link to="" className="linkButton">
        <div
          className={isDashboard ? 'clickButton' : 'teacherNavButton'}
          onClick={onClickDashboard}
        >
          <DashboardIcon style={{ fontSize: '40px' }} />
          대시보드
        </div>
      </Link>
      <Link to="classes" className="linkButton">
        <div
          className={isClasses ? 'clickButton' : 'teacherNavButton'}
          onClick={onClickClasses}
        >
          <CalendarMonthIcon style={{ fontSize: '40px' }} />
          수업목록
        </div>
      </Link>
      <Link to="log" className="linkButton">
        <div
          className={isLog ? 'clickButton' : 'teacherNavButton'}
          onClick={onClickLog}
        >
          <CampaignIcon style={{ fontSize: '40px' }} />
          수업기록
        </div>
      </Link>
      <Link to="notice" className="linkButton">
        <div
          className={isNotices ? 'clickButton' : 'teacherNavButton'}
          onClick={onClickNotices}
        >
          <CampaignIcon style={{ fontSize: '40px' }} />
          공지사항
        </div>
      </Link>
    </div>
  );
};

const totalContainer = css`
  width: 210px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  gap: 26px;
  padding: 30px 10px;
  margin-top: 50px;
  box-shadow: 2px 2px 10px -5px;

  .teacherNavButton {
    width: 160px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.1s ease-in-out;
  }

  .clickButton {
    width: 160px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.1s ease-in-out;
    background-color: var(--pink);
    border-radius: 10px;
    color: white;
  }

  .teacherNavButton:hover {
    transform: scale(1.1);
    background-color: var(--pink);
    border-radius: 10px;
    color: white;
  }

  .linkButton {
    text-decoration: none;
    color: black;
  }

  img {
    width: 90%;
  }
`;

export default TeacherNavBar;
