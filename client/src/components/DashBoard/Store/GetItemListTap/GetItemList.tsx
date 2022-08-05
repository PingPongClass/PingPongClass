import { css } from '@emotion/react';
import { useState } from 'react';

const GetItemList = () => {
  return <div css={totalContainer}>보유 아이템 목록</div>;
};

const totalContainer = () => css`
  /* 전역 */
  padding: 1rem;
`;

export default GetItemList;
