import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@src/store/hooks';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import axios from 'axios';

const TimeTableLine = ({ list }: any) => {
  return (
    <div className="classArea" css={totalContainer}>
      {list.map((cls) => (
        <div key={cls.classId} className="classCard">
          {cls.subjectEntity.name}
        </div>
      ))}
    </div>
  );
};

const totalContainer = css`
  .classCard {
    height: 70px;
    width: 100%;
    margin-bottom: 10px;
    background: #9580c7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    box-shadow: 2px 2px 15px -5px;
    transition: all 0.1s ease-in-out;
    font-size: 30px;
  }
`;

export default TimeTableLine;
