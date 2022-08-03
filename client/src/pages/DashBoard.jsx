/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import IconGroup from '../components/DashBoard/IconGroup';
import MainContent from '../components/DashBoard/MainContent';
import NavBar from '../components/DashBoard/NavBar';
import dashboardBackground from '../assets/images/dashboardBackground.png';
import InputPassword from '../components/DashBoard/MyPage/InputPassword';

function DashBoard() {
  const [content, setContent] = useState('mainContent');
  const changeContent = (toGo) => {
    setContent(toGo);
  };
  return (
    <div css={totalContainer}>
      <div className="dashBoardContainer">
        <div className="navBar">
          <NavBar changeContent={changeContent} />
        </div>
        <div className="userInfo">
          <div className="infoBar">
            <IconGroup />
          </div>
          <div className="infoContent">
            {
              {
                mainContent: <MainContent />,
                timeTable: <h1>시간표</h1>,
                notice: <h1>공지사항</h1>,
                shop: <h1>상점</h1>,
                myPage: <InputPassword />,
              }[content]
            }
          </div>
          <div className="footer">
            <h1>핑퐁클래스 파이팅</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

const totalContainer = css`
  background-image: url(${dashboardBackground});
  background-size: cover;
  height: 100vh;

  .dashBoardContainer {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  .navBar {
    height: 100%;
    width: 20%;
    max-width: 300px;
    min-width: 200px;
    background: rgba(144, 186, 194, 0.633);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .userInfo {
    height: 100%;
    width: 80%;
    max-width: 1100px;
    min-width: 500px;
    background: rgba(130, 101, 136, 0.404);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .infoBar {
    height: 5%;
    width: 95%;
    margin: 10px;
    padding: 0px 20px;
    background: #7fddb3;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    box-sizing: border-box;
  }

  .infoContent {
    height: 85%;
    width: 95%;
    margin: 10px;
    padding: 20px;
    background: #c8b97c;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    gap: 30px;
  }

  .footer {
    height: 5%;
    width: 95%;
    margin: 10px;
    padding: 0px 20px;
    background: #4ab0d9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
`;

export default DashBoard;
