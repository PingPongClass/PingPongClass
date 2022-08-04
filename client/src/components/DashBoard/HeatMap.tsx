/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

const HeatMap = () => {
  const today = new Date();

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomValues = getRange(240).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 4),
    };
  });

  return (
    <div css={totalContainer}>
      <div className="container">
        <CalendarHeatmap
          startDate={shiftDate(today, -240)}
          endDate={today}
          values={randomValues}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${value.count}`;
          }}
          tooltipDataAttrs={(value: any) => {
            return {
              'data-tip': `${value.date.toISOString().slice(0, 10)} Count ${
                value.count
              }`,
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
    width: 80%;
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
