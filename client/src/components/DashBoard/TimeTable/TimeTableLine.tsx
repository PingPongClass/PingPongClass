import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@src/store/hooks';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import axios from 'axios';

const TimeTableLine = ({ dayList }: any) => {
  const memberStore = useAppSelector((state) => state.member);
  const timeline = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="classArea" css={totalContainer}>
      {timeline.map((value) => {
        {
          var isTemp = false;
          var classday = 0;
          var classtitle = '';
          dayList.map((cls) => {
            if (cls.timetableId === value) {
              isTemp = true;
              classday = cls.classDay;
              if (memberStore.userId.toString().length === 10)
                classtitle = cls.subjectEntity.name;
              else classtitle = cls.classTitle.slice(-3);
            }
          });
          if (isTemp) {
            return (
              <div key={value} className={'classCard' + classday}>
                {classtitle}
              </div>
            );
          } else {
            return <div key={value} className={'classCardEmpty'} />;
          }
        }
      })}
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

  .classCardEmpty {
    height: 35px;
    margin-bottom: 10px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 20px;
  }
`;

export default TimeTableLine;
