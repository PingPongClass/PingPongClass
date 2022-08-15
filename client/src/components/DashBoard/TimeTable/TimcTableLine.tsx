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
        <div key={cls.classId} className={'classCard' + cls.classDay}>
          {cls.subjectEntity.name}
        </div>
      ))}
    </div>
  );
};

const totalContainer = css`
  width: 70px;
  .classCard1 {
    height: 35px;
    margin-bottom: 10px;
    background: #d2e2f9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 20px;
  }

  .classCard2 {
    height: 35px;
    margin-bottom: 10px;
    background: #fad6dd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 20px;
  }

  .classCard3 {
    height: 35px;
    margin-bottom: 10px;
    background: #fff1bf;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 20px;
  }

  .classCard4 {
    height: 35px;
    margin-bottom: 10px;
    background: #e9dbff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 20px;
  }

  .classCard5 {
    height: 35px;
    margin-bottom: 10px;
    background: #cee7db;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 20px;
  }
`;

export default TimeTableLine;
