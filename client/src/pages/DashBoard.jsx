/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import dashboardBackground from '../assets/images/dashboardBackground.png';

function DashBoard() {
  return (
    <div css={totalContainer}>
      <div className="dashBoardContainer">
        <div className="navBar">
          <h1>navBar</h1>
        </div>
        <div className="userInfo">
          <div className="infoBar">
            <h1>infoBar</h1>
          </div>
          <h1>userInfo</h1>
          <div className="infoContent">
            <h1>infoContent</h1>
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
    height: 100%;
    width: 20%;
    margin: 20px;
    background: rgba(144, 186, 194, 0.633);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .userInfo {
    height: 100vh;
    width: 80%;
    margin: 20px;
    background: rgba(130, 101, 136, 0.404);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .infoBar {
    height: 10%;
    width: 95%;
    margin: 20px;
    background: #7fddb3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .infoContent {
    height: 70%;
    width: 95%;
    margin: 20px;
    background: #c8b97c;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default DashBoard;
