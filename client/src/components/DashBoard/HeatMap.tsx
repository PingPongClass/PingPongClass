import { css } from '@emotion/react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@src/store/hooks';
import { saveMember } from '@src/store/member';

interface HeatMapInterface {
  point: number;
  reg_date: string;
}

const HeatMap = () => {
  const AXIOS = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const [countList, setCountList] = useState<HeatMapInterface[]>([]);

  const loadHeatmapList = async () => {
    const studentId = memberStore.userId;
    await AXIOS.get(`/students/points/` + studentId)
      .then(function (response) {
        setCountList(response.data);
      })
      .catch(function (error) {
        console.error('실패', error);
      });
  };

  useEffect(() => {
    saveMember();
    loadHeatmapList();
  }, []);

  const color = [
    'pingpong',
    'platinum',
    'dia',
    'purple',
    'blue',
    'yellow',
    'green',
    'black',
  ];

  const today = new Date();

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function findCount(date) {
    const newDate = new Date(date);
    if (newDate.getDay() === 0 || newDate.getDay() === 6) return 0;
    const dateString = newDate.toISOString().slice(0, 10);
    for (const i of countList) {
      if (dateString === i.reg_date) return i.point + 1;
    }
    return 1;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  const randomValues = getRange(290).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: findCount(shiftDate(today, -index)),
    };
  });

  return (
    <div css={totalContainer}>
      <div className="container">
        <CalendarHeatmap
          startDate={shiftDate(today, -290)}
          endDate={today}
          values={randomValues}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-${
              memberStore.jandiColor === 0
                ? 'gitlab'
                : color[memberStore.jandiColor - 1]
            }-${
              value.count === 0
                ? 0
                : Math.floor(value.count / 6) >= 4
                ? 4
                : Math.floor(value.count / 6) + 1
            }`;
          }}
          tooltipDataAttrs={(value: any) => {
            return {
              'data-tip': `${value.date
                .toISOString()
                .slice(0, 10)} 퐁퐁개수 : ${value.count}`,
            };
          }}
          onClick={(e) => {
            e.preventDefault();
          }}
        />
        <ReactTooltip />
      </div>
    </div>
  );
};
const totalContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  .container {
    width: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: #ffffff;
  }

  .react-calendar-heatmap text {
    font-size: 10px;
    fill: #000000;
  }
`;

export default HeatMap;
