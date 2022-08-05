import { css } from '@emotion/react';

function BackGround() {
  return (
    <div css={totalContainer}>
      <div className="triangles">
        <div className="triangle1" />
        <div className="triangle2" />
      </div>
    </div>
  );
}

const totalContainer = css`
  background-color: #ffffff;
  opacity: 0.8;
  background-image: linear-gradient(#929292 1px, transparent 1px),
    linear-gradient(to right, #929292 1px, #ffffff 1px);
  background-size: 30px 30px;
  height: 100vh;
  position: absolute;

  .triangles {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .triangle1 {
      border-bottom: 40vh solid #bdcde5;
      border-left: 0px solid transparent;
      border-right: 100vw solid transparent;
      transform: scaleY(-1);
    }

    .triangle2 {
      border-bottom: 40vh solid #f8cbd3;
      border-left: 100vw solid transparent;
      border-right: 0px solid transparent;
    }
  }
`;

export default BackGround;
