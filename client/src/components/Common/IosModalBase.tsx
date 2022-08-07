import { css } from '@emotion/react';
import RedEllipse from '@assets/images/redEllipse.png';
import YellowEllipse from '@assets/images/yellowEllipse.png';
import GreenEllipse from '@assets/images/greenEllipse.png';

interface IosModalBaseStyle {
  children: any;
  width: string;
  height: string;
}

const IosModalBase = ({ children, width, height }: IosModalBaseStyle) => {
  return (
    <div css={totalContainer({ width, height })}>
      <div css={YellowBackground} />
      <div css={WhiteBackground}>
        <div css={Header}>
          <div className="circle1" />
          <div className="circle2" />
          <div className="circle3" />
        </div>
        <div className="body" css={Body}>
          {children}
        </div>
      </div>
    </div>
  );
};

interface TotalContainerProps {
  width: string;
  height: string;
}

const totalContainer = ({ width, height }: TotalContainerProps) => css`
  width: ${width};
  height: ${height};
`;

const YellowBackground = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff1bf;
  border: 2px solid #000000;
  border-radius: 30px;
`;

const WhiteBackground = css`
  position: absolute;
  width: 99%;
  height: 98%;
  left: 1.1rem;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 20px;
`;

const Header = css`
  align-items: center;
  width: 100.1%;
  display: flex;
  flex-direction: row;
  height: 3rem;
  border-bottom: 2px solid #000000;

  div {
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
`;

const Body = css`
  height: calc(100% - 3rem);
`;

export default IosModalBase;
