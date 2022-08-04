/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function StickerBar() {
  return <div css={totalContainer}></div>;
}

const totalContainer = css`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 5px 5px 15px -5px;
`;

export default StickerBar;
