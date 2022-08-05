import { css } from '@emotion/react';

function StickerBar({ objectName }: any) {
  return (
    <div css={totalContainer}>
      <h2>{objectName}</h2>
    </div>
  );
}

const totalContainer = css`
  width: 233px;
  height: 233px;
  background: #fdfcf3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 2px 2px 15px -5px;
  cursor: pointer;
`;

export default StickerBar;
