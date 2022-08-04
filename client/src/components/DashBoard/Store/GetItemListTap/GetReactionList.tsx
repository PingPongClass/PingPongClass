/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const GetReactionList = () => {
  return <div css={totalContainer}>보유 리액션 목록</div>;
};

const totalContainer = () => css`
  /* 전역 */
  padding: 1rem;
`;

export default GetReactionList;
