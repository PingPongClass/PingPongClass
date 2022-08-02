/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import BackGround from '../components/DashBoard/BackGround';
import IconGroup from '../components/DashBoard/IconGroup';
import MainContent from '../components/DashBoard/MainContent';
import NavBar from '../components/DashBoard/NavBar';
import dashboardBackground from '../assets/images/dashboardBackground.png';

function DashBoard() {
  const [content, setContent] = useState('mainContent');
  const changeContent = (toGo) => {
    setContent(toGo);
  };
  return (
    <div css={totalContainer}>
      <BackGround />
      <div className="dashBoardContainer">
        <div className="navBar">
          <h1>navBar</h1>
          <NavBar changeContent={changeContent} />
        </div>
        <div className="userInfo">
          <h1>userInfo</h1>
          <div className="infoBar">
            <h1>infoBar</h1>
            <IconGroup />
          </div>
          <div className="infoContent">
            <h1>infoContent</h1>
            {
              {
                mainContent: <MainContent />,
                timeTable: <h1>시간표</h1>,
                notice: <h1>공지사항</h1>,
                shop: <h1>상점</h1>,
                myPage: <h1>마이페이지</h1>,
              }[content]
            }
          </div>
          <div className="footer">
            <h1>footer</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

const totalContainer = css`
  background-image: url(${dashboardBackground});
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;

  .dashBoardContainer {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    position: absolute;
  }

  .navBar {
    height: 100vh;
    width: 20%;
    background: rgba(144, 186, 194, 0.633);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .userInfo {
    height: 100%;
    width: 80%;
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
    justify-content: space-between;
    box-sizing: border-box;
  }

  .infoContent {
    height: 80%;
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
