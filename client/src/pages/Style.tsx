import { css } from '@emotion/react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Style = () => {
  return (
    <div css={totalContainer}>
      <div className="title">Style 공통요소</div>

      <div
        css={css`
          padding-top: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <div className="comp-div">
            <h1 className="name">색상</h1>
            <div className="sub-name">--blue</div>
            <div className="blue color">blue</div>
            <div className="sub-name">--pink</div>
            <div className="pink color">pink</div>
            <div className="sub-name">--gray</div>
            <div className="gray color">gray</div>
            <div className="sub-name">--font-dark</div>
            <div className="dark color">gray</div>
          </div>
          <div className="comp-div">
            <h1 className="name">타이틀</h1>
            <div className="sub-name">title</div>
            <div className="title">타이틀</div>
            <div className="sub-name">title-highlight</div>
            <div className="title-highlight">타이틀</div>
          </div>
          <div className="comp-div">
            <h1 className="name">버튼</h1>
            <h3>button</h3>
            <button className="button">button</button>
            <h3>button blue</h3>
            <button className="button blue">button</button>
            <h3>button blue</h3>
            <button className="button pink">button</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
  padding: 100px 200px;

  .comp-div {
    padding-right: 80px;
  }

  .color {
    text-align: center;
    line-height: 60px;
    border-radius: 42px;
    width: 80px;
    height: 60px;
    margin: 10px;
  }

  .name {
    background-color: #515151;
    color: white;
    font-size: 1.5em;
    padding: 10px 0px;
    text-align: center;
    padding-top: 20px;
  }

  .sub-name {
    font-size: 1.3em;
    padding-top: 10px;
  }
`;

export default Style;
