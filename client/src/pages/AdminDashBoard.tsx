import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import IconGroup from '@components/DashBoard/Admin/AdminIconGroup';
import NavBar from '@components/DashBoard/Admin/AdminNavBar';
import AdminDashboardBackground from '@assets/images/admindashboardBackground.png';
import Footer from '@components/DashBoard/Footer/Footer';
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { saveMember, logIn, logOut } from '@src/store/member';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';

const DashBoard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 테스트용 직원 아이디
    // dispatch(saveMember(5030001));
  }, []);

  return (
    <div css={totalContainer}>
      <div className="dashBoardContainer">
        <div className="navBar">
          <NavBar />
        </div>
        <div className="dashboardRight">
          <div className="userInfo">
            <div className="infoBar">
              <IconGroup />
            </div>
            <div className="infoContent">
              <Outlet />
            </div>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
  background-image: url(${AdminDashboardBackground});
  background-size: cover;
  height: 100vh;

  .dashBoardContainer {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    background-color: transparent;
    animation: smoothAppear 1s;
  }
  .dashboardRight {
    height: 100%;
  }

  .navBar {
    height: 100%;
    width: 250px;
    min-width: 250px;
  }

  .userInfo {
    height: 85%;
    width: 1000px;
    min-width: 1000px;
    margin-top: 50px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-shadow: 2px 2px 10px -5px;
    border-radius: 20px;
  }

  .infoBar {
    height: 60px;
    width: 95%;
    padding: 10px 10px 0px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    box-sizing: border-box;
  }

  .infoContent {
    height: 90%;
    width: 95%;
    padding: 10px 20px 10px 20px;
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
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default DashBoard;
