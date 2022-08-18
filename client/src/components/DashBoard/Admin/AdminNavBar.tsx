import { css } from '@emotion/react';
import mainLogo from '@assets/images/mainLogo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';

const NavBar = () => {
  const [isStudents, setIsStudents] = useState(true);
  const [isTeachers, setIsTeachers] = useState(false);
  const [isClasses, setIsClasses] = useState(false);
  const [isNotices, setIsNotices] = useState(false);

  const onClickStudents = () => {
    setIsStudents(true);
    setIsTeachers(false);
    setIsClasses(false);
    setIsNotices(false);
  };

  const onClickTeachers = () => {
    setIsStudents(false);
    setIsTeachers(true);
    setIsClasses(false);
    setIsNotices(false);
  };

  const onClickClasses = () => {
    setIsStudents(false);
    setIsTeachers(false);
    setIsClasses(true);
    setIsNotices(false);
  };

  const onClickNotices = () => {
    setIsStudents(false);
    setIsTeachers(false);
    setIsClasses(false);
    setIsNotices(true);
  };

  useLayoutEffect(() => {
    const url = document.location.href;
    const urlSplit = url.split('/');
    if (urlSplit[urlSplit.length - 1] === 'teachers') onClickTeachers();
    else if (urlSplit[urlSplit.length - 1] === 'classes') onClickClasses();
    else if (urlSplit[urlSplit.length - 1] === 'notice') onClickNotices();
    else onClickStudents();
  }, []);

  return (
    <div css={totalContainer}>
      <img src={mainLogo} alt="" />
      <Link to="students">
        <div
          className={isStudents ? 'clickButton' : 'dashNavButton'}
          onClick={onClickStudents}
        >
          <DashboardIcon style={{ fontSize: '40px' }} />
          학생 관리
        </div>
      </Link>
      <Link to="teachers">
        <div
          className={isTeachers ? 'clickButton' : 'dashNavButton'}
          onClick={onClickTeachers}
        >
          <DashboardIcon style={{ fontSize: '40px' }} />
          교사 관리
        </div>
      </Link>
      <Link to="classes">
        <div
          className={isClasses ? 'clickButton' : 'dashNavButton'}
          onClick={onClickClasses}
        >
          <CalendarMonthIcon style={{ fontSize: '40px' }} />
          수업 관리
        </div>
      </Link>
      <Link to="notice">
        <div
          className={isNotices ? 'clickButton' : 'dashNavButton'}
          onClick={onClickNotices}
        >
          <CampaignIcon style={{ fontSize: '40px' }} />
          공지 관리
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
    background-color: var(--blue);
    border-radius: 10px;
    color: white;
  }

  .dashNavButton:hover {
    transform: scale(1.1);
    background-color: var(--blue);
    border-radius: 10px;
    color: white;
  }

  a,
  a:visited,
  .linkButton {
    text-decoration: none;
    color: black;
  }

  img {
    width: 90%;
  }
`;

export default NavBar;
