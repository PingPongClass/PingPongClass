import { css } from '@emotion/react';
import IconGroup from '@components/DashBoard/IconGroup';
import NavBar from '@components/DashBoard/NavBar';
import dashboardBackground from '@assets/images/dashboardBackground.png';
import Footer from '@components/DashBoard/Footer/Footer';
import { useEffect, useState, useLayoutEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { saveMember, saveItem } from '@src/store/member';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import loadingImg from '@src/openvidu/assets/images/loadingimg.gif';
import getTthingMessage from '@utils/tthingMessage';
import loadAlarm from '@src/utils/loadAlarm';

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [tthingMessage, setTthingMessage] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(saveMember()).then(() => timer);
  }, []);

  useLayoutEffect(() => {
    const ttingMsg = getTthingMessage();
    setTthingMessage(ttingMsg);
  }, []);

  const render = () => {
    return (
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
    );
  };
  return (
    <div css={totalContainer}>
      {loading ? (
        <div className="loadingImgBox">
          <h1>로딩중...</h1>
          <img src={loadingImg} alt="" />
          <p>{tthingMessage}</p>
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

  .loadingImgBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .loadingImgBox img {
    width: 600px;
    height: auto;
    margin: 32px;
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

  .dashboardRight {
    height: 100%;
  }

  .userInfo {
    height: 85%;
    width: 1250px;
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
    padding: 20px 10px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    gap: 30px;
    overflow-y: scroll;
  }

  .infoContent::-webkit-scrollbar {
    width: 6.5px;
  }

  .infoContent::-webkit-scrollbar-track {
    background: #ebebeb;
    border-radius: 20px;
  }

  .infoContent::-webkit-scrollbar-thumb {
    background-color: #cacacb; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }

  .footer {
    height: 5%;
    width: 1000px;
    padding: 20px 10px;
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
