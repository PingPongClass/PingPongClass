import { css } from '@emotion/react';
import mainLogo from '@assets/images/mainLogo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CampaignIcon from '@mui/icons-material/Campaign';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';

const NavBar = () => {
  const [isDashboard, setIsDashboard] = useState(true);
  const [isClasses, setIsClasses] = useState(false);
  const [isNotices, setIsNotices] = useState(false);
  const [isStore, setIsStore] = useState(false);
  const [isLog, setIsLog] = useState(false);

  const onClickDashboard = () => {
    setIsDashboard(true);
    setIsClasses(false);
    setIsNotices(false);
    setIsStore(false);
    setIsLog(false);
  };

  const onClickClasses = () => {
    setIsDashboard(false);
    setIsClasses(true);
    setIsNotices(false);
    setIsStore(false);
    setIsLog(false);
  };

  const onClickNotices = () => {
    setIsDashboard(false);
    setIsClasses(false);
    setIsNotices(true);
    setIsStore(false);
    setIsLog(false);
  };

  const onClickStore = () => {
    setIsDashboard(false);
    setIsClasses(false);
    setIsNotices(false);
    setIsStore(true);
    setIsLog(false);
  };

  const onClickLog = () => {
    setIsDashboard(false);
    setIsClasses(false);
    setIsNotices(false);
    setIsStore(false);
    setIsLog(true);
  };

  useLayoutEffect(() => {
    const url = document.location.href;
    const urlSplit = url.split('/');
    if (urlSplit[urlSplit.length - 1] === 'classes') onClickClasses();
    else if (urlSplit[urlSplit.length - 1] === 'notice') onClickNotices();
    else if (urlSplit[urlSplit.length - 1] === 'store') onClickStore();
    else if (urlSplit[urlSplit.length - 1] === 'log') onClickLog();
    else onClickDashboard();
  }, []);

  return (
    <div css={totalContainer}>
      <Link to="" className="linkButton">
        <img src={mainLogo} alt="" />
      </Link>
      <Link to="" className="linkButton">
        <div
          className={isDashboard ? 'clickButton' : 'dashNavButton'}
          onClick={onClickDashboard}
        >
          <DashboardIcon className="nav-div" />
          대시보드
        </div>
      </Link>
      <Link to="classes" className="linkButton">
        <div
          className={isClasses ? 'clickButton' : 'dashNavButton'}
          onClick={onClickClasses}
        >
          <CalendarMonthIcon className="nav-div" />
          수업목록
        </div>
      </Link>
      <Link to="log" className="linkButton">
        <div
          className={isLog ? 'clickButton' : 'dashNavButton'}
          onClick={onClickLog}
        >
          <BookIcon className="nav-div" />
          수업기록
        </div>
      </Link>
      <Link to="notice" className="linkButton">
        <div
          className={isNotices ? 'clickButton' : 'dashNavButton'}
          onClick={onClickNotices}
        >
          <CampaignIcon className="nav-div" />
          공지사항
        </div>
      </Link>
      <Link to="store" className="linkButton">
        <div
          className={isStore ? 'clickButton' : 'dashNavButton'}
          onClick={onClickStore}
        >
          <StorefrontIcon className="nav-div" />
          퐁퐁상점
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

  .nav-div {
    font-size: 30px;
  }

  .dashNavButton {
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

  .dashNavButton:hover {
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
    margin: 19px 8px;
  }
`;

export default NavBar;
