import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@src/store/hooks';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import axios from 'axios';

const TimeTableLine = ({ dayList }: any) => {
  console.log(dayList);
  return (
    <div className="classArea" css={totalContainer}>
      {dayList.map((cls) => (
        <div key={cls.classId} className="classCard">
          {cls.subjectEntity.name}
        </div>
      ))}
    </div>
  );
};

const totalContainer = css`
  width: 70px;
  .classCard {
    height: 30px;
    margin-bottom: 10px;
    background: #9580c7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    box-shadow: 2px 2px 15px -5px;
    font-size: 20px;
  }
`;

export default TimeTableLine;
