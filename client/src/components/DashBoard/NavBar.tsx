import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import mainLogo from '@assets/images/mainLogo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CampaignIcon from '@mui/icons-material/Campaign';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';

interface NavBarProps {
  changeContent: Function;
}

const NavBar = ({ changeContent }: NavBarProps) => {
  const onClick = (toGo: string) => {
    changeContent(toGo);
  };
  return (
    <div css={totalContainer}>
      <img src={mainLogo} alt="" />
      <div className="navButton" onClick={() => onClick('mainContent')}>
        <DashboardIcon />
        <h3>대시보드</h3>
      </div>
      <div className="navButton" onClick={() => onClick('timeTable')}>
        <CalendarMonthIcon />
        <h3>수업목록</h3>
      </div>
      <div className="navButton" onClick={() => onClick('notice')}>
        <CampaignIcon />
        <h3>공지사항</h3>
      </div>
      <div className="navButton" onClick={() => onClick('shop')}>
        <StorefrontIcon />
        <h3>상점</h3>
      </div>
      <div className="navButton" onClick={() => onClick('myPage')}>
        <PersonIcon />
        <h3>마이페이지</h3>
      </div>
    </div>
  );
};

const totalContainer = css`
  width: 210px;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  gap: 26px;
  padding: 30px 10px;
  margin-top: 100px;
  box-shadow: 2px 2px 15px -5px;

  .navButton {
    width: 90%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding-left: 24px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .navButton h3 {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 90%;
  }
`;

NavBar.propTypes = {
  changeContent: PropTypes.func.isRequired,
};

export default NavBar;
