/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const IconGroup = () => {
  return (
    <div css={totalContainer}>
      <button>시간표</button>
      <button>알림</button>
      <button>내정보</button>
    </div>
  );
};

const totalContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;

  p {
    border: solid;
  }
`;
export default IconGroup;
