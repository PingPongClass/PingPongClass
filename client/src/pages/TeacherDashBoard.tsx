import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import IconGroup from '@components/DashBoard/IconGroup';
import TeacherNavBar from '@components/DashBoard/Teacher/TeacherNavBar';
import dashboardBackground from '@assets/images/dashboardBackground.png';
import Footer from '@components/DashBoard/Footer/Footer';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { saveMember } from '@src/store/member';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import loadingImg from '@src/openvidu/assets/images/loadingimg.gif';

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const memberStore = useAppSelector((state) => state.member);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    dispatch(saveMember()).then(() => timer);
  }, []);

  const render = () => {
    return (
      <div className="dashBoardContainer">
        <div className="navBar">
          <TeacherNavBar />
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
    );
  };
  return (
    <div css={totalContainer}>
      {loading ? (
        <div className="loadingImg">
          <h1>로딩중...</h1>
          <img src={loadingImg} alt="" />
        </div>
      ) : (
        render()
      )}
    </div>
  );
};

const totalContainer = css`
  background-image: url(${dashboardBackground});
  background-size: cover;
  height: 100vh;

  .loadingImg {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
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
    padding: 20px 20px 20px 20px;
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
