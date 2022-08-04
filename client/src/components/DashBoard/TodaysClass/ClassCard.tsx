/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function StickerBar({ objectName }: any) {
  return (
    <div css={totalContainer}>
      <h1>{objectName}</h1>
    </div>
  );
}

const totalContainer = css`
  width: 233px;
  height: 233px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid;
  border-radius: 20px;
`;

export default StickerBar;
