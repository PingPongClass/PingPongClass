import { css } from '@emotion/react';

const IosModalBase = () => {
  return (
    <div css={totalContainer}>
      <div className="yellowBackground"></div>
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

  .yellowBackground {
    position: absolute;
    left: 0px;
    width: 96%;
    height: 100%;
    background: #fff1bf;
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
    margin-right: 2%;
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
    height: 3rem;
    border-bottom: 2px solid #000000;

    .circle1,
    .circle2,
    .circle3 {
      border: 2px solid black;
      width: 12px;
      height: 12px;
      border-radius: 75px;
      background-color: #000000;
      float: left;
      margin-left: 0.7rem;
    }

    .circle1 {
      background-color: #ef8181;
    }

    .circle2 {
      background-color: #ffe381;
      margin-left: 0.3rem;
    }

    .circle3 {
      background-color: #96ba85;
      margin-left: 0.3rem;
    }
  }
`;

export default IosModalBase;
