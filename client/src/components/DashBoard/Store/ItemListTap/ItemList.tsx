/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const ItemList = () => {
  return <div css={totalContainer}>전체 아이템 목록</div>;
};

const totalContainer = () => css`
  /* 전역 */
  padding: 1rem;
`;

export default ItemList;
