import { css } from '@emotion/react';

const IosModalBaseAdmin = () => {
  return (
    <div css={totalContainer}>
      <div className="grayBackground"></div>
      <div className="whiteBackground">
        <div className="header">
          <div className="circle1" />
          <div className="circle2" />
          <div className="circle3" />
        </div>
      </div>
    </div>
  );
};

const totalContainer = () => css`
  position: relative;
  width: 100%;
  height: 100%;

  .grayBackground {
    position: absolute;
    left: 0px;
    width: 96%;
    height: 100%;
    background: #d7d7d7;
    border: 2px solid #000000;
    border-radius: 20px;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    z-index: 1;
  }

  .whiteBackground {
    position: absolute;
    right: 0px;
    width: 96%;
    height: 98%;
    margin-right: 2.3%;
    padding: 0px;
    box-sizing: border-box;
    background: #ffffff;
    border: 2px solid #000000;
    border-radius: 20px;
    z-index: 2;
  }

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    height: 3rem;
    border-bottom: 2px solid #000000;
    text-align: right;

    .circle1,
    .circle2,
    .circle3 {
      border: 2px solid black;
      width: 12px;
      height: 12px;
      border-radius: 75px;
      background-color: #000000;
      float: left;
      margin-right: 0.3rem;
    }

    .circle1 {
      background-color: #ef8181;
    }

    .circle2 {
      background-color: #ffe381;
    }

    .circle3 {
      background-color: #96ba85;
      margin-right: 0.6rem;
    }
  }
`;

export default IosModalBaseAdmin;
