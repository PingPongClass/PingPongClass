/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import mainLogo from '../../assets/images/mainLogo.png';
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
      <div className="button" onClick={() => onClick('mainContent')}>
        <DashboardIcon />
        <p>대시보드</p>
      </div>
      <div className="button" onClick={() => onClick('timeTable')}>
        <CalendarMonthIcon />
        <p>시간표</p>
      </div>
      <div className="button" onClick={() => onClick('notice')}>
        <CampaignIcon />
        <p>공지사항</p>
      </div>
      <div className="button" onClick={() => onClick('shop')}>
        <StorefrontIcon />
        <p>상점</p>
      </div>
      <div className="button" onClick={() => onClick('myPage')}>
        <PersonIcon />
        <p>마이페이지</p>
      </div>
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
  margin-top: 66px;
  box-shadow: 5px 5px 15px -5px;

  .button {
    width: 90%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding-left: 28px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .button p {
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
