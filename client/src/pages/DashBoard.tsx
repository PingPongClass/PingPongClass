/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import IconGroup from '../components/DashBoard/IconGroup';
import MainContent from '../components/DashBoard/MainContent';
import NavBar from '../components/DashBoard/NavBar';
import dashboardBackground from '../assets/images/dashboardBackground.png';
import InputPassword from '../components/DashBoard/MyPage/InputPassword';

const DashBoard = () => {
  const [content, setContent] = useState('mainContent');
  const changeContent = (toGo: string) => {
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
            <h1>footer</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
  background-image: url(${dashboardBackground});
  background-size: cover;
  height: 100vh;

  .dashBoardContainer {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  .navBar {
    height: 100%;
    width: 300px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .userInfo {
    height: 90%;
    width: 900px;
    min-width: 900px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-shadow: 5px 5px 10px -5px;
    border-radius: 10px;
  }

  .infoBar {
    height: 5%;
    width: 95%;
    margin: 10px;
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
    background: #bcbcbc;
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
    background: #8d9491;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
`;

export default DashBoard;
