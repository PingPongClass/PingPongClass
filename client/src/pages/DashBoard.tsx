/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { css } from '@emotion/react';
import IconGroup from '../components/DashBoard/IconGroup';
import MainContent from '../components/DashBoard/MainContent';
import NavBar from '../components/DashBoard/NavBar';
import dashboardBackground from '../assets/images/dashboardBackground.png';
import InputPassword from '../components/DashBoard/MyPage/InputPassword';
import NoticeBoard from '../components/DashBoard/Board/NoticeBoard';
import EditNotice from '../components/DashBoard/Board/EditNotice';
import ManagedClassBoard from '../components/DashBoard/Board/ManagedClassBoard';
import EditClass from '../components/DashBoard/Board/EditClass';
import StoreMain from '@src/components/DashBoard/Store/StoreMain';

const DashBoard = () => {
  const contentStore = useAppSelector((state) => state.content.content);
  const [content, setContent] = useState('mainContent');
  const changeContent = (toGo: string) => {
    setContent(toGo);
  };
  useEffect(() => {
    // 리렌더링을 위한 함수
    setContent(contentStore);
  }, [contentStore]);

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
                notice: <NoticeBoard />,
                postNotice: <EditNotice />,
                editNotice: <EditNotice />,
                class: <ManagedClassBoard />,
                addClass: <EditClass />,
                editClass: <EditClass />,
                shop: <StoreMain />,
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
    width: 250px;
    min-width: 250px;
  }

  .userInfo {
    height: 90%;
    width: 1000px;
    min-width: 1000px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-shadow: 2px 2px 10px -5px;
    border-radius: 20px;
  }

  .infoBar {
    height: 5%;
    width: 95%;
    margin: 10px 10px 0px 10px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    gap: 30px;
    overflow-y: scroll;
  }

  .infoContent::-webkit-scrollbar {
    display: none;
  }

  .footer {
    height: 5%;
    width: 95%;
    margin: 10px;
    padding: 0px 20px;
    background: rgb(236, 236, 236);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
`;

export default DashBoard;
