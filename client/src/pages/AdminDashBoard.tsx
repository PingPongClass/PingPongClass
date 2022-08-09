import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import IconGroup from '@components/DashBoard/IconGroup';
import NavBar from '@components/DashBoard/Admin/AdminNavBar';
import dashboardBackground from '@assets/images/dashboardBackground.png';
import Footer from '@components/DashBoard/Footer/Footer';
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveMember, logIn, logOut } from '@src/store/member';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';

const DashBoard = () => {
  const [toastMsg, setToast] = useState('원재호 님 로그인 되었습니다.');
  const dispatch = useAppDispatch();
  const notify = () =>
    toast.success(toastMsg, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  useEffect(() => {
    // 테스트용 직원 아이디
    // dispatch(saveMember(5030001));
  }, []);

  // toastMsg에 원하는 메시지를 써서 함수를 실행하면 됨
  // 여기있는 예시처럼 useState 를 활용해서 관리해도되고
  if (toastMsg) {
    notify();
    setToast('');
  }

  return (
    <div css={totalContainer}>
      <ToastContainer />
      <div className="dashBoardContainer">
        <div className="navBar">
          <NavBar />
        </div>
        <div className="userInfo">
          <div className="infoBar">
            <IconGroup />
          </div>
          <div className="infoContent">
            <Outlet />
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
  background-image: url(${dashboardBackground});
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
